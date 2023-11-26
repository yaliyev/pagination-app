import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBeers, getBeersByPageAndByPerPage } from './api/punk_request'
import BeerTable from './components/BeerTable';
import BeerCard from './components/BeerCard';
import { Col, Row, Pagination, Select,Modal,Button } from 'antd';


const itemsPerPageOptions = [10, 15, 20, 25, 50, 80];

function App() {

  const [beers, setBeers] = useState([]);
  const [paginationBeers, setPaginationBeers] = useState([]);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const [isDetailedBeerCardModalOpen, setIsDetailedBeerCardModalOpen] = useState(false);
  const [currentBeerCard, setCurrentBeerCard] = useState(null);

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

  }, [currentPaginationPage, itemsPerPage]) // Ikili deyishiklik gozleyen dependency array

  return (
    <>
      <BeerTable beers={beers} />


      <Row>

      <Modal title="Detail Beer Card Info Modal" onCancel={() => { setIsDetailedBeerCardModalOpen(false) }} open={isDetailedBeerCardModalOpen}
        footer={[
          <Button key="back" onClick={() => { setIsDetailedBeerCardModalOpen(false) }}>
            Return
          </Button>

        ]}>
        {
          currentBeerCard ?
            <>
              
              <div><h3>Description:</h3> {currentBeerCard.description}</div>
              <div><h3>Food Pairing:</h3> {currentBeerCard.food_pairing}</div>
              <div><h3>Tag line:</h3> {currentBeerCard.tagline} </div>

            </> :
            <></>
        }


      </Modal>

        {
          paginationBeers.map((beer, index) => {
            return <Col key={index} span={6}>
              <BeerCard  beer={beer} setCurrentBeerCard={setCurrentBeerCard} setIsDetailedBeerCardModalOpen={setIsDetailedBeerCardModalOpen} />
            </Col>
          })
        }


      </Row>

      <Row>


        <Select
          defaultValue={itemsPerPage}
          style={{ width: 120 }}
          onChange={(value) => { setItemsPerPage(value) }}
          options={
            [...itemsPerPageOptions].map((item) => {
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
          onChange={(value) => { setCurrentPaginationPage(value) }}

        />

      </Row>



    </>
  )
}

export default App
