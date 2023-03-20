import React, {useState } from 'react';
import { Button,Card, Row, Col, notification } from 'antd';
import axios from 'axios';
import { apiBaseUrl, options } from 'config';
import { Order } from 'Enum';
const apiUpdateKitchenOrderStatus=`${apiBaseUrl}/Order/updateKitchenOrderStatus`;

function OrderedItemCard(props:{data:any, fetchKitchenOrders:any} ){

  const { data, fetchKitchenOrders} = props;
  const itemsData=data.items;
  const chiefOrder=itemsData.filter((item:any)=>item.isChiefOrder==true);
  const baristaOrder=itemsData.filter((item:any)=>item.isChiefOrder==false);
  
  const openNotification = () => {
      return(
    notification.success({
      message: 'Done order successfully!',
      placement:'bottomRight'
  }));};
  function handelOrderDone()
 {
  const updateOrderModel = {
    orderId: data.id,
    orderStatusId: Order.Delivered,
  };

  axios.put(apiUpdateKitchenOrderStatus,updateOrderModel,options).then((result)=>{

    if(result){
      fetchKitchenOrders();
      openNotification();
    }
  }).catch(error=>{console.log(error)});
 }
  return(
  <Card 
    title={`Ticket number -${data.id}`}
    hoverable={true}
    headStyle={{ background: '#243763', textAlign: 'center', color: '#f8f8f8',fontSize:'20px' }}
    bodyStyle={{ background: '#f8f8f8' }}
  >
    <div >
      {chiefOrder.length>=1?<p className='ordered-item-card-text-header' >Chief Order</p>:null}
      {chiefOrder.map((item:any,index:any)=>( 
      <Row key={index} gutter={16}>
      <Col span={16}><p className='ordered-item-card-text' >{item.name}</p></Col>
      <Col span={8}><p className='ordered-item-card-text'>{item.amount}</p></Col>
    </Row>   ))}
   
   {baristaOrder.length>=1?<p className='ordered-item-card-text-header'>Barista Order</p>:null}
   {baristaOrder.map((item:any,index:any)=>(
   <Row gutter={16} key={index}>
      <Col span={16}><p className='ordered-item-card-text'>{item.name}</p></Col>
      <Col span={8}><p className='ordered-item-card-text'>{item.amount}</p></Col>
    </Row>
    ))}
    <Row>
      <Col> 
      <Button onClick={handelOrderDone} className="ordered-card-button">Done</Button>
      </Col>
    </Row>
    
    </div>
  </Card>
  
  );
}

export default OrderedItemCard;