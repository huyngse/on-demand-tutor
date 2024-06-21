import useAuthentication from "@/hooks/useAuthentication";
import { useAppSelector } from "@/hooks/useRedux";
import { Avatar, Dropdown, MenuProps } from "antd"
import { CircleUser, DoorOpen } from "lucide-react";

const AppAvartar = ({ user }: any) => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const { logout } = useAuthentication();
    var profileUrl: string;
    switch (loggedUser.role) {
        case "Admin": {
            profileUrl = "/admin/";
            break;
        }
        case "Tutor": {
            profileUrl = "/tutor/";
            break;
        }
        case "Student": {
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
    return (
        <Dropdown menu={{ items }} trigger={["click"]} className="cursor-pointer">
            <div className="flex gap-2 items-center">
                <p className="font-semibold">
                    {loggedUser.fullName ? loggedUser.fullName : "Họ và tên"}
                </p>
                <Avatar
                    shape="circle"
                    className="drop-shadow"
                    src={loggedUser.profileImage}
                >
                    {loggedUser.fullName ? loggedUser.fullName : "Họ và tên"}
                </Avatar>
            </div>
        </Dropdown>
    )
}

export default AppAvartar