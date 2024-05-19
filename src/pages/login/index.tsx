import { Button, Form, FormProps, Input } from "antd";
import { Link } from "react-router-dom";
type FieldType = {
  email?: string;
  password?: string;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginPage = () => {
  return (
    <div className="rounded-lg shadow min-h-[100vh] bg-white py-16 px-20 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-4xl text-center mb-2">Đăng Nhập</h2>
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
            rules={[{ required: true, message: 'Please input your username!' }]}
            className="mb-3"
          >
            <Input id="email" />
          </Form.Item>
          <label htmlFor="password" className="font-bold">Mật khẩu</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password id="password" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full">
              Đăng Nhập
            </Button>
          </Form.Item>
          <div className="text-end">
            <button type="button" className="text-blue-600 underline">Quên mật khẩu</button>
          </div>
        </Form>
      </div>

      <div className="text-center">
        Chưa là thành viên? <Link to={"/register"} className="text-blue-500 font-semibold">Đăng ký</Link> tại đây
      </div>
    </div>
  )
}

export default LoginPage;