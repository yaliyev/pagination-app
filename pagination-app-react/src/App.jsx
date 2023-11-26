import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBeers, getBeersByPageAndByPerPage } from './api/punk_request'
import BeerTable from './components/BeerTable';
import BeerCard from './components/BeerCard';
import { Col, Row } from 'antd';

function App() {

  const [beers, setBeers] = useState([]);
  const [paginationBeers, setPaginationBeers] = useState([]);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      // const data = await getBeersByPageAndByPerPage(1,50);
      const data = await getBeers();
      setBeers(data);
    }
    loadData();

  }, [])

  useEffect(() => {
    async function loadPaginationData() {
      const data = await getBeersByPageAndByPerPage(currentPaginationPage, 10);
      setPaginationBeers(data);
    }
    loadPaginationData();

  }, [currentPaginationPage])

  return (
    <>
      <BeerTable beers={beers} />


      <Row>

        {
          paginationBeers.map((beer,index) => {
            return <Col key={index} span={6}>
              <BeerCard beer={beer} />
            </Col>
          })
        }


      </Row>



    </>
  )
}

export default App
