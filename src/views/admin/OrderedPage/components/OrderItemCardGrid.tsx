import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import OrderedItemCard from './OrderedItemCard';
import axios from 'axios';
const apiUrl = "https://localhost:7085/Order";
const options = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  },
};


function OrderItemCardGrid(){
const [order, setOrder] = useState<any[]>([]);

  useEffect(()=>{
    axios.get(apiUrl,options).then((result)=>{
      setOrder(result.data);
    });
  },[])
 function a(){
  console.log(order[0]);
 }
  return(
  <Row gutter={5}>
    <Col span={24}>
      <p className='order-grid-headers'>
      Orderes
      </p>
      <Row gutter={[35, 35]}>
        {order.map((item:any ,index:number)=>
        <Col key={index} span={6}>
          <OrderedItemCard data={item}/>         
        </Col>)}
      </Row>
    </Col>

    {/* <Col span={12}>
      <p className='order-grid-headers'>
        Barista Orderes
      </p>
      <Row gutter={[35, 35]}>
        <Col>
          <OrderedItemCard />
        </Col>
        <Col>
          <OrderedItemCard />
        </Col>
        <Col>
          <OrderedItemCard />
        </Col>
      </Row>
    </Col> */}
  </Row>
  );
 
  }
export default OrderItemCardGrid;
