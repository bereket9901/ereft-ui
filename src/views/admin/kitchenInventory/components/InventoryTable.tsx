import React from 'react';
import { Col, Row, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  amount: number;
  unit: string;
}

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

const InventoryTable  =(props:{tableData:any,})=> {
  const {tableData}=props;
  return(
  <Row gutter={16}>
    <Col span={2}>
    </Col>
    <Col span={20}>
  
    <Table   className='ant-table-thead ant-table-cell' columns={columns} dataSource={tableData} onChange={onChange} />
    </Col>
  </Row>
  );
}
export default InventoryTable;

