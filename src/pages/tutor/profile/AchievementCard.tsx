import { Modal } from "antd";
import { useState } from "react";

const AchievementCard = ({ data }: any) => {
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
    return (
        <>
            <div className="col-span-4 aspect-square overflow-hidden drop-shadow rounded-lg cursor-pointer" onClick={showModal}>
                <img src={data.degreeImageUrl} className="w-full h-full object-cover"></img>
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