import React, { useState } from 'react'
import { Space, Table, Tag, Button, Modal } from 'antd';
const BeerTable = ({ beers }) => {
    const [isDetailedBeerModalOpen, setIsDetailedBeerModalOpen] = useState(false);
    const [currentBeer, setCurrentBeer] = useState(null);

    const toDateWithinMonthAndYear = (dateString) => {
        const [month, year] = dateString.split('/');
        return new Date(`${year}-${month.padStart(2, '0')}-01`);
      };

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
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend','descend'],
        },
        {
            title: 'First Brewed',
            dataIndex: 'first_brewed',
            key: 'first_brewed',
            sorter: (a, b) => toDateWithinMonthAndYear(a.first_brewed) -  toDateWithinMonthAndYear(b.first_brewed) ,
            sortDirections: ['ascend','descend'],
        },
        {
            title: 'Actions',
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => { setIsDetailedBeerModalOpen(true); setCurrentBeer(record); }}>
                        {"Info"}
                    </Button>

                </>

            ),
        }
    ];



    const data = beers.map((beer) => ({
        ...beer,
        key: beer.id,
    }));


    return (
        <>
            <Modal title="Detail Beer Info Modal" onCancel={() => { setIsDetailedBeerModalOpen(false) }} open={isDetailedBeerModalOpen}
                footer={[
                    <Button key="back" onClick={() => { setIsDetailedBeerModalOpen(false) }}>
                        Return
                    </Button>

                ]}>
                {
                    currentBeer ?
                        <>
                            <div><h3>Name:</h3> {currentBeer.name}</div>
                            <div><h3>Description:</h3> {currentBeer.description}</div>
                            <div><h3>Attenuation level:</h3> {currentBeer.attenuation_level} </div>

                        </> :
                        <></>
                }


            </Modal>
            <Table columns={columns} dataSource={data} />
        </>

    )
}

export default BeerTable