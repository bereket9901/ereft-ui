import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, Divider, notification } from 'antd';
import OrderedItemCard from './OrderedItemCard';
import axios from 'axios';
import { HttpTransportType, HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import { apiBaseUrl, options } from 'config';
 import sound from "../../../../assets/sound/Notification.mp3";
const apiOrderUrl=`${apiBaseUrl}/Order`;

function OrderItemCardGrid(){
  const audioPlayer = useRef(null);
  const [connection, setConnection] = useState<null | HubConnection>(null);
  function playAudio() {
    audioPlayer.current.play();
  }
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${apiBaseUrl}/hubs/notifications`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();
  
    setConnection(connect);
  }, []);
  
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            notification.open({
              message: "New Notification",
              description: message.message,
            });
            playAudio();
            fetchKitchenOrders();
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);
  
const [order, setOrder] = useState<any[]>([]);
  useEffect(()=>{
    fetchKitchenOrders();
  },[])

const fetchKitchenOrders = () => {
  axios.get(apiOrderUrl,options).then((result)=>{
    setOrder(result.data);
  });

}
  return(
  <Row gutter={5}>
    <Col span={24}>
      <p className='order-grid-headers'>
      Orders
      </p>
      <Row gutter={[35, 35]}>
        {order.map((item:any ,index:number)=>
        <Col key={index} span={6}>
          <OrderedItemCard data={item} fetchKitchenOrders={fetchKitchenOrders}/>         
        </Col>)}
        <audio ref={audioPlayer} src={"sound"} />
      </Row>
    </Col>
  </Row>
  );
 
  }
export default OrderItemCardGrid;
