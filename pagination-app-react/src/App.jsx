import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBeers,getBeersByPageAndByPerPage } from './api/punk_request'
import BeerTable from './components/BeerTable';

function App() {

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    async function loadData() {
      // const data = await getBeersByPageAndByPerPage(1,50);
      const data = await getBeers();
      setBeers(data);
    }
    loadData();

  }, [])

  return (
    <>
      <BeerTable beers={beers} />
    </>
  )
}

export default App
