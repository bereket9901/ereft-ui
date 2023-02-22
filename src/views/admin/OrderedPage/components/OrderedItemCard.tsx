import React, { useEffect, useState } from 'react';
import { Button,Card, Row, Col } from 'antd';
import { textDecoration } from '@chakra-ui/system';
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

function OrderedItemCard(props: { data:any}){
  const { data} = props;
  const [order, setOrder] = useState<any[]>([]);
  const itemsdata=data.items;
  const cheifOrder=itemsdata.filter((item:any)=>item.isChiefOrder==true);
  const baristaOrder=itemsdata.filter((item:any)=>item.isChiefOrder==false);
  useEffect(()=>{
    axios.get(apiUrl,options).then((result)=>{
      setOrder(result.data);
    });
  },[])
 function a(){

 }
  return(
  <Card 
    title={`Ticket number -${data.id}`}
    hoverable={true}
    headStyle={{ background: '#243763', textAlign: 'center', color: '#f8f8f8',fontSize:'20px' }}
    bodyStyle={{ background: '#f8f8f8' }}
  >
    <div className='odered-card-body' >
      {cheifOrder.length>=1?<p className='ordered-item-card-text-header' >Chief Order</p>:null}
      {cheifOrder.map((item:any,index:any)=>( 
      <Row key={index} gutter={16}>
      <Col span={16}><p className='ordered-item-card-text' >{item.name}</p></Col>
      <Col span={8}><p className='ordered-item-card-text'>{item.amount}</p></Col>
    </Row>   ))}
   
   {baristaOrder.length>=1?<p className='ordered-item-card-text-header'>Barista Order</p>:null}
   {baristaOrder.map((item:any,index:any)=>(
   <Row gutter={16} key={index}>
      <Col span={16}><p className='ordered-item-card-text'>{item.name}</p></Col>
      <Col span={8}><p className='ordered-item-card-text'>{item.amount}</p></Col>
    </Row>))}
    <Row>
      <Col> 
      <Button onClick={a} className="ordered-card-button">Done</Button>
      </Col>
    </Row>
    
    </div>
  </Card>
  
  );
}

export default OrderedItemCard;