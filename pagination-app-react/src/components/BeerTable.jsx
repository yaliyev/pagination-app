import React from 'react'
import { Space, Table, Tag,Button } from 'antd';
const BeerTable = ({beers}) => {

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'beername',
        },
        {
            title: 'First Brewed',
            dataIndex: 'first_brewed',
            key: 'first_brewed',
        },
        {
            title: 'Actions',
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => (
             <Button type="primary">
               {"Info"}
             </Button>
            ),
        }
      ];

      

      const data = beers.map((beer) => ({
        ...beer,
        key: beer.id, 
      }));
      

  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default BeerTable