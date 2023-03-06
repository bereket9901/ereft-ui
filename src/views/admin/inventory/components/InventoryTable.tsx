import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, MenuProps, Row, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiBaseUrl, options } from "config";
const apiInventoryUrl = `${apiBaseUrl}/Inventory/GetInventory?categoryId=`;
const apiInventoryCategory = `${apiBaseUrl}/Category/GetInventoryCategories`;

interface DataType {
  key: React.Key;
  name: string;
  amount: number;
  unit: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Unit",
    dataIndex: "itemUnit",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const InventoryTable = () => {
  const [inventoryName, setInventoryName] = useState("");
  const [tableData, setTableData] = useState();
  const [inventoryCategory, setInventoryCategory] = useState([]);

useEffect(() => {
  fetchInventoryCategory();
},[])

  const fetchInventoryCategory = async () => {
    await axios.get(apiInventoryCategory,options).then((result) => {
      setInventoryCategory(result.data);
    });
   
  };
  const fetchInventoryData = (categoryId:any) => {
    axios.get(apiInventoryUrl.concat(categoryId),options).then((result) => {
      setTableData(result.data);
    });
  };
  
  const items: MenuProps["items"] = [
   {  
      key:'1',
      label: (  
      inventoryCategory.map((item:any, index:number)=>(
      
      <Button
      key={index}
      className="dropDown-button"
      type="text"
      onClick={() => {
        setInventoryName(item.name);
        
        fetchInventoryData(item.id);
      }}
    >
      {item.name}
    </Button>
      )   
      )   
      ),
    },
  ];

  return (
    <div className="center-div">
      <Dropdown
        menu={{
          items,
        }}
      >
        <Space className="ordered-item-card-text">
          Inventory For
          <DownOutlined />
        </Space>
      </Dropdown>
      <p className="order-grid-headers">Items available for {inventoryName}</p>
      <Table
        className="ant-table-thead ant-table-cell"
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};
export default InventoryTable;
