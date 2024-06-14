import useAuthentication from "@/hooks/useAuthentication"
import { useAppSelector } from "@/hooks/useRedux"
import { Avatar, Layout, Menu, MenuProps } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { ArrowBigLeft, Bell, CalendarClock, CircleUserRound, DoorOpen, Shapes } from "lucide-react"
import { ReactNode, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type StudentLayoutProps = {
    children: ReactNode,
}
type MenuItem = Required<MenuProps>['items'][number];
const StudentLayout = ({ children }: StudentLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const navigate = useNavigate();
    const { logout } = useAuthentication();
    const items: MenuItem[] = [
        {
            label: "Trang cá nhân",
            key: "profile",
            icon: <CircleUserRound />,
        },
        {
            label: "Lớp học",
            key: "class",
            icon: <Shapes />,
        },
        {
            label: "Thời gian biểu",
            key: "timetable",
            icon: <CalendarClock />,
        },
        {
            label: "Thông báo",
            key: "notification",
            icon: <Bell />,
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
                navigate("/student/profile");
                break;
            }
            case "dashboard": {
                navigate("/student/dashboard");
                break;
            }
            case "class": {
                navigate("/student/class");
                break;
            }
            case "timetable": {
                navigate("/student/timetable");
                break;
            }
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250} theme="light" className="drop-shadow">
                {
                    !collapsed && (
                        <div className="demo-logo-vertical text-black py-3 px-5">
                            <div className='font-sm'>
                                Học sinh
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
                        {loggedUser?.fullname ? loggedUser.fullname : "Họ và tên"}
                    </p>
                    <Avatar shape="circle" className="drop-shadow" src={loggedUser?.profilePicUrl}>
                        {loggedUser?.fullname ? loggedUser.fullname : "Họ và tên"}
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

export default StudentLayout