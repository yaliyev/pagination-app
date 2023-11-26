import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBeers, getBeersByPageAndByPerPage } from './api/punk_request'
import BeerTable from './components/BeerTable';
import BeerCard from './components/BeerCard';
import { Col, Row,Pagination,Select } from 'antd';


const itemsPerPageOptions = [10, 15, 20, 25, 50, 80];

function App() {

  const [beers, setBeers] = useState([]);
  const [paginationBeers, setPaginationBeers] = useState([]);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  useEffect(() => {
    async function loadData() {
      const data = await getBeers();
      setBeers(data);
    }
    loadData();

  }, [])

  useEffect(() => {
    async function loadPaginationData() {
      const data = await getBeersByPageAndByPerPage(currentPaginationPage, itemsPerPage);
      setPaginationBeers(data);
    }
    loadPaginationData();

  }, [currentPaginationPage,itemsPerPage]) // Ikili deyishiklik gozleyen dependency array

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

      <Row>
      
   
<Select
        defaultValue={itemsPerPage}
        style={{ width: 120 }}
        onChange={(value)=>{setItemsPerPage(value)}}
        options={
          [...itemsPerPageOptions].map((item)=>{
            return {
              value: item,
              label: item
            }
            
          })
            
          
          
        }
      >
       
      </Select>
      <Pagination
        defaultCurrent={currentPaginationPage}
        total={330} 
        pageSize={Number(itemsPerPage)}
        showSizeChanger={false}
        onChange={(value)=>{setCurrentPaginationPage(value)}}
        
      />

      </Row>



    </>
  )
}

export default App
