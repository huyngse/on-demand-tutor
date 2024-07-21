import { Button, Dropdown, MenuProps } from "antd";
import { EllipsisVertical, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  booking: any;
  rerender: () => void;
}

const ActionButton = ({ booking }: Props) => {
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: "Xem chi tiết",
      key: 'detail',
      icon: <Info width={15} />,
      onClick: () => { navigate(`/tutor/booking/${booking.bookingId}`) }
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} />
      </Dropdown>
    </>
  )
}

export default ActionButton