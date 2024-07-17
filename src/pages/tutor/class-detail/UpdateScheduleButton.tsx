import { updateSchedule } from "@/lib/api/schedule-api";
import { checkDateInterference, getTimeString } from "@/utils/dateUtil";
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
    scheduleData: any;
    classId: number;
    rerender: () => void;
    schedules: any[];
}
const format = 'HH:mm';
const UpdateScheduleButton = ({ scheduleData, classId, rerender, schedules }: UpdateScheduleButtonProps) => {
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
            var condition_3 = schedule.scheduleID != scheduleData.scheduleID;
            if (condition_1 && condition_2 && condition_3) {
                overlapSchedule.push(schedule);
            }
        })
        if (overlapSchedule.length > 0) {
            var alertString = "Không thể cập nhật do trùng thời gian với lịch khác của lớp này";
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
        requestBody.classId = classId
        requestBody.startTime = values.classTime[0].toISOString();
        requestBody.endTime = values.classTime[1].toISOString();
        if (requestBody.description == null) {
            requestBody.description = "";
        }
        const { error } = await updateSchedule(requestBody, scheduleData.scheduleID);
        if (error) {
            toast.error("Cập nhật lịch thất bại!");
        } else {
            toast.success("Cập nhật lịch thành công");
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

        form.setFieldValue("title", scheduleData.title);
        form.setFieldValue("description", scheduleData.description);
        form.setFieldValue("dateOfWeek", scheduleData.dateOfWeek);
        form.setFieldValue("classTime",
            [
                dayjs(scheduleData.startTime),
                dayjs(scheduleData.endTime),
            ]);
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
                forceRender
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={() => (
                    <>
                    </>
                )}
            >
                <Form
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