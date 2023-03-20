import { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  Button,
  Modal,
  notification,
  Switch,
  Table,
  Tag,
} from "antd";
import { apiBaseUrl, options } from "config";
import axios, { isCancel } from "axios";
import { Order, Request } from "Enum";
const apiGetOrderUrl = `${apiBaseUrl}/Order/GetAllKitchenOrder`;
const apiUpdateKitchenOrderStatus=`${apiBaseUrl}/Order/updateKitchenOrderStatus`;
const OrderHistory = () => {
  const [tableData, setTableData] = useState([]);
  const [activeTableData, setActiveTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [pendingOrderOnly, setPendingOrderOnly] = useState(Boolean);

  const openNotification = (value:any) => {
    if(value=="true"){
      return(
    notification.success({
      message: 'Cancelled order successfully!',
      placement:'bottomRight'
  }));}
  else if(value=="can not cancel this order it took you more than 5 minute!"){
  notification.error({
    message: 'Can not cancel this order it took you more than 5 minute!',
    placement:'bottomRight'
  });
  }
  };
  function handelCancelButton(value: any) {
    const updateOrderModel = {
      orderId: value,
      orderStatusId: Order.Canceled,
    };
    axios
      .put(apiUpdateKitchenOrderStatus, updateOrderModel, options)
      .then((result) => {
        if (result) {
          fetchAllOrders();
          setIsModalOpen(false);
          openNotification(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const columns = [
    { title: "Order number", dataIndex: "orderId", key: "orderId" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    { title: "Created Date", dataIndex: "createdDate", key: "createdDate" },
    {
      title: "Status",
      dataIndex: "",
      key: "status",
      render: (record: any) => {
        return record.status == "Delivered" ? (
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
            <Button
              onClick={() =>showModal(record.orderId)}
              className="request-approval-reject-button"
            >
              Cancel
            </Button>
        ) : null;
      },
    },
  ];
  const expandTableColumns = [
    { title: "ItemName", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const showModal = (OrderId: number) => {
    setSelectedOrderId(OrderId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
     handelCancelButton(selectedOrderId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchAllOrders = () => {
    axios.get(apiGetOrderUrl, options).then((result) => {
      var tableData = result.data.map((item: any, index: number) => {
        return {
          key: index,
          orderId: item.id,
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
  function handelSwitchChange(checked: boolean) {
    setPendingOrderOnly(checked);
  }
  return (
    <>
      <div>
        <Switch className="switch" onChange={handelSwitchChange} />
        <p className="switch-text">Pending order only</p>
      </div>
      <p className="login-header-text">Order history</p>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              style={{ width: "30%" }}
              columns={expandTableColumns} 
              pagination={false}
              dataSource={record.description}
            />
          ),
        }}
        dataSource={pendingOrderOnly? activeTableData : tableData}
      />
      <Modal
        title="Request Approval"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to cancel this order?
        </p>
      </Modal>
    </>
  );
};

export default OrderHistory;
