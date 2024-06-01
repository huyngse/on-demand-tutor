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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.email < b.email) {
                        return -1;
                    } else if (a.email > b.email) {
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
                    case "student_parent": {
                        roleName = "Phụ huynh/Học sinh";
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
            },
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.role < b.role) {
                        return -1;
                    } else if (a.role > b.role) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
            },
            onFilter: (value: any, record: any) => record.role === value,
            filters: [
                {
                    text: 'Gia sư',
                    value: 'tutor',
                },
                {
                    text: 'Phụ huynh/Học sinh',
                    value: 'student_parent',
                },
                {
                    text: 'Admin',
                    value: 'admin',
                },
                {
                    text: 'Quản trị viên',
                    value: 'moderator',
                },
            ],
        },
        {
            title: 'Trạng thái',
            key: 'isActive',
            render: (_: any, record: any) => (
                <div>
                    <div className={`${record.isActive ? "bg-green-500" : "bg-red-500"} p-1 inline-block rounded-full`}></div>
                </div>
            ),
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.isActive === b.isActive) {
                        return 0;
                    } else if (a.isActive) {
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
                    <ActionButton id={record.id} isActive={record.isActive} />
                </div>
            ),
        },
    ];
    return (
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
    )
}

export default DataTable