import { formatNumberWithCommas } from "@/utils/numberUtil";
import { Table } from "antd"
import ActionButton from "./ActionButton";
import { Link } from "react-router-dom";
type DataTableProps = {
  dataSource: any[];
}
const DataTable = ({ dataSource }: DataTableProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.userId < b.userId) {
            return -1;
          } else if (a.userId > b.userId) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.fullName < b.fullName) {
            return -1;
          } else if (a.fullName > b.fullName) {
            return 1;
          } else {
            return 0;
          }
        },
      },
      render: (_: any, record: any) => {
        return <Link to={`/admin/tutor/${record.userId}`}>{record.fullName}</Link>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.emailAddress < b.emailAddress) {
            return -1;
          } else if (a.emailAddress > b.emailAddress) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'city',
      key: 'city',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.city < b.city) {
            return -1;
          } else if (a.city > b.city) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Số lớp đã tạo',
      dataIndex: 'numOfClass',
      key: 'numOfClass',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.numOfClass < b.numOfClass) {
            return -1;
          } else if (a.numOfClass > b.numOfClass) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Thu nhập',
      dataIndex: 'income',
      key: 'income',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.income < b.income) {
            return -1;
          } else if (a.income > b.income) {
            return 1;
          } else {
            return 0;
          }
        },
      },
      render: (_: any, record: any) => {
        return formatNumberWithCommas(record.income) + "₫";
      },
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: any) => (
          <div>
              <ActionButton userId={record.userId}  />
          </div>
      ),
  },
  ]
  return (
    <Table dataSource={dataSource} columns={columns} rowKey="id" />
  )
}

export default DataTable