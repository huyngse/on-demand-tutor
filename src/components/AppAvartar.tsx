import { Roles } from "@/constants/roles";
import useAuthentication from "@/hooks/useAuthentication";
import { useAppSelector } from "@/hooks/useRedux";
import { getTutorBooking } from "@/lib/api/booking-api";
import { Avatar, Badge, Dropdown, MenuProps } from "antd"
import { CircleUser, DoorOpen, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppAvartar = () => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const { logout } = useAuthentication();
    const [bookings, setBookings] = useState<any[]>([]);
    useEffect(() => {
        const fetchTutorBooking = async () => {
            const { error, data } = await getTutorBooking(loggedUser.userId);
            if (error) {
                toast.error("Lấy thông tin đặt lớp thất bại!", {
                    toastId: 'error_tutorAvatarBooking',
                });
            } else {
                const filteredBookings = data.filter((booking: any) => booking.status == "Pending");
                setBookings(filteredBookings);
            }
        }
        if (loggedUser.role == Roles.Tutor) {
            fetchTutorBooking();
        }
    }, [])

    var profileUrl: string;
    switch (loggedUser.role) {
        case Roles.Admin: {
            profileUrl = "/admin/";
            break;
        }
        case Roles.Tutor: {
            profileUrl = "/tutor/";
            break;
        }
        case Roles.Student: {
            profileUrl = "/student/";
            break;
        }
        default: {
            profileUrl = "";
        }
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href={profileUrl}>
                    Quản lý tài khoản
                </a>
            ),
            icon: <CircleUser />,
        },
        {
            key: '2',
            label: (
                "Đăng xuất"
            ),
            icon: <DoorOpen />,
            onClick: logout,
        },
    ];

    const adminItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href={profileUrl}>
                    Vào trang quản lí
                </a>
            ),
            icon: <LayoutDashboard />,
        },
        {
            key: '2',
            label: (
                "Đăng xuất"
            ),
            icon: <DoorOpen />,
            onClick: logout,
        },
    ];
    return (
        <Dropdown menu={loggedUser.role == Roles.Admin ? { items: adminItems } : { items }} trigger={["click"]} className="cursor-pointer">
            <div className="flex gap-2 items-center">
                <p className="font-semibold">
                    {loggedUser.fullName ? loggedUser.fullName : "Họ và tên"}
                </p>
                {
                    (loggedUser.role == Roles.Tutor || loggedUser.role == Roles.Student) && (
                        <Badge count={bookings.length}>
                            <Avatar
                                shape="circle"
                                className="drop-shadow"
                                src={loggedUser.profileImage}
                            >
                                {loggedUser.fullName ? loggedUser.fullName : "Họ và tên"}
                            </Avatar>
                        </Badge>
                    )
                }
                {
                    loggedUser.role != Roles.Tutor && loggedUser.role != Roles.Student && (
                        <Avatar
                            shape="circle"
                            className="drop-shadow"
                            src={loggedUser.profileImage}
                        >
                            {loggedUser.fullName ? loggedUser.fullName : "Họ và tên"}
                        </Avatar>
                    )
                }
            </div>
        </Dropdown>
    )
}

export default AppAvartar