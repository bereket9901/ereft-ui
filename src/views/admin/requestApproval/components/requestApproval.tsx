import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { apiBaseUrl, options } from "config";
import axios from "axios";
import { Request } from "Enum";
import { DownOutlined } from "@ant-design/icons";
const apiGetRequestUrl = `${apiBaseUrl}/Request/getRequest?categoryId=`;
const apiUpdateRequestUrl = `${apiBaseUrl}/Request/updateRequest`;
const apiInventoryCategory = `${apiBaseUrl}/Category/GetInventoryCategories`;
const RequestApproval = () => {
  const [tableData, setTableData] = useState([]);
  const [activeTableData, setActiveTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedModalApprove, setIsSelectedModalApprove] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedRequestCategory, setSelectedRequestCategory] = useState(1);
  const [requestCategory, setRequestCategory] = useState([]);
  const [requestApprovalName, setRequestApprovalName] = useState("");
  const [pendingRequestOnly, setPendingRequestOnly] = useState(Boolean);
  const fetchRequestCategory = async () => {
    await axios.get(apiInventoryCategory, options).then((result) => {
      setRequestCategory(result.data);
    });
  };
  function handelRejectButton(value: any) {
    const updateRequestModel = {
      requestId: value,
      requestStatusId: Request.Reject,
    };
    axios
      .put(apiUpdateRequestUrl, updateRequestModel, options)
      .then((result) => {
        if (result) {
          fetchRequests(selectedRequestCategory);
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handelApproveButton(value: any) {
    const updateRequestModel = {
      requestId: value,
      requestStatusId: Request.Approve,
    };
    axios
      .put(apiUpdateRequestUrl, updateRequestModel, options)
      .then((result) => {
        if (result) {
          fetchRequests(selectedRequestCategory);
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const columns = [
    { title: "Request number", dataIndex: "requestId", key: "requestId" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    { title: "Created Date", dataIndex: "createdDate", key: "createdDate" },
    {
      title: "Status",
      dataIndex: "",
      key: "status",
      render: (record: any) => {
        return record.status == "Approved" ? (
          <Tag color={"green"}>{record.status}</Tag>
        ) : record.status == "Created" ?(
          <Tag color={"blue"}> {record.status}</Tag>
        ):(<Tag color={"red"}> {record.status}</Tag>);
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: any) => {
        return record.status == "Created" ? (
          <Space>
            <Button
              onClick={() => showModal(record.requestId, true)}
              className="request-approval-Approve-button"
            >
              Approve
            </Button>
            <Button
              onClick={() => showModal(record.requestId, false)}
              className="request-approval-reject-button"
            >
              Reject
            </Button>
          </Space>
        ) : null;
      },
    },
  ];
  const expandTableColumns = [
    { title: "ItemName", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  useEffect(() => {
    fetchRequestCategory();
  }, []);

  const showModal = (requestId: number, isApprove: boolean) => {
    setIsSelectedModalApprove(isApprove);
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (isSelectedModalApprove) {
      handelApproveButton(selectedRequestId);
    } else {
      handelRejectButton(selectedRequestId);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchRequests = (value: any) => {
    axios.get(apiGetRequestUrl.concat(value), options).then((result) => {
      var tableData = result.data.map((item: any, index: number) => {
        return {
          key: index,
          requestId: item.id,
          createdBy: item.createdBy,
          status: item.status,
          createdDate: (
            <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
              {item.dateTime}
            </Moment>
          ),
          description: item.items.map((item: any, index: number) => {
            return { key: index, name: item.name, amount: item.amount };
          }),
        };
      });
      var tableDataCreatedOnly = tableData.filter(
        (item: any) => item.status == "Created"
      );
      setTableData(tableData);
      setActiveTableData(tableDataCreatedOnly);
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: requestCategory.map((item: any, index: number) => (
        <Button
          key={index}
          className="dropDown-button"
          type="text"
          onClick={() => {
            setRequestApprovalName(item.name);
            fetchRequests(item.id);
            setSelectedRequestCategory(item.id);
          }}
        >
          {item.name}
        </Button>
      )),
    },
  ];
  function handelSwitchChange(checked: boolean) {
    setPendingRequestOnly(checked);
  }
  return (
    <>
      <div>
        <Switch className="switch" onChange={handelSwitchChange} />
        <p className="switch-text">Pending requests only</p>
      </div>
      <div className="center-div">
        <Dropdown
          menu={{
            items,
          }}
        >
          <Space className="ordered-item-card-text">
            Request Approval For
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
      <p className="login-header-text">
        {requestApprovalName} Request Approval
      </p>
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
        dataSource={pendingRequestOnly ? activeTableData : tableData}
      />
      <Modal
        title="Request Approval"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to{" "}
          {isSelectedModalApprove ? "approve" : "reject"} this request?
        </p>
      </Modal>
    </>
  );
};

export default RequestApproval;
