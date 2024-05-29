import { Button, Input, Modal } from "antd"
import { useRef, useState } from "react";
const UpdateAvatarButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState("");
    const inputRef = useRef<any>(null);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleImageClick = () => {
        inputRef.current.input.click();
    }
    const handleImageChange = (event: any) => {
        const file = event?.target.files[0];
        console.log(file);
        setImage(URL.createObjectURL(file));
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>Cập nhật ảnh đại diện</Button>
            <Modal title="Cập nhật ảnh đại diện"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex flex-col gap-2">
                    {
                        image && (
                            <div className="max-h-[500px]">
                                <img src={image} alt="" onClick={handleImageClick} className="w-full h-full object-cover" />
                            </div>
                        )
                    }
                    <Input type="file" ref={inputRef} onChange={handleImageChange} />
                </div>
            </Modal>
        </>
    )
}

export default UpdateAvatarButton