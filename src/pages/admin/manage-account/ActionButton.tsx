import { Button, Dropdown, MenuProps } from "antd"
import { EllipsisVertical, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
type ActionButtonProps = {
    id: number;
    isActive: boolean;
}
const ActionButton = ({ id, isActive }: ActionButtonProps) => {
    const handleDelete = () => {
        console.log("Delete account with id: ", id);
    }
    const items: MenuProps['items'] = [
        {
            label: "Chỉnh sửa",
            key: '0',
            icon: <Pencil width={15} />,
        },
        {
            label: isActive ? "Hủy kích hoạt" : "Kích hoạt",
            key: '1',
            icon: isActive ? <EyeOff width={15} /> : <Eye width={15} />,
        },
        {
            type: 'divider',
        },
        {
            label: <div className="text-red-500">Xóa</div>,
            key: '3',
            onClick: handleDelete,
            icon: <Trash2 width={15} color="red" />
        },
    ];
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} />
        </Dropdown>
    )
}

export default ActionButton