import { UpdateBookingDto, changeBookingStatus, updateBooking } from "@/lib/api/booking-api";
import { formatDate } from "@/utils/dateUtil"
import { Button, DatePicker, Form, FormProps, Input, Modal, Popconfirm, Radio } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import type { PopconfirmProps } from 'antd';
import dayjs, { Dayjs } from "dayjs";
import DefaultPfp from "@/assets/images/default_profile_picture.jpg"
import { toast } from "react-toastify";
import CancelBookingButton from "./CancelBookingButton";

type BookingCardProps = {
    bookingData: any;
    rerender: () => void;
}

type FieldType = {
    description: string,
    address: string,
    duration: Dayjs[],
};

const { RangePicker } = DatePicker;
const BookingCard = ({ bookingData, rerender }: BookingCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [pfp, setPfp] = useState<string>(bookingData.student.profileImage);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDenyBooking = async () => {
        const denyResult = await changeBookingStatus(bookingData.bookingId, "Denied");
        if (denyResult.error) {
            toast.error("Cập nhật thông tin thất bại");
        } else {
            toast.success("Cập nhật thông tin thành công");
            setTimeout(() => {
                rerender();
            }, 1000);
        }
    }

    const handleStartTeaching = async () => {
        const denyResult = await changeBookingStatus(bookingData.bookingId, "Started");
        if (denyResult.error) {
            toast.error("Cập nhật thông tin thất bại");
        } else {
            toast.success("Cập nhật thông tin thành công");
            setTimeout(() => {
                rerender();
            }, 1000);
        }
    }

    const handleEndTeaching = async () => {
        const denyResult = await changeBookingStatus(bookingData.bookingId, "Ended");
        if (denyResult.error) {
            toast.error("Cập nhật thông tin thất bại");
        } else {
            toast.success("Cập nhật thông tin thành công");
            setTimeout(() => {
                rerender();
            }, 1000);
        }
    }

    const handleCancelBooking = async () => {
        const cancelResult = await changeBookingStatus(bookingData.bookingId, "Cancelled_by_tutor");
        if (cancelResult.error) {
            toast.error("Cập nhật thông tin thất bại");
        } else {
            toast.success("Cập nhật thông tin thành công");
            setTimeout(() => {
                rerender();
            }, 1000);
        }
    }

    const denyBooking_confirm: PopconfirmProps['onConfirm'] = () => {
        handleDenyBooking();
    };

    const denyBooking_cancel: PopconfirmProps['onCancel'] = () => {
    };

    const cancelBooking_confirm: PopconfirmProps['onConfirm'] = () => {
        handleCancelBooking();
    };

    const cancelBooking_cancel: PopconfirmProps['onCancel'] = () => {
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const requestBody: UpdateBookingDto = {
            description: values.description,
            address: values.address,
            startDate: values.duration[0].toISOString(),
            endDate: values.duration[1].toISOString(),
            status: "Accepted"
        }
        const acceptResult = await updateBooking(bookingData.bookingId, requestBody);
        if (acceptResult.error) {
            toast.error("Cập nhật thông tin thất bại");
        } else {
            toast.success("Cập nhật thông tin thành công");
            setTimeout(() => {
                rerender();
            }, 1000);
        }
        handleOk();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    var statusEl;
    switch (bookingData.status) {
        case "Pending": {
            statusEl = <span className="text-blue-500">Đang chờ xác nhận</span>
            break;
        }
        case "Denied": {
            statusEl = <span className="text-red-500">Đã từ chối</span>
            break;
        }
        case "Accepted": {
            statusEl = <span className="text-green-500">Đã chấp nhận</span>
            break;
        }
        case "Cancelled": {
            statusEl = <span className="text-gray-500">Đã hủy</span>
            break;
        }
        case "Cancelled_by_tutor": {
            statusEl = <span className="text-gray-500">Đã hủy bởi gia sư</span>
            break;
        }
        case "Cancelled_by_student": {
            statusEl = <span className="text-gray-500">Đã hủy bởi học sinh</span>
            break;
        }
        case "Started": {
            statusEl = <span className="text-blue-500">Đang dạy</span>
            break;
        }
        case "Ended": {
            statusEl = <span className="text-orange-500">Đã kết thúc</span>
            break;
        }
    }

    useEffect(() => {
        form.setFieldValue("description", bookingData.description);
        form.setFieldValue("address", bookingData.address);
        form.setFieldValue("status", bookingData.status);
        form.setFieldValue("duration", [dayjs(bookingData.startDate), dayjs(bookingData.endDate)]);
    }, [])

    return (
        <div className="bg-white drop-shadow p-3 rounded-lg grid grid-cols-12">
            <div className="col-span-3">
                <h5 className="font-bold text-lg">Thông tin người đặt</h5>
                <div className="overflow-hidden drop-shadow rounded-lg aspect-square w-[50%] my-3">
                    <img src={pfp} alt="" className="w-full h-full object-cover" onError={() => { setPfp(DefaultPfp) }} />
                </div>

                <p>
                    <span className="font-semibold">Họ và tên: </span>{bookingData.student.fullName}
                </p>
                <p>
                    <span className="font-semibold">Sô điện thoại: </span>{bookingData.student.phoneNumber}
                </p>
                <p>
                    <span className="font-semibold">Email: </span>{bookingData.student.emailAddress}
                </p>
                <p>
                    <span className="font-semibold">Giới tính: </span>{bookingData.student.gender == "Male" ? "Nam" : "Nữ"}
                </p>

            </div>
            <div className="col-span-9 flex flex-col">
                <h5 className="font-bold  text-lg">Thông tin chi tiết đơn đặt</h5>
                {
                    bookingData.startDate && bookingData.endDate && (
                        <>
                            <p>
                                <span className="font-semibold">Ngày bắt đầu học: </span>{formatDate(new Date(bookingData.startDate))}
                            </p>
                            <p>
                                <span className="font-semibold">Ngày kết thúc học: </span>{formatDate(new Date(bookingData.endDate))}
                            </p>
                        </>
                    )
                }

                <p>
                    <span className="font-semibold">Địa chỉ dạy: </span>{bookingData.address}
                </p>
                <p>
                    <span className="font-semibold">Ghi chú: </span>{bookingData.description}
                </p>
                <p>
                    <span className="font-semibold">Ngày đặt: </span>{formatDate(new Date(bookingData.createDate))}
                </p>
                <p className="font-semibold">
                    Trạng thái: <span className="">{statusEl}</span>
                </p>
                {
                    (
                        bookingData.status == "Cancelled_by_student" ||
                        bookingData.status == "Cancelled_by_tutor" ||
                        bookingData.status == "Cancelled") && (
                        <p>
                            <span className="font-semibold">Lý do hủy: </span>{bookingData.cancellationReason}
                        </p>
                    )
                }
                <div className="flex gap-2 justify-end flex-1 items-end">
                    {
                        bookingData.status == "Pending" && (
                            <>
                                <Popconfirm
                                    title="Từ chối đơn đặt"
                                    description="Xác nhận từ chối đơn đặt lịch dạy này?"
                                    onConfirm={denyBooking_confirm}
                                    onCancel={denyBooking_cancel}
                                    okText="Từ chối"
                                    cancelText="Hủy"
                                >
                                    <Button danger>Từ chối đơn đặt</Button>
                                </Popconfirm>
                                <Button type="primary" onClick={showModal}>Chấp nhận đơn đặt</Button>
                            </>
                        )
                    }
                    {
                        bookingData.status == "Accepted" && (
                            <>
                                <CancelBookingButton
                                    bookingId={bookingData.bookingId}
                                    rerender={rerender}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleStartTeaching}
                                >
                                    Bắt đầu dạy
                                </Button>
                            </>
                        )
                    }
                    {
                        bookingData.status == "Started" && (
                            <>
                                <CancelBookingButton
                                    bookingId={bookingData.bookingId}
                                    rerender={rerender}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleEndTeaching}
                                >Kết thúc dạy
                                </Button>
                            </>
                        )
                    }
                </div>
            </div>
            <Modal
                title="Xác nhận đơn đặt dạy học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={() => (
                    <>
                    </>
                )}
            >
                <Form
                    name="accept_booking"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="Ghi chú"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                    >
                        <TextArea placeholder="Ghi chú" disabled />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ học"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập chi tiết địa chỉ dạy học' }]}
                    >
                        <Input placeholder="Địa chỉ học" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày học"
                        name="duration"
                        rules={[{ required: true, message: 'Vui lòng nhập chi tiết địa chỉ dạy học' }]}
                    >
                        <RangePicker format={"DD/MM/YYYY"} />
                    </Form.Item>

                    <Form.Item
                        label="Phương thức thanh toán"
                        rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                    >
                        <Radio.Group disabled defaultValue="cash">
                            <Radio value="cash"> Thanh toán trực tiếp </Radio>
                            <Radio value="vnpay" disabled> Thanh toán VNPay </Radio>
                        </Radio.Group>
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
        </div >
    )
}

export default BookingCard