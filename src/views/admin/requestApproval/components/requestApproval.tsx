import React, { useEffect, useState } from "react";
import Moment from 'react-moment';
import { Button, Space, Table } from "antd";
import { apiBaseUrl, options } from "config";
import axios from "axios";
import { Request } from "Enum";
const apiGetRequestUrl = `${apiBaseUrl}/Request/getRequest?categoryId=1`;
const apiUpdateRequestUrl = `${apiBaseUrl}/Request/updateRequest`;
// format("dddd, MMMM Do YYYY, h:mm:ss a");
const RequestApproval = () => {
  const [requestData, setRequestData] = useState([]);
  const [tableData, setTableData] = useState([]);
function handelRejectButton(value:any){
  const updateRequestModel={
    requestId:value,
    requestStatusId:Request.Reject
  }
  axios.put(apiUpdateRequestUrl,updateRequestModel,options).then((result)=>{
    if(result){
      fetchRequests();
    }
  }).catch(error=>{console.log(error)});
}
function handelApproveButton(value:any){
  const updateRequestModel={
    requestId:value,
    requestStatusId:Request.Approve
  }
  axios.put(apiUpdateRequestUrl,updateRequestModel,options).then((result)=>{
    if(result){
      fetchRequests();
    }
  }).catch(error=>{console.log(error)});
}
  const columns = [
    { title: "Request number", dataIndex: "requestId", key: "requestId" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    { title: "Created Date", dataIndex: "createdDate", key: "createdDate" },
    { title: "Status", dataIndex: "status", key: "status" },
    
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: any) => {
        return (
          <Space>
            <Button onClick={()=>handelApproveButton(record.requestId)} className="request-approval-Approve-button">Approve</Button>
            <Button onClick={()=>handelRejectButton(record.requestId)} className="request-approval-reject-button">Reject</Button>
          </Space>
        );
      },
    },
  ];
  const expandTableColumns = [
    { title: "ItemName", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];
  const tableDataModel = requestData.map((item: any, index: number) => {
    return {
      key: index,
      requestId: item.id,
      createdBy: item.createdBy,
      status: item.status,
      createdDate:<Moment format="dddd, MMMM Do YYYY, h:mm:ss a">{item.dateTime}</Moment>,
      description: item.items.map((item: any, index: number) => {
        return { key: index, name: item.name, amount: item.amount };
      }),
    };
  });

  useEffect(() => {
    fetchRequests();
    setTableData(tableDataModel);
  }, [requestData]);

  const fetchRequests =() => {
     axios.get(apiGetRequestUrl, options).then((result) => {
      setRequestData(result.data);
    });
  };
  return (
    <Table
      columns={columns}
      expandable={{ 
        expandedRowRender: (record) => (
          <Table
            style={{ width: "20%" }}
            columns={expandTableColumns}
            pagination={false}
            dataSource={record.description}
          />
        ),
      }}
      dataSource={tableData}
    />
  );
};

export default RequestApproval;
