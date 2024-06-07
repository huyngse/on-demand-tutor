import { formatNumberWithCommas } from "@/utils/numberUtil";
import { Table } from "antd"
type DataTableProps = {
  dataSource: any[];
}
const DataTable = ({ dataSource }: DataTableProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
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
    },
    {
      title: 'Nghề nghiệp',
      dataIndex: 'tutorType',
      key: 'tutorType',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.tutorType < b.tutorType) {
            return -1;
          } else if (a.tutorType > b.tutorType) {
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
      title: 'Phí dạy học',
      dataIndex: 'pricePerSession',
      key: 'pricePerSession',
      render: (_: any, record: any) => {
        return formatNumberWithCommas(record.pricePerSession) + " vnd/buổi";
      },
      sorter: {
        compare: (a: any, b: any) => {
          if (a.pricePerSession < b.pricePerSession) {
            return -1;
          } else if (a.pricePerSession > b.pricePerSession) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
  ]
  return (
    <Table dataSource={dataSource} columns={columns} rowKey="id" />
  )
}

export default DataTable