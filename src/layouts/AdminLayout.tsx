import { ReactNode, useState } from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu } from 'antd';
import { Book, BookUser, CircleHelp, DoorOpen, Newspaper, Users } from 'lucide-react';
import useAuthentication from '@/hooks/useAuthentication';
import { useAppSelector } from '@/hooks/useRedux';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


type AdminLayoutProps = {
    children: ReactNode
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const navigate = useNavigate();
    const { logout } = useAuthentication();
    const items: MenuItem[] = [
        {
            label: "Quản lí người dùng",
            key: "1",
            icon: <Users />,
            children: [
                {
                    label: "Tài khoản",
                    key: "1a",
                },
                {
                    label: "Gia sư",
                    key: "1b",
                },
            ]
        },
        {
            label: "Quản lí môn học",
            key: "2",
            icon: <Book />,
        },
        {
            label: "Quản lí lớp học",
            key: "3",
            icon: <BookUser />,
        },
        {
            label: "Quản lí FAQ",
            key: "4",
            icon: <CircleHelp />,
            disabled: true,
        },
        {
            label: "Quản lí blog",
            key: "5",
            icon: <Newspaper />,
            disabled: true,
        },
        {
            label: "Đăng xuất",
            key: "6",
            icon: <DoorOpen />,
        },
    ];
    const handleSidebarClick = (e: any) => {
        switch (e.key) {
            case "6": {
                logout();
                break;
            }
            case "1a": {
                navigate("/admin/manage-account");
                break;
            }
        }
    }
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
                {
                    !collapsed && (
                        <div className="demo-logo-vertical text-white py-3 px-5">
                            <div className='font-sm'>
                                Quản lí
                            </div>
                            <div className='font-bold text-xl'>
                                On<span className='text-blue-400'>Demand</span>Tutor
                            </div>
                        </div>
                    )
                }
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onClick={handleSidebarClick}
                />
            </Sider>
            <Layout>
                <Header className='px-3 bg-white flex justify-end items-center gap-2'>
                    <p className='font-bold'>{loggedUser?.fullName}</p>
                    <Avatar shape="circle" className="drop-shadow" src={loggedUser?.profilePicUrl} />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    OnDemandTutor ©{new Date().getFullYear()} - SWP391
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout