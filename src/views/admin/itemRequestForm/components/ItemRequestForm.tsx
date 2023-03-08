import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Space,
  Card,
  Select,
  Dropdown,
  MenuProps,
  Modal,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiBaseUrl, options } from "config";
import AmountInput from "./AmountInput";
const { Option } = Select;
const apiCategory = `${apiBaseUrl}/Category/GetInventoryCategories`;
const apiUpdateInventory = `${apiBaseUrl}/Inventory/updateInventory`;
const apiItemWithCategory = `${apiBaseUrl}/Category/GetItemWithCategory?itemCategoryId=`;


const ItemRequestForm = () => {
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);
  const [RequestCategory, setRequestCategory] = useState([]);
  const [ItemWithCategory, setItemWithCategory] = useState([]);
  const onFinish = (values: any) => {
    const modalText='Request success!'  
    var requestModel = {
      categoryId: selectedItemCategory?.id,
      items: values.RequestedItems.map((item:any) =>
         {
          return {
            itemId: item.itemType,
            amount: item.itemAmount.number
          }    
        }
      )
    }
  
    if(values.RequestedItems!= null ? values.RequestedItems.length>0:false)
    {
    console.log(values); 
    // <Modal
    //       title="Title"
    //       open={true}
    //       onOk={()=>{false}}
    //     >
    //       <p>{modalText}</p>
    //     </Modal>
    }

    axios.put(apiUpdateInventory,requestModel,options).then((result)=>{
      if(result){
       
      }
      console.log(result.data);
    }).catch(error=>{console.log(error)});


  };
  
  
 
 
 
  const fetchRequestCategory = () => {
    axios.get(apiCategory, options).then((result) => {
      setRequestCategory(result.data);
    });
  };
  const fetchItemWithCategory = async (categoryId: any) => {
    await axios
      .get(apiItemWithCategory.concat(categoryId), options)
      .then((result) => {
        setItemWithCategory(result.data);
      });
  };

  useEffect(() => {
    fetchRequestCategory();
  }, []);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: RequestCategory.map((item: any, index: number) => (
        <Button
          key={index}
          className="dropDown-button"
          type="text"
          onClick={() => {
            fetchItemWithCategory(item.id);
            setSelectedItemCategory(item);
          }}
        >
          {item.name}
        </Button>
      )),
    },
  ];
  const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Amount must be greater than zero!"));
  };
  return (
    <>
      <div className="center-div">
        <Dropdown
          menu={{
            items,
          }}
        >
          <Space className="ordered-item-card-text">
            Request For
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
      <p className="login-header-text">{selectedItemCategory?.name} Request Form</p>
      <Card className="request-form-card" style={{ maxWidth: 600 }}>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.List name="RequestedItems">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 6 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "itemType"]}
                      rules={[{ required: true, message: "Missing Item type" }]}
                    >
                      {/* <Input placeholder="Item Type" /> */}
                      <Select
                        className="SelectItem"
                        showSearch
                        placeholder="Item Type"
                      >
                        {ItemWithCategory.map((option: any, index: number) => (
                          <Option key={index} value={option.id}>
                            {option.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[name, "itemAmount"]}
                      {...restField}
                      rules={[{ validator: checkPrice }]}
                    >
                        <AmountInput />             
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button className="login-form-button" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ItemRequestForm;
