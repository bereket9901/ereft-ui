import React, { useEffect, useState } from "react";
import "../../../../index.css";
import { Button, Col, Divider, Layout, Result, Row, Space } from "antd";
import Menu from "../variables/const";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import logo from 'assets/img/ereft/logo ereft.png';
import axios from 'axios';

const OrderPage: React.FC = () => {

  const [subMenu, setSubMenu] = useState([]); 
  const [subSubMenu, setSubSubMenu] = useState([]);
  const [ordered, setOrdered] = useState<any[]>([]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [menu, setMenu]=useState([]);
  const apiUrl = "https://localhost:7085/Category";
  const apiUrlOrder="https://localhost:7085/Order";
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    },
  };
  useEffect(() => {
    var total=0;
  ordered.map((item)=> total+=item.ItemTotalPrice 
  )    
  setTotalOrderPrice(total);
  }, [ordered])

  useEffect(()=>{
    axios.get(apiUrl,options).then((result)=>{
      setMenu(result.data);

    });

  },[])
  
  
  function handelMainMenuClick(item:any):any
  {
    setSubMenu(item.groups);
  }
  
  function handelSubMenuClick(item:any):any
  {
    setSubSubMenu(item.menuItems);
  }
function handelSubSubMenuClick(item:any):any
{ 
  
  item.amount=1;
  item.ItemTotalPrice = item.amount*item.unitPrice;

  var index = ordered.findIndex(o => o.id === item.id);

  if(index===-1)
  {
    
    setOrdered([{...item}, ...ordered]);//item is being cloned and added into ordered array inorder to remove the reference sharing between subsubmenu item and ordered item. having the same reference will create ambiguity if one of the two array item is manipulated both of the arrays item is updated.
  }
}

function handelRemoveOrder(item:any):any
{
const index =ordered.indexOf(item);
if (index > -1) { 
  ordered.splice(index, 1);
  setOrdered([...ordered]); 
}
}

function handelAddAmount(item:any):any
{
  item.amount=++item.amount;
  const index =ordered.indexOf(item);
  ordered[index].ItemTotalPrice=item.amount*item.unitPrice;
  setOrdered([...ordered]);
  
}
function handelSubtractAmount(item:any):any
{
  item.amount=--item.amount;
  const index =ordered.indexOf(item);
  ordered[index].ItemTotalPrice=item.amount*item.unitPrice;
  setOrdered([...ordered]);
}
function handelButtonOrder():any
{
  const payload = {
    createdBy : 1,
    totalPrice : totalOrderPrice,
    orderMenuItems : ordered.map((o:any) =>  {
      return {
        menuItemId : o.id,
        price: o.ItemTotalPrice, 
        amount: o.amount
      }
    })
  };

 if(payload.totalPrice!=0){
 axios.post(apiUrlOrder,payload,options).then((result)=>{
      if(result.data==false){
        return console.error();
        
      }
      else{
      console.log(result.data)
      }
    });
  }

}
  return (
    <>
      <Row>
        <Col xl={16} lg={12} md={12}>
          <div style={{}}>
            <Row gutter={[12,12]}>
            {subSubMenu.map((item:any, index:number) => 
             <Col lg={4} md={8} sm={8} xs={12} key={index} >
             <Button onClick={()=>handelSubSubMenuClick(item)} className="subSubMenuGrid">{item.name}</Button>
            </Col>
            )}
            </Row >
            <Divider></Divider>
            <Row gutter={[16, 16]}>
              {subMenu.map((item:any, index:number) => 
             <Col lg={4} md={8} sm={8} xs={12} key={index} >
             <Button onClick={() => handelSubMenuClick(item)} className="subMenuGrid ">{item.name}</Button>
            </Col>
            )}
            </Row>
            <Divider></Divider>

            <div>
          <Row gutter={[16, 16]}>
          {menu.map((item:any, index:number) => 
             <Col lg={4} md={8} sm={8} xs={12} key={index} >
             <Button onClick={() => handelMainMenuClick(item)} className="mainMenuGrid">{item.name}</Button>
            </Col>
            )}
            
          </Row>
            </div>

            <Divider></Divider>
          </div>
        </Col>

        <Col xl={8}>
          <div>
            <Row className="margin">
              <Col xl={8} lg={8} md={8} sm={6} xs={8}>
                <div className="order-query-header">
                  <p className="white-text">Order</p>
                </div>{" "}
              </Col>

              <Col xl={8} lg={8} md={8} sm={6} xs={8}>
                <div className="order-query-header">
                  <p className="white-text">Amount</p>
                </div>{" "}
              </Col>
              <Col xl={8} lg={8} md={8} sm={6} xs={8}>
                <div className="order-query-header">
                  <p className="white-text">Price</p>
                </div>{" "}
              </Col>
            </Row>
            {ordered.map((item: any,index:number) => 
            <Row className="margin" key={index} >
            <Col
              lg={2}
              md={2}
              sm={3}
              xs={4}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              <div>
                <Button className="buttonRemoveOrder" onClick={()=>handelRemoveOrder(item)} style={{}}><MinusOutlined/></Button>
              </div>
            </Col>
            <Col lg={4} md={4} sm={6} xs={8}>
              <p className="white-text" style={{ color: "black", marginRight: 5, marginTop: 15}}>
                {item.name}
              </p>
            </Col>
            <Col lg={4} md={4} sm={6} xs={8}>
              <Button className="buttonSubtractAmount" disabled={item.amount<=1} onClick={()=>handelSubtractAmount(item)} style={{ marginLeft: 30, marginTop: 10 }}><MinusOutlined /></Button>
            </Col>
            <Col lg={3} md={3} sm={6} xs={8}>
              <p className="white-text" style={{ color: "black", marginLeft: 20, marginTop: 15 }}>
                {item.amount}
              </p>
            </Col>
            <Col lg={4} md={4} sm={6} xs={8}>
              <Button className="buttonAddAmount" onClick={()=>handelAddAmount(item)} 
                style={{ marginRight: 0, marginLeft: 0, marginTop: 10 }}
              >
                <PlusOutlined />
              </Button>
            </Col>
            <Col lg={4} md={4} sm={6} xs={8}>
              
              <p className="black-bold-text" style={{ marginRight: 20, marginTop: 15, float:'right'}}>
              {item.ItemTotalPrice}
              </p>
            </Col>
            </Row>
           
            )}
              <Row className="margin" style={{marginTop: 35, marginRight:62, float:'right'}}>
              <Col>
               <p className="black-bold-text">Total price &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
              </Col>
              <Col>
                    <p className="black-bold-text">{totalOrderPrice}</p>
              </Col>
              </Row>
            <Divider className="margin" />
            <Row className="margin1" >
              <Col lg={12} md={12} sm={18} xs={24}>
                <Button onClick={()=>handelButtonOrder()} className="buttonLarge">Order</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      
      <img className="img-ereft-logo" width={250} src={logo} />
  
   
    </>
  );
};

export default OrderPage;
