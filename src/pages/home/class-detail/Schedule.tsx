import { Roles } from "@/constants/roles";
import { useAppSelector } from "@/hooks/useRedux";
import { changeBookingStatus, createBooking, getStudentBooking } from "@/lib/api/booking-api";
import { checkDateInterference, formatDate, getTimeString } from "@/utils/dateUtil";
import { Button, DatePicker, Form, FormProps, Input, Modal, Popconfirm, PopconfirmProps, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type ScheduleProps = {
  data: any;
  rerender: () => void;
  pendingBooking: any;
  isBooked: boolean;
  classMethod: string;
}
type FieldType = {
  userId: number;
  scheduleId: number;
  description: string;
  address: string;
  duration: Dayjs[],
};
const { RangePicker } = DatePicker;

const Schedule = ({ data, rerender, pendingBooking, isBooked = false, classMethod }: ScheduleProps) => {
  const navigate = useNavigate();
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    if (!loggedUser) {
      toast.error("Vui lòng đăng nhập để đặt học!");
      Cookies.set('waitingUrl', `/class/${data.classID}`, { expires: 1 })
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const bookingResult = await getStudentBooking(loggedUser.userId);
    if (bookingResult.error) {
      toast.error("Lấy thông tin đặt lịch thất bại");
      return;
    }
    const bookings = bookingResult.data;
    const overlapBooking: any[] = [];
    bookings.forEach((booking: any) => {
      var condition_1 = (booking.status == "Pending" ||
        booking.status == "Accepted" ||
        booking.status == "Started");
      var condition_2 = booking.schedule.dateOfWeek == data.dateOfWeek;
      var startTimeDateA = new Date(booking.schedule.startTime);
      startTimeDateA.setDate(1);
      startTimeDateA.setMonth(0);
      startTimeDateA.setFullYear(2000);
      var startTimeDateB = new Date(data.startTime);
      startTimeDateB.setDate(1);
      startTimeDateB.setMonth(0);
      startTimeDateB.setFullYear(2000);
      var endTimeDateA = new Date(booking.schedule.endTime);
      endTimeDateA.setDate(1);
      endTimeDateA.setMonth(0);
      endTimeDateA.setFullYear(2000);
      var endTimeDateB = new Date(data.endTime);
      endTimeDateB.setDate(1);
      endTimeDateB.setMonth(0);
      endTimeDateB.setFullYear(2000);
      var condition_3 = checkDateInterference(
        startTimeDateA,
        endTimeDateA,
        startTimeDateB,
        endTimeDateB
      )
      var condition_4 = checkDateInterference(
        new Date(booking.startDate),
        new Date(booking.endDate),
        new Date(values.duration[0].toISOString()),
        new Date(values.duration[1].toISOString())
      )
      if (condition_1 && condition_2 && condition_3 && condition_4) {
        overlapBooking.push(booking);
      }
    })
    if (overlapBooking.length > 0) {
      var alertString = "Không thể đặt lịch học do thời gian học lớp này bị trùng với thời gian của lớp khác bạn đã đặt: ";
      overlapBooking.forEach((booking: any) => {
        alertString += `
        Lịch học lớp ${booking.class.className}:
        Bắt đầu từ ngày ${formatDate(new Date(booking.startDate))} đến ${formatDate(new Date(booking.endData))};
        ${booking.schedule.dateOfWeek == 0 ? "Thứ hai, tư, sáu" : "Thứ ba, năm, bảy"};
        Thời gian từ ${getTimeString(new Date(booking.schedule.startTime))} đến ${getTimeString(new Date(booking.schedule.endTime))}.
        `
      })
      alert(alertString);
      return;
    }
    const requestBody: any = {
      userId: loggedUser.userId,
      scheduleId: data.scheduleID,
      description: values.description,
      address: classMethod == "Online" ? "" : values.address,
      startDate: values.duration[0].toISOString(),
      endDate: values.duration[1].toISOString(),
      status: "Pending"
    }
    const { error } = await createBooking(requestBody);
    if (error) {
      toast.error("Đặt lịch thất bại!");
    } else {
      toast.success("Đặt lịch thành công");
      setTimeout(() => {
        // navigate("/student/class");
        rerender();
      }, 1000);
    }
    handleOk();
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if (!data) return;

  const handleCancelBooking = async () => {
    const cancelResult = await changeBookingStatus(pendingBooking.bookingId, "Cancelled_by_student");
    if (cancelResult.error) {
      toast.error("Hủy đơn đặt thất bại");
    } else {
      toast.success("Hủy đơn đặt thành công");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
  }
  const cancelBooking_confirm: PopconfirmProps['onConfirm'] = () => {
    handleCancelBooking();
  };

  const cancelBooking_cancel: PopconfirmProps['onCancel'] = () => {
  };

  return (
    <div className="bg-white rounded-lg drop-shadow p-3">
      <h3 className="font-semibold">Lịch #{data.scheduleID}</h3>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">
          {data.title}
        </p>
      </div>
      <hr className="my-2" />
      <h4 className="font-semibold text-lg mt-2">
        Ngày học
      </h4>
      <div className="flex justify-center gap-2">
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 2</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 3</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 4</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 5</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 6</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 7</p>
        <p className={`px-5 font-semibold py-2 drop-shadow bg-white`}>Chủ nhật</p>
      </div>
      <p className="text-lg mt-2">
        <span className="font-semibold">Thời gian học: </span>  {getTimeString(new Date(data.startTime))} - {getTimeString(new Date(data.endTime))}
      </p>
      {
        data.description && data.description.length > 0 && (
          <>
            <h4 className="font-semibold text-lg">
              Mô tả
            </h4>
            <p>
              {data.description}
            </p>
          </>
        )
      }
      {
        loggedUser?.role != Roles.Tutor && (
          <div className="flex justify-end mt-5 gap-2 items-center">
            {
              data.bookings.length > 0 ? (
                <p className="text-sm text-gray-500">Đã có {data.bookings.length} lượt đặt lịch này</p>
              )
                :
                (
                  <p className="text-sm text-gray-500">Chưa có lượt đặt nào</p>
                )
            }
            {
              isBooked && pendingBooking.status == "Pending" && (
                <p className="text-sm text-green-500">/ Bạn đang đặt lịch này</p>
              )
            }
            {
              isBooked && pendingBooking.status == "Accepted" && (
                <p className="text-sm text-blue-500">/ Bạn đang học lịch này</p>
              )
            }
            {
              !pendingBooking && (
                <Button type="primary" onClick={showModal}>Đặt học lịch này</Button>
              )
            }
            {
              pendingBooking && isBooked && (
                <Popconfirm
                  title="Hủy đơn đặt"
                  description="Xác nhận hủy đơn đặt lịch dạy học này?"
                  onConfirm={cancelBooking_confirm}
                  onCancel={cancelBooking_cancel}
                  okText="Xác nhận"
                  cancelText="Hủy"
                >
                  <Button danger>Hủy đơn dạy</Button>
                </Popconfirm>
              )
            }
            <Modal
              title="Đặt lịch học"
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
                  <TextArea placeholder="Ghi chú" />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ học"
                  name="address"
                  rules={[{ required: classMethod == "In-person", message: 'Vui lòng nhập chi tiết địa chỉ dạy học' }]}
                  className={`${classMethod == "Online" && "hidden"}`}
                >
                  <Input placeholder="Địa chỉ học" />
                </Form.Item>

                <Form.Item
                  label="Ngày học"
                  name="duration"
                  rules={[{ required: true, message: 'Vui lòng nhập chi tiết địa chỉ dạy học' }]}
                >
                  <RangePicker format={"DD/MM/YYYY"} minDate={dayjs()} />
                </Form.Item>

                <Form.Item
                  label="Phương thức thanh toán"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                >
                  <Radio.Group defaultValue="cash">
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
                      Đặt
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </div>
        )
      }
    </div>

  )
}

export default Schedule