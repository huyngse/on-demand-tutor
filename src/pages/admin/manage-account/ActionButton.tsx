import { Button, Dropdown, MenuProps } from "antd"
import { EllipsisVertical, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type ActionButtonProps = {
    id: number;
    isActive: boolean;
}
const ActionButton = ({ id, isActive }: ActionButtonProps) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        console.log("Delete account with id: ", id);
    }
    const handleToggleActive = (currentState: boolean) => {
        toast.success(`${currentState ? "Hủy kích hoạt" : "Kích hoạt"} tài khoản thành công`);
    }
    const items: MenuProps['items'] = [
        {
            label: "Chỉnh sửa",
            key: '0',
            icon: <Pencil width={15} />,
            onClick: () => { navigate(`/admin/account/${id}/edit`) }
        },
        {
            label: isActive ? "Hủy kích hoạt" : "Kích hoạt",
            key: '1',
            icon: isActive ? <EyeOff width={15} /> : <Eye width={15} />,
            onClick: () => { handleToggleActive(isActive) },
        },
        {
            type: 'divider',
        },
        {
            label: <div className="text-red-500 opacity-50">Xóa</div>,
            key: '3',
            onClick: handleDelete,
            icon: <Trash2 width={15} color="red" className="opacity-50"/>,
            disabled: true,
        },
    ];
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} />
        </Dropdown>
    )
}

export default ActionButton