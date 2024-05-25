import { ReactNode, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Book, BookUser, CircleHelp, DoorOpen, Newspaper, Users } from 'lucide-react';
import useAuthentication from '@/hooks/useAuthentication';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


type AdminLayoutProps = {
    children: ReactNode
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
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
            label: <button onClick={logout}>Đăng xuất</button>,
            key: "6",
            icon: <DoorOpen />,
        },
    ];
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
                <h1>Hello</h1>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }} />
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
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout