import { Table, Tag } from "antd";
import ActionButton from "./ActionButton";
import { formatDate } from "@/utils/dateUtil";
import { Link } from "react-router-dom";

type Props = {
    dataSource: any[];
    rerender: () => void;
}

const DataTable = ({ dataSource, rerender }: Props) => {
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
                return <Link to={`/tutor/booking/${record.bookingId}`}>{record.className}</Link>;
            }
        },
        {
            title: 'Học sinh',
            dataIndex: 'studentName',
            key: 'studentName',
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.studentName < b.studentName) {
                        return -1;
                    } else if (a.studentName > b.studentName) {
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
                        label = "Đang dạy";
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
                    case "Cancelled_by_tutor": {
                        color = "default";
                        label = "Đã hủy bởi gia sư";
                        break;
                    }
                    case "Cancelled_by_student": {
                        color = "default";
                        label = "Đã hủy bởi học sinh";
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
            filters: [
                {
                    text: 'Đợi xác nhận',
                    value: 'Pending',
                },
                {
                    text: 'Đã chấp nhận',
                    value: 'Accepted',
                },
                {
                    text: 'Đang dạy',
                    value: 'Started',
                },
                {
                    text: 'Đã kết thúc',
                    value: 'Ended',
                },
                {
                    text: 'Đã hủy',
                    value: 'Cancelled',
                },
            ],
            onFilter: (value: any, record: any) => record.status.indexOf(value as string) === 0,
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

export default DataTable