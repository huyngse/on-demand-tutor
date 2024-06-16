import { deactivateClass } from "@/lib/api/class-api";
import { Button, Dropdown, MenuProps } from "antd";
import { EllipsisVertical, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ActionButtonProps = {
  id: number;
  isActive: boolean;
  rerender: () => void;
}
const ActionButton = ({ id, isActive, rerender }: ActionButtonProps) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    console.log("Delete account with id: ", id);
  }
  const handleToggleActive = async (currentState: boolean) => {
    const { error } = await deactivateClass(id);
    if (error) {
        toast.error(`${currentState ? "Đóng lớp" : "Mở lớp"} thất bại`);
    } else {
        toast.success(`${currentState ? "Đóng lớp" : "Mở lớp"} thành công`);
        setTimeout(() => {
          rerender();
        }, 1000)
    }
  }
  const items: MenuProps['items'] = [
    {
      label: "Chỉnh sửa",
      key: '1',
      icon: <Pencil width={15} />,
      onClick: () => { navigate(`/tutor/class/${id}/edit`) }
  },
    {
      label: isActive ? "Đóng lớp" : "Mở lớp",
      key: '2',
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
      icon: <Trash2 width={15} color="red" className="opacity-50" />,
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