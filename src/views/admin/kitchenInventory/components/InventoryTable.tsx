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

const data = [
  {
    key: '1',
    name: 'onion',
    amount: 32,
    unit: 'kg',
  },
  {
    key: '2',
    name: 'Tomato',
    amount: 42,
    unit: 'kg',
  },
  {
    key: '3',
    name: 'Potato',
    amount: 32,
    unit: 'kg',
  },
  {
    key: '4',
    name: 'Garlic',
    amount: 12,
    unit: 'kg',
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

const InventoryTable: React.FC = () => (
  <Row gutter={16}>
    <Col span={2}>
    </Col>
    <Col span={20}>
    <p className='order-grid-headers'>Items available in the store</p>
    <Table   className='ant-table-thead ant-table-cell' columns={columns} dataSource={data} onChange={onChange} />
    </Col>
  </Row>
);
export default InventoryTable;

