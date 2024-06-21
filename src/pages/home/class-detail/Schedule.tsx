import { Roles } from "@/constants/roles";
import { useAppSelector } from "@/hooks/useRedux";
import { createBooking } from "@/lib/api/booking-api";
import { getTimeString } from "@/utils/dateUtil";
import { Button, Form, FormProps, Input, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type ScheduleProps = {
  data: any;
}
type FieldType = {
  userId: number;
  scheduleId: number;
  createDate: string;
  description: string;
  status: string;
  address: string;
};
const Schedule = ({ data }: ScheduleProps) => {
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
    const requestBody = {
      ...values
    };
    requestBody.userId = loggedUser.userId;
    requestBody.scheduleId = data.scheduleID;
    requestBody.createDate = new Date().toISOString();
    requestBody.status = "pending";
    const { error } = await createBooking(requestBody);
    if (error) {
      toast.error("Đặt lịch thất bại!");
    } else {
      toast.success("Đặt lịch thành công");
      setTimeout(() => {
        navigate("/student/class");
      }, 1000);
    }
    handleOk();
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (!data) return;
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
          <div className="text-end mt-5">
            <Button type="primary" onClick={showModal}>Đặt học lịch này</Button>
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
                  rules={[{ required: true, message: 'Vui lòng nhập chi tiết địa chỉ dạy học' }]}
                >
                  <Input placeholder="Địa chỉ học" />
                </Form.Item>
                <Form.Item
                  label="Phương thức thanh toán"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                >
                  <Radio.Group>
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