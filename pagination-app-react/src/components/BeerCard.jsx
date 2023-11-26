import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;
const BeerCard = ({beer}) => {
  return (
    <Card
    hoverable
    style={{
      width: 240,height:800,margin:'20px'
    }}
    cover={<img alt="example" src={beer.image_url}  style={{height:'500px'}}/>}
  >
    <Meta title="Name" description={beer.name} />

    <Meta title="Abv" style={{marginTop:'10px'}} description={beer.abv} />
  </Card>
  )
}

export default BeerCard