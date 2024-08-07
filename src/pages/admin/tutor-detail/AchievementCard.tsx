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
            <button className="flex-shrink-0 w-[300px] aspect-square overflow-hidden drop-shadow rounded-lg" onClick={showModal}>
                <img src={data.degreeImageUrl} className="w-full h-full object-cover"></img>
            </button>
            <Modal
                title={data.description}
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