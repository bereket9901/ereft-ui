import React from 'react';
import { Card, Row, Col } from 'antd';

const OrderedItemCard: React.FC = () => (
  <Card
    title="Ticket number - 001"
    hoverable={true}
    headStyle={{ background: '#243763', textAlign: 'center', color: '#f8f8f8' }}
    bodyStyle={{ background: '#f8f8f8' }}
  >
    <Row gutter={16}>
      <Col span={16}><p className='ordered-item-card-text'>Tibs firfir</p></Col>
      <Col span={8}><p className='ordered-item-card-text'>2</p></Col>
    </Row>
    <Row gutter={16}>
      <Col span={16}><p className='ordered-item-card-text'>Club</p></Col>
      <Col span={8}><p className='ordered-item-card-text'>3</p></Col>
    </Row>
  </Card>
);

export default OrderedItemCard;