import BackButton from "@/components/BackButton";
import { Button, Form, FormProps, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

type FieldType = {
  email: string;
};

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    navigate("/recover-password")
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
          <label htmlFor="email" className="font-bold">Email</label>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
          >
            <Input id="email" />
          </Form.Item>
          <Form.Item className="mb-3">
            <Button type="primary" htmlType="submit" className="w-full">
              Gửi
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

export default ForgetPasswordPage