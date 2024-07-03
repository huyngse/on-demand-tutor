import { formatNumberWithCommas } from "@/utils/numberUtil";
import { Table } from "antd"
type DataTableProps = {
  dataSource: any[];
}
const DataTable = ({ dataSource }: DataTableProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'classId',
      key: 'classId',
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
      title: 'Lớp học',
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
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.createdDate < b.createdDate) {
            return -1;
          } else if (a.createdDate > b.createdDate) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Hình thức dạy',
      dataIndex: 'classMethod',
      key: 'classMethod',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.classMethod < b.classMethod) {
            return -1;
          } else if (a.classMethod > b.classMethod) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Phí dạy học',
      dataIndex: 'classFee',
      key: 'classFee',
      render: (_: any, record: any) => {
        return formatNumberWithCommas(record.classFee) + " vnd/buổi";
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
    
  ]
  return (
    <Table dataSource={dataSource} columns={columns} rowKey="classId" />
  )
}

export default DataTable