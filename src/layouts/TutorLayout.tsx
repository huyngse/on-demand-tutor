import useAuthentication from "@/hooks/useAuthentication";
import { useAppSelector } from "@/hooks/useRedux";
import { getTutorBooking } from "@/lib/api/booking-api";
import { Avatar, Badge, Layout, Menu, MenuProps } from "antd";
import { ArrowBigLeft, Bell, CalendarClock, CircleUserRound, DoorOpen, LayoutDashboard, Shapes } from "lucide-react";
import { ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
type TutorLayoutProps = {
    children: ReactNode,
}
const TutorLayout = ({ children }: TutorLayoutProps) => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const navigate = useNavigate();
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
        if (loggedUser) {
            fetchTutorBooking();
        }
    }, [loggedUser]);
    const items: MenuItem[] = [
        {
            label: "Dashboard",
            key: "dashboard",
            icon: <LayoutDashboard />,
        },
        {
            label: "Trang cá nhân",
            key: "profile",
            icon: <CircleUserRound />,
        },
        {
            label: <Badge count={bookings.length}>
                <div className="pe-3">
                    Danh sách lớp học
                </div>
            </Badge>,
            key: "class",
            icon: <Shapes />,
        },
        {
            label: "Thời gian biểu",
            key: "timetable",
            icon: <CalendarClock />,
            disabled: true,
        },
        {
            label: "Thông báo",
            key: "notification",
            icon: <Bell />,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            label: "Quay về trang chủ",
            key: "back",
            icon: <ArrowBigLeft />,
        },
        {
            type: 'divider',
        },
        {
            label: "Đăng xuất",
            key: "logout",
            icon: <DoorOpen />,
        },
    ];
    const handleSidebarClick = (e: any) => {
        switch (e.key) {
            case "logout": {
                logout();
                break;
            }
            case "back": {
                navigate("/");
                break;
            }
            case "profile": {
                navigate("/tutor/profile");
                break;
            }
            case "dashboard": {
                navigate("/tutor/dashboard");
                break;
            }
            case "class": {
                navigate("/tutor/class");
                break;
            }
        }
    }
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250} theme="light" className="drop-shadow">
                {
                    !collapsed && (
                        <div className="demo-logo-vertical text-black py-3 px-5">
                            <div className='font-sm'>
                                Gia sư
                            </div>
                            <Link to={"/"}>
                                <div className='font-bold text-xl'>
                                    On<span className='text-blue-500'>Demand</span>Tutor
                                </div>
                            </Link>

                        </div>
                    )
                }
                <Menu
                    theme="light"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onClick={handleSidebarClick}
                />
            </Sider>

            <Layout className="bg-blue-50">
                <Header className='px-3 bg-white flex justify-end items-center gap-2'>
                    <p className='font-bold'>
                        {loggedUser?.fullName ? loggedUser.fullName : "Họ và tên"}
                    </p>
                    <Avatar shape="circle" className="drop-shadow" src={loggedUser?.profilePicUrl}>
                        {loggedUser?.fullName ? loggedUser.fullName : "Họ và tên"}
                    </Avatar>
                </Header>
                <Content style={{ margin: '0 16px' }} >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }} className="bg-white">
                    OnDemandTutor ©{new Date().getFullYear()} - SWP391
                </Footer>
            </Layout>
        </Layout>
    )
}

export default TutorLayout