import { formatDate } from "@/utils/dateUtil";
import ActionButton from "./ActionButton";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom";

type DataTableProps = {
  dataSource: any[];
  rerender: () => void;
}

const Datatable = ({ dataSource, rerender }: DataTableProps) => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.bookingId < b.bookingId) {
            return -1;
          } else if (a.bookingId > b.bookingId) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Tên lớp',
      dataIndex: 'className',
      key: 'className',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.className < b.className) {
            return -1;
          } else if (a.className > b.className) {
            return 1;
          } else {
            return 0;
          }
        },
      },
      render: (_: any, record: any) => {
        return <Link to={`/student/class/${record.bookingId}`}>{record.className}</Link>;
      }
    },
    {
      title: 'Gia sư',
      dataIndex: 'tutorName',
      key: 'tutorName',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.tutorName < b.tutorName) {
            return -1;
          } else if (a.tutorName > b.tutorName) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: {
        compare: (a: any, b: any) => {
          const dateA = new Date(a.createDate);
          const dateB = new Date(b.createDate);
          return dateB.getTime() - dateA.getTime()
        },
      },
      render: (_: any, record: any) => {
        return formatDate(new Date(record.createDate));
      }
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => {
        var color = "";
        var label = "";
        switch (record.status) {
          case "Pending": {
            color = "blue";
            label = "Đợi xác nhận";
            break;
          }
          case "Accepted": {
            color = "green";
            label = "Đã chấp nhận";
            break;
          }
          case "Started": {
            color = "cyan";
            label = "Đang học";
            break;
          }
          case "Ended": {
            color = "gold";
            label = "Đã kết thúc";
            break;
          }
          case "Denied": {
            color = "red";
            label = "Đã từ chối";
            break;
          }
          case "Cancelled": {
            color = "default";
            label = "Đã hủy";
            break;
          }
          case "Request_change": {
            color = "purple";
            label = "Yêu cầu đổi lịch";
            break;
          }
        }
        return (
          <Tag color={color}>{label}</Tag>
        )
      },
      sorter: {
        compare: (a: any, b: any) => {
          if (a.status < b.status) {
            return -1;
          } else if (a.status > b.status) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <ActionButton booking={record} rerender={rerender} />
        </div>
      ),
    },
  ];
  return (
    <Table dataSource={dataSource} columns={columns} rowKey="bookingId" />
  )
}

export default Datatable