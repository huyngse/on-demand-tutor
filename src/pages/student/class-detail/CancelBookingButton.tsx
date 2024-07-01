import { changeBookingStatus } from "@/lib/api/booking-api";
import { Button, Form, FormProps, Modal } from "antd"
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react"
import { toast } from "react-toastify";
type Props = {
    rerender: () => void;
    bookingId: number;
}
type FieldType = {
    cancelReason: string;
};
const CancelBookingButton = ({ rerender, bookingId }: Props) => {
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
    const handleCancelBooking = async () => {
        const cancelResult = await changeBookingStatus(bookingId, "Cancelled_by_student");
        if (cancelResult.error) {
            toast.error("Hủy đơn đặt thất bại");
        } else {
            toast.success("Hủy đơn đặt thành công");
            setTimeout(() => {
                rerender();
            }, 1000);
        }
    }
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        handleCancelBooking();
        handleOk();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        handleOk();
    };


    return (
        <React.Fragment>
            <Button type="default" onClick={showModal} danger>
                Ngừng học
            </Button>
            <Modal
                title="Ngừng học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={() => (<></>)}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Lý do ngừng học"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Button type="default" htmlType="button">
                        Hủy
                    </Button>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default CancelBookingButton