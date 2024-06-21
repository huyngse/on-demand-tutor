import { Button, Dropdown, MenuProps } from "antd";
import { EllipsisVertical, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ActionButtonProps = {
  booking: any;
  rerender: () => void;
}
const ActionButton = ({ booking, rerender }: ActionButtonProps) => {
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: "Xem chi tiết",
      key: '0',
      icon: <Info width={15} />,
      onClick: () => { navigate(`/student/class/${booking.id}`) }
    },
    {
      type: 'divider',
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} />
    </Dropdown>
  )
}

export default ActionButton;