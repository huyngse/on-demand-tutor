import useAuthentication from "@/hooks/useAuthentication";
import { Avatar, Dropdown, MenuProps } from "antd"
import { CircleUser, DoorOpen } from "lucide-react";

const AppAvartar = ({ user }: any) => {
    const { logout } = useAuthentication();
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href="profile">
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
    return (
        <Dropdown menu={{ items }} trigger={["click"]} className="cursor-pointer">
            <div className="flex gap-2 items-center">
                <p className="font-semibold">
                    {user.fullName}
                </p>
                <Avatar shape="circle" className="drop-shadow" src={user.profilePicUrl} />
            </div>
        </Dropdown>
    )
}

export default AppAvartar