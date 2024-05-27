import { Table, Tag } from "antd";
import ActionButton from "./ActionButton";

type DataTableProps = {
    dataSource: any[];
}
const DataTable = ({ dataSource }: DataTableProps) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (_: any, record: any) => {
                var roleName = "";
                var color = "";
                switch (record.role) {
                    case "tutor": {
                        roleName = "Gia sư";
                        color = "purple";
                        break;
                    }
                    case "admin": {
                        roleName = "Admin";
                        color = "cyan";
                        break;
                    }
                    case "student": {
                        roleName = "Học sinh/phụ huynh";
                        color = "blue";
                        break;
                    }
                    case "moderator": {
                        roleName = "Quản trị viên";
                        color = "gold";
                        break;
                    }
                }
                return (
                    <Tag color={color}>
                        {roleName}
                    </Tag>
                )
            }
        },
        {
            title: 'Trạng thái',
            key: 'isActive',
            render: (_: any, record: any) => (
                <div>
                   <div className={`${record.isActive ? "bg-green-500" : "bg-red-500"} p-1 inline-block rounded-full`}></div>
                </div>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (_: any, record: any) => (
                <div>
                    <ActionButton id={record.id} isActive={record.isActive}/>
                </div>
            ),
        },
    ];
    return (
        <Table dataSource={dataSource} columns={columns} rowKey="id"/>
    )
}

export default DataTable