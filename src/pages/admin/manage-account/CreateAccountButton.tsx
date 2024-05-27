import { Button, FormProps, Modal } from "antd";
import { SquarePlus } from "lucide-react";
import { useState } from "react";

const CreateAccountButton = () => {
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

    type FieldType = {
        fullName: string;
        email: string;
        password: string;
        role: string;
      };
      const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      
    return (
        <>
            <Button
                type="primary"
                icon={<SquarePlus width={15} height={15} className="m-0" />}
                className="flex items-center"
                onClick={showModal}
            >
                Tạo tài khoản mới
            </Button>
            <Modal
                title="Tạo tài khoản mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={() => (
                    <>
                        <Button onClick={handleCancel}>Hủy</Button>
                        <Button type="primary" onClick={handleOk}>Tạo</Button>
                    </>
                )}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal >
        </>
    )
}

export default CreateAccountButton