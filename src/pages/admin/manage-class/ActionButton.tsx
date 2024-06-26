import { MenuProps } from "antd";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ActionButtonProps = {
  id: number;
  isVerified: boolean;
}
const ActionButton = ({ id, isVerified }: ActionButtonProps) => {
  const navigate = useNavigate();
  const handleToggleVerify = (currentState: boolean) => {
    toast.success(`${currentState ? "Hủy" : "Kích hoạt"} tài khoản thành công`);
}
  const items: MenuProps['items'] = [
    {
      label: "Chỉnh sửa",
      key: '0',
      icon: <Pencil width={15} />,
      onClick: () => { navigate(`/admin/account/${id}/edit`) }
    },
    {
      label: isVerified ? "Hủy kích hoạt" : "Kích hoạt",
      key: '1',
      icon: isVerified ? <EyeOff width={15} /> : <Eye width={15} />,
      onClick: () => { handleToggleVerify(isVerified) },
    },
    {
      type: 'divider',
    },
  ];
  return (
    <div>ActionButton</div>
  )
}

export default ActionButton