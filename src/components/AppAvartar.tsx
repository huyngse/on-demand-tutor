import { Avatar, Dropdown, MenuProps } from "antd"
import Cookies from "js-cookie";
import { CircleUser, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppAvartar = ({ user }: any) => {
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('loggedUser');
        navigate("/login");
    }
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
                <button onClick={logout}>
                    Đăng xuất
                </button>
            ),
            icon: <DoorOpen />,
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