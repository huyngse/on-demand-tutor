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
      dataIndex: 'ClassId',
      key: 'ClassId',
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
      dataIndex: 'ClassName',
      key: 'ClassName',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.ClassName < b.ClassName) {
            return -1;
          } else if (a.ClassName > b.ClassName) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },

    {
      title: 'Trình độ',
      dataIndex: 'ClassLevel',
      key: 'ClassLevel',
      sorter: {
        compare: (a: any, b: any) => {
          if (a.ClassLevel < b.ClassLevel) {
            return -1;
          } else if (a.ClassLevel > b.ClassLevel) {
            return 1;
          } else {
            return 0;
          }
        },
      },

    },
    {
      title: 'Hình thức dạy',
      dataIndex: 'ClassMethod',
      key: 'ClassMethod',
      render: (_: any, record: any) => {
        return record.ClassMethod == "In-person" ?
          <span className="text-pink-500">Trực tiếp</span>
          :
          <span className="text-blue-500">Online</span>
      },
      sorter: {
        compare: (a: any, b: any) => {
          if (a.ClassMethod < b.ClassMethod) {
            return -1;
          } else if (a.ClassMethod > b.ClassMethod) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Học phí',
      dataIndex: 'ClassFee',
      key: 'ClassFee',
      render: (_: any, record: any) => {
        return (
          <span>
            {formatNumberWithCommas(record.ClassFee)}₫
          </span>
        )
      },
      sorter: {
        compare: (a: any, b: any) => {
          if (a.ClassFee < b.ClassFee) {
            return -1;
          } else if (a.ClassFee > b.ClassFee) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },

    {
      title: 'Trạng thái',
      key: 'Active',
      render: (_: any, record: any) => (
        <div>
          <div className={`${record.Active ? "bg-green-500" : "bg-red-500"} p-1 inline-block rounded-full`}></div>
        </div>
      ),
      sorter: {
        compare: (a: any, b: any) => {
          if (a.Active === b.Active) {
            return 0;
          } else if (a.Active) {
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
          <ActionButton id={record.ClassId} isActive={record.Active} />
        </div>
      ),
    },
  ];
  return (
    <Table dataSource={dataSource} columns={columns} rowKey="classId" />
  )
}

export default Datatable