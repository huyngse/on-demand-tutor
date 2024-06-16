import { Button, Form, FormProps, Input, Modal, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Dayjs } from "dayjs";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

type FieldType = {
    title: string;
    description: string;
    dateOfWeek: number;
    classTime: Dayjs[];
};
type CreateScheduleButtonProps = {
    classId: number;
}
const format = 'HH:mm';
const CreateScheduleButton = ({ classId }: CreateScheduleButtonProps) => {
    const [form] = Form.useForm();
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

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        const requestBody: any = {
            ...values
        };
        delete requestBody.classTime;
        requestBody.classId = classId
        requestBody.startTime = values.classTime[0].toISOString();
        requestBody.endTime =  values.classTime[1].toISOString();
        console.log(requestBody);
        handleOk();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button
                type="primary"
                icon={
                    <CirclePlus
                        width={15}
                        height={15}
                        className="m-0"
                    />
                }
                onClick={showModal}
                className="flex items-center"
            >
                Tạo lịch dạy
            </Button>
            <Modal
                title="Tạo lịch dạy mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={() => (
                    <>
                    </>
                )}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Tên lịch"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tên lịch!' }]}
                    >
                        <Input placeholder="Tên lịch" />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <TextArea placeholder="Mô tả" />
                    </Form.Item>

                    <Form.Item
                        label="Ngày trong tuần"
                        name="dateOfWeek"
                    >
                        <Select
                            placeholder="Ngày trong tuần"
                            options={[
                                { value: 0, label: 'Thứ Hai, thứ Tư, thứ Sáu' },
                                { value: 1, label: 'Thứ Ba, thứ Năm, thứ Bảy' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian học"
                        name="classTime"
                    >
                        <TimePicker.RangePicker minuteStep={15} format={format} />
                    </Form.Item>
                    <div className="flex gap-2 justify-center">
                        <Button type="default" htmlType="button" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Form.Item className="m-0">
                            <Button type="primary" htmlType="submit">
                                Tạo lịch
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default CreateScheduleButton