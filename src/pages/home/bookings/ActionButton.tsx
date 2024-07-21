import { changeBookingStatus } from "@/lib/api/booking-api";
import { Button, Dropdown, MenuProps, Modal } from "antd";
import { EllipsisVertical, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  booking: any;
  rerender: () => void;
}

const ActionButton = ({ booking, rerender }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: "Xem chi tiết",
      key: 'detail',
      icon: <Info width={15} />,
      onClick: () => { navigate(`/tutor/booking/${booking.bookingId}`) }
    },
  ];
  const handleCancelBooking = async () => {
    const cancelResult = await changeBookingStatus(booking.bookingId, "Cancelled");
    if (cancelResult.error) {
      toast.error("Hủy đơn đặt thất bại");
    } else {
      toast.success("Hủy đơn đặt thành công");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleCancelBooking();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (booking.status == "Pending" || booking.status == "Accepted" || booking.status == "Started") {
    items.push({ type: 'divider', });
    items.push(
      {
        label: "Hủy đơn đặt",
        key: 'cancel',
        onClick: showModal,
      }
    );
  }
  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} />
      </Dropdown>
      <Modal
        title="Xác nhận hủy đơn đặt dạy học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => (
          <>
            <Button type="default" htmlType="button" onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" onClick={handleOk}>
              Xác nhận
            </Button>
          </>
        )}
      >
      </Modal>
    </>
  )
}

export default ActionButton