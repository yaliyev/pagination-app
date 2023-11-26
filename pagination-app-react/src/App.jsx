import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBeersByPageAndByPerPage } from './api/punk_request'

function App() {

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getBeersByPageAndByPerPage(1,10);
      console.log(data);
    }
    loadData();

  }, [beers])

  return (
    <>

    </>
  )
}

export default App
