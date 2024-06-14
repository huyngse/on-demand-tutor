import { Table, Tag } from "antd";
import ActionButton from "./ActionButton";
import { Roles } from "@/constants/roles";

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
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.username < b.username) {
                        return -1;
                    } else if (a.username > b.username) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
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
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.fullname < b.fullname) {
                        return -1;
                    } else if (a.fullname > b.fullname) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
            },
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (_: any, record: any) => {
                return record.gender == "Male" ?
                    <span className="text-blue-500">Nam</span>
                    :
                    <span className="text-pink-500">Nữ</span>
            }
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (_: any, record: any) => {
                var roleName = "";
                var color = "";
                switch (record.role) {
                    case Roles.Tutor: {
                        roleName = "Gia sư";
                        color = "purple";
                        break;
                    }
                    case Roles.Admin: {
                        roleName = "Admin";
                        color = "cyan";
                        break;
                    }
                    case Roles.Student: {
                        roleName = "Phụ huynh/Học sinh";
                        color = "blue";
                        break;
                    }
                    case Roles.Moderator: {
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
                    value: Roles.Tutor,
                },
                {
                    text: 'Phụ huynh/Học sinh',
                    value: Roles.Student,
                },
                {
                    text: 'Admin',
                    value: Roles.Admin,
                },
                {
                    text: 'Quản trị viên',
                    value: Roles.Moderator,
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
                    <ActionButton id={record.userId} isActive={false} />
                </div>
            ),
        },
    ];
    return (
        <Table dataSource={dataSource} columns={columns} rowKey="userId" />
    )
}

export default DataTable