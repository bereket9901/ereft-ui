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
  notification,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiBaseUrl, options } from "config";
import AmountInput from "./AmountInput";
const { Option } = Select;
const apiCategory = `${apiBaseUrl}/Category/GetItemRequestCategories`;
const apiCreateRequest = `${apiBaseUrl}/Request/createRequest`;
const apiItemWithCategory = `${apiBaseUrl}/Category/GetItemWithCategory?itemCategoryId=`;
const apiInventoryUrl = `${apiBaseUrl}/Inventory/GetInventory?categoryId=`;

const ItemRequestForm = () => {
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);
  const [RequestCategory, setRequestCategory] = useState([]);
  const [ItemWithCategory, setItemWithCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentInventory, setCurrentInventory] = useState([]);
  const [populateClicked, setPopulateClicked] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setIsLoading(true);
    

    if (
      values.RequestedItems != null ? values.RequestedItems.length > 0 : false
    ) {
      var requestModel = {
        createdBy: localStorage.getItem('userId'),
        isRefill:true,
        categoryId: selectedItemCategory?.id,
        requestItems: values.RequestedItems.map((item: any) => {
          return {
            itemId: item.itemType,
            amount: item.itemAmount.number,
          };
        }),
      };
      axios
        .post(apiCreateRequest, requestModel, options)
        .then((result) => {
      if (result) {
        
            setIsLoading(false);
            openNotification(true);
            clearForm();
          }
          
        })
        .catch((error) => {
          openNotification(false);
          console.log(error);
          
        });
    }
    else{
        openNotification(false);
        setIsLoading(false);
      }
  };

  const fetchInventoryData = (categoryId: any) => {
    axios.get(apiInventoryUrl.concat(categoryId), options).then((result) => {
      setCurrentInventory(result.data);
    });
  };

  const fetchRequestCategory = () => {
    axios.get(apiCategory, options).then((result) => {
      setRequestCategory(result.data);
      fetchItemWithCategory(result.data[0].id);
      setSelectedItemCategory(result.data[0]);
      fetchInventoryData(result.data[0].id);
    });
  };
  const fetchItemWithCategory = async (categoryId: any) => {
    await axios
      .get(apiItemWithCategory.concat(categoryId), options)
      .then((result) => {
        setItemWithCategory(result.data);
      });
  };

  const populateInventory = (add:any) => {
    currentInventory.forEach(i => add({itemType: i.id}));
    setPopulateClicked(true);
  }

  const clearForm = () => {
    form.resetFields();
    setPopulateClicked(false);
  }

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
            fetchInventoryData(item.id);
            clearForm();
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
  const openNotification = (value:boolean) => {
    if(value){
      return(
    notification.success({
      message: 'Created request successfully!',
      placement:'bottomRight'
  }));}
  else if(value==false){
  notification.error({
    message: 'Unable to created request!',
    placement:'bottomRight'
});
  }
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
      <p className="login-header-text">
        {selectedItemCategory?.name} Request Form
      </p>
      <Card className="request-form-card" style={{ maxWidth: 600 }}>
        <Form
          form={form}
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
                            {`${option.name} - ( ${option.measuringUnit} )`}
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
                <Form.Item>
                  <Button onClick={ () => populateInventory(add)} block disabled={populateClicked}>
                    Populate inventory Items
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={ () => clearForm()} block>
                    Clear
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button loading={isLoading} className="login-form-button" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ItemRequestForm;
