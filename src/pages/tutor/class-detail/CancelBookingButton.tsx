import { cancelBooking } from "@/lib/api/booking-api";
import { Button, Form, FormProps, Modal } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
type FieldType = {
    cancellationReason: string;
};
type Props = {
    bookingId: number;
    rerender: () => void;
}
const CancelBookingButton = ({ bookingId, rerender }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { error } = await cancelBooking(bookingId, "Cancelled_by_tutor", values.cancellationReason);
        if (error) {
            toast.error("Hủy dạy thất bại");
        } else {
            toast.success("Hủy dạy thành công");
            handleOk();
            setTimeout(() => {
                rerender();
            }, 1000);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Button danger onClick={showModal}>Hủy đơn dạy</Button>
            <Modal title="Xác nhận hủy dạy"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={() => (<></>)}
            >
                <Form
                    name="update-profile-image-form"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                >


                    <Form.Item
                        label="Lý do hủy"
                        name="cancellationReason"
                        rules={[{ required: true, message: 'Vui lòng nhập lý do hủy' }]}
                    >
                        <TextArea placeholder="Lý do hủy" />
                    </Form.Item>
                    <div className="flex gap-2 justify-center">
                        <Button type="default" htmlType="button" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Form.Item className="m-0">
                            <Button type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default CancelBookingButton