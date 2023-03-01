import React from 'react';
import { Button, Col, Dropdown, MenuProps, Row, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { DownOutlined } from '@ant-design/icons';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

interface DataType {
  key: React.Key;
  name: string;
  amount: number;
  unit: string;
}
 function  handelDropDownClick(e:any){
  console.log(e);
  
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
  },
];


const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra);
};
const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Button className='dropDown-button'  type="text" onClick={() => console.log('Chief')}>Chief</Button>,
  },
  {
    key: '2',
    label:<Button className='dropDown-button'   type="text" onClick={() => console.log('Barista')}>Barista</Button>,
  },
  {
    key: '3',
    label: <Button className='dropDown-button'  type="text" onClick={() => console.log('Store')}>Store</Button>,
  },
];
const InventoryTable  =(props:{tableData:any,})=> {
  const {tableData}=props;
  return(
    <div className='center-div'>
       <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['1']
    }}  
  >  
    <Space className='ordered-item-card-text'>
      Inventory For
      <DownOutlined />
    </Space>
  </Dropdown>
    <p className='order-grid-headers'>Items available in the kitchen for chief</p> 
    <Table className='ant-table-thead ant-table-cell' columns={columns} dataSource={tableData} onChange={onChange} />
   </div>
  );
}
export default InventoryTable;

