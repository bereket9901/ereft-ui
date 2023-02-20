import React from 'react';
import { Row, Col, Button, Divider } from 'antd';
import OrderedItemCard from './OrderedItemCard';



const OrderItemCardGrid: React.FC = () => (
  <>
  <Row gutter={5}>
    <Col span={12}>
      <p className='order-grid-headers'>
        Cheif Orderes
      </p>
      <Row gutter={[35, 35]}>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
      </Row>
    </Col>

    <Col span={12}>
      <p className='order-grid-headers'>
        Barista Orderes
      </p>
      <Row gutter={[35, 35]}>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
        <Col>
          <OrderedItemCard />
          <Button className="ordered-card-button">Done</Button>
        </Col>
      </Row>
    </Col>
  </Row>
  
  </>
);

export default OrderItemCardGrid;
