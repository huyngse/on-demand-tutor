import { formatNumberWithCommas } from "@/utils/numberUtil";
import ActionButton from "./ActionButton";
import { Table, Tag } from "antd";

type DataTableProps = {
  dataSource: any[];
  rerender: () => void;
}

const Datatable = ({ dataSource, rerender }: DataTableProps) => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'classId',
      key: 'classId',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.classId < b.classId) {
            return -1;
          } else if (a.classId > b.classId) {
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
    },

    {
      title: 'Học phí',
      dataIndex: 'classFee',
      key: 'classFee',
      render: (_: any, record: any) => {
        return (
          <span>
            {formatNumberWithCommas(record.classFee)}₫
          </span>
        )
      },
      sorter: {
        compare: (a: any, b: any) => {
          if (a.classFee < b.classFee) {
            return -1;
          } else if (a.classFee > b.classFee) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },

    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => {
        var color = "";
        var label = "";
        switch (record.status) {
          case "pending": {
            color = "default";
            label = "Đợi xác nhận";
            break;
          }
          case "accepted": {
            color = "green";
            label = "Đã chấp nhận";
            break;
          }
          case "denied": {
            color = "red";
            label = "Đã từ chối";
            break;
          }
          case "cancelled": {
            color = "volcano";
            label = "Đã hủy";
            break;
          }
          case "request_change": {
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
    <Table dataSource={dataSource} columns={columns} rowKey="classId" />
  )
}

export default Datatable