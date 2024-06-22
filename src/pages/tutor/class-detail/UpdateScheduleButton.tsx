import { getScheduleById, updateSchedule } from "@/lib/api/schedule-api";
import { Button, Form, FormProps, Input, Modal, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type FieldType = {
    title: string;
    description: string;
    dateOfWeek: number;
    classTime: Dayjs[];
};
type UpdateScheduleButtonProps = {
    scheduleId: number;
    classId: number;
    rerender: () => void;
}
const format = 'HH:mm';
const UpdateScheduleButton = ({ scheduleId, classId, rerender }: UpdateScheduleButtonProps) => {
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

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        const requestBody: any = {
            ...values
        };
        delete requestBody.classTime;
        requestBody.classId = classId
        requestBody.startTime = values.classTime[0].toISOString();
        requestBody.endTime = values.classTime[1].toISOString();
        if (requestBody.description == null) {
            requestBody.description = "";
        }
        const { error } = await updateSchedule(requestBody, scheduleId);
        if (error) {
            toast.error("Tạo lịch thất bại!");
        } else {
            toast.success("Tạo lịch thành công");
            setTimeout(() => {
                rerender();
            }, 1000);
        }
        handleOk();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await getScheduleById(scheduleId);
            if (error) {
                toast.error("Lấy thông tin thất bại");
            } else {
                form.setFieldValue("title", data.title);
                form.setFieldValue("description", data.description);
                form.setFieldValue("dateOfWeek", data.dateOfWeek);
                form.setFieldValue("classTime",
                    [
                        dayjs(data.startTime),
                        dayjs(data.endTime),
                    ]);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <Button
                type="default"
                shape="circle"
                icon={<Pencil width={15} />}
                onClick={showModal}
            />
            <Modal
                title="Chỉnh sửa thông tin lịch dạy"
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
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateScheduleButton