import { deleteDegree } from "@/lib/api/tutor-api";
import { Button, Modal, Popconfirm } from "antd";
import { PopconfirmProps } from "antd/lib";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
type Props = {
    data: any;
    rerender: () => void;
}
const AchievementCard = ({ data, rerender }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const popupConfirm: PopconfirmProps['onConfirm'] = async (_) => {
        const deleteResult = await deleteDegree(data.degreeId);
        if (deleteResult.error) {
            toast.error("Xóa ảnh thất bại");
        } else {
            toast.success("Xóa ảnh thành công");
            setTimeout(() => { rerender() }, 1000);
        }
    };

    const popupCancel: PopconfirmProps['onCancel'] = (_) => {
    };

    return (
        <>
            <div
                className="col-span-4 aspect-square overflow-hidden drop-shadow rounded-lg relative"
            >
                <img
                    src={data.degreeImageUrl}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={showModal}
                />
                <Popconfirm
                    title="Xóa ảnh"
                    description="Bạn có muốn xóa ảnh này?"
                    onConfirm={popupConfirm}
                    onCancel={popupCancel}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button
                        icon={<Trash2 />}
                        className="absolute top-2 right-2"
                        shape="circle"
                        danger
                    />
                </Popconfirm>

            </div>
            <Modal
                title={data.degreeName}
                open={isModalOpen}
                footer={<div></div>}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <img src={data.degreeImageUrl} className="w-full h-full object-cover" />
            </Modal>
        </>

    )
}

export default AchievementCard