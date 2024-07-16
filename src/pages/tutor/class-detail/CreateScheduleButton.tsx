import { createSchedule } from "@/lib/api/schedule-api";
import { checkDateInterference, getTimeString } from "@/utils/dateUtil";
import { Button, Form, FormProps, Input, Modal, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Dayjs } from "dayjs";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type FieldType = {
    title: string;
    description?: string;
    dateOfWeek: number;
    classTime: Dayjs[];
};
type CreateScheduleButtonProps = {
    classId: number;
    rerender: () => void;
    schedules: any[];
}
const format = 'HH:mm';
const CreateScheduleButton = ({ classId, rerender, schedules }: CreateScheduleButtonProps) => {
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
        var overlapSchedule: any[] = [];
        schedules.forEach((schedule: any) => {
            var startTimeDateA = new Date(schedule.startTime);
            startTimeDateA.setDate(1);
            startTimeDateA.setMonth(0);
            startTimeDateA.setFullYear(2000);
            var startTimeDateB = new Date(values.classTime[0].toISOString());
            startTimeDateB.setDate(1);
            startTimeDateB.setMonth(0);
            startTimeDateB.setFullYear(2000);
            var endTimeDateA = new Date(schedule.endTime);
            endTimeDateA.setDate(1);
            endTimeDateA.setMonth(0);
            endTimeDateA.setFullYear(2000);
            var endTimeDateB = new Date(values.classTime[1].toISOString());
            endTimeDateB.setDate(1);
            endTimeDateB.setMonth(0);
            endTimeDateB.setFullYear(2000);
            var condition_1 = checkDateInterference(
                startTimeDateA,
                endTimeDateA,
                startTimeDateB,
                endTimeDateB
            );
            var condition_2 = schedule.dateOfWeek == values.dateOfWeek;
            if (condition_1 && condition_2) {
                overlapSchedule.push(schedule);
            }
        })
        if (overlapSchedule.length > 0) {
            var alertString = "Không thể tạo lịch do trùng thời gian với lịch khác của lớp này";
            overlapSchedule.forEach((schedule: any) => {
                alertString += `
            ${schedule.title}:
            ${schedule.dateOfWeek == 0 ? "Thứ hai, tư, sáu" : "Thứ ba, năm, bảy"};
            Thời gian từ ${getTimeString(new Date(schedule.startTime))} đến ${getTimeString(new Date(schedule.endTime))}.
            `
            })
            alert(alertString);
            return;
        }
        const requestBody: any = {
            ...values
        };
        delete requestBody.classTime;
        requestBody.classID = classId
        requestBody.startTime = values.classTime[0].add(7, 'hour').toISOString();
        requestBody.endTime = values.classTime[1].add(7, 'hour').toISOString();
        if (requestBody.description == null) {
            requestBody.description = "";
        }
        const { error } = await createSchedule(requestBody);
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
                footer={() => (<></>)}
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
                        rules={[{ required: true, message: 'Vui lòng chọn ngày trong tuần!' }]}
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
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian học!' }]}
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