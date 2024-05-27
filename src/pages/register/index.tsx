import { Button, Form, FormProps, Input, Radio } from "antd";
import { Link } from "react-router-dom";
type FieldType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const RegisterPage = () => {
  return (
    <div className="h-[100vh] overflow-auto">
      <div className="rounded-lg shadow min-h-[100vh] bg-white py-16 px-20 flex flex-col justify-between">
        <div className="flex flex-col gap-5 mb-5">
          <h2 className="font-bold text-4xl text-center mb-2">Đăng Ký</h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <label htmlFor="fullName" className="font-bold">Họ và tên</label>
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng họ và tên!' }]}
              className="mb-3"
            >
              <Input id="fullName" />
            </Form.Item>
            <label htmlFor="email" className="font-bold">Email</label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
              className="mb-3"
            >
              <Input id="email" />
            </Form.Item>
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
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}

            >
              <Input.Password id="confirmPassword" />
            </Form.Item>
            <p className="font-bold">Bạn là</p>
            <Form.Item name="role"
              rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
            >
              <Radio.Group>
                <Radio value="parent"> Phụ huynh, học sinh </Radio>
                <Radio value="tutor"> Gia sư </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item className="mb-0">
              <Button type="primary" htmlType="submit" className="w-full">
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-center">
          Đã là thành viên? <Link to={"/login"} className="text-blue-500 font-semibold">Đăng nhập</Link> tại đây
        </div>
      </div>
    </div>

  )
}

export default RegisterPage;