import { formatNumberWithCommas } from "@/utils/numberUtil";
import ActionButton from "./ActionButton";
import { Table } from "antd";

type DataTableProps = {
  dataSource: any[];
}

const Datatable = ({ dataSource }: DataTableProps) => {
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
      title: 'Trình độ',
      dataIndex: 'classLevel',
      key: 'classLevel',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.classLevel < b.classLevel) {
            return -1;
          } else if (a.classLevel > b.classLevel) {
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
      render: (_: any, record: any) => {
        return record.classMethod == "In-person" ?
          <span className="text-pink-500">Trực tiếp</span>
          :
          <span className="text-blue-500">Online</span>
      },
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
      key: 'active',
      render: (_: any, record: any) => (
        <div>
          <div className={`${record.active ? "bg-green-500" : "bg-red-500"} p-1 inline-block rounded-full`}></div>
        </div>
      ),
      sorter: {
        compare: (a: any, b: any) => {
          if (a.active === b.active) {
            return 0;
          } else if (a.active) {
            return 1;
          } else {
            return -1;
          }
        },
      },
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <ActionButton id={record.ClassId} isActive={record.active} />
        </div>
      ),
    },
  ];
  return (
    <Table dataSource={dataSource} columns={columns} rowKey="classId" />
  )
}

export default Datatable