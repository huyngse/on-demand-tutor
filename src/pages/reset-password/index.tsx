import BackButton from "@/components/BackButton";
import { Button, Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  otp: string;
  password: string;
  confirmPassword: string;
};

const RecoverPasswordPage = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    navigate("/login");
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="py-16 px-20 flex flex-col justify-between min-h-[100vh]">
      <div className="flex flex-col gap-5">
        <BackButton />
        <h2 className="font-bold text-3xl text-center mb-2">Khôi phục mật khẩu</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className="font-semibold text-center">Kiểu tra email của bạn, chúng tôi đã gửi đến địa chỉ email bạn đã nhập</p>
          <div className="pt-5 flex justify-center">
            <Form.Item name="otp" className="mb-3"   rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
              <Input.OTP />
            </Form.Item>
          </div>
          <label htmlFor="password" className="font-bold">Mật khẩu</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            className="mb-3"
          >
            <Input.Password id="password" autoComplete="new-password"/>
          </Form.Item>
          <label htmlFor="confirmPassword" className="font-bold">Nhập lại mật khẩu</label>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}

          >
            <Input.Password id="confirmPassword" autoComplete="new-password"/>
          </Form.Item>

          <Form.Item className="mb-3">
            <Button type="primary" htmlType="submit" className="w-full">
              Khôi phục
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="text-center">
        Đã là thành viên? <Link to={"/login"} className="text-blue-500 font-semibold">Đăng nhập</Link> tại đây
      </div>
    </div>
  )
}

export default RecoverPasswordPage;