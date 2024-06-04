import { Button, DatePicker, Form, FormProps, Input, Radio } from "antd";
import { Link } from "react-router-dom";
type FieldType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  role: string;
  gender: "male" | "female";
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
            className="grid grid-cols-3 gap-2"
          >
            <label htmlFor="fullName" className="font-bold">Họ và tên</label>
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng họ và tên!' }]}
              className="mb-3 col-span-2"
            >
              <Input id="fullName" placeholder="Họ và tên" />
            </Form.Item>
            <label htmlFor="dob" className="font-bold">Ngày sinh</label>
            <Form.Item
              name="dob"
              rules={[
                { required: true, message: 'Vui lòng nhập ngày sinh!' },
                {
                  validator: (_, value) => {
                    if (value && new Date().getFullYear() - value?.$y > 1) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Ngày sinh không hợp lệ'))
                  },
                },
              ]}
              className="mb-3 col-span-2"
            >
              <DatePicker id="dob" format={'DD/MM/YYYY'} placeholder="Ngày sinh" className="w-full" />
            </Form.Item>
            <p className="font-bold">Giới tính</p>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
              className="col-span-2"
              initialValue={"male"}
            >
              <Radio.Group>
                <Radio value="male"> Nam </Radio>
                <Radio value="female"> Nữ </Radio>
              </Radio.Group>
            </Form.Item>
            <label htmlFor="email" className="font-bold">Email</label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email của bạn!' },
                { type: 'email', message: 'email không hợp lệ' }
              ]}
              className="mb-3 col-span-2"
            >
              <Input id="email" placeholder="Email" />
            </Form.Item>
            <label htmlFor="password" className="font-bold">Mật khẩu</label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              className="mb-3 col-span-2"
            >
              <Input.Password id="password" autoComplete="new-password" placeholder="Mật khẩu" />
            </Form.Item>
            <label htmlFor="confirmPassword" className="font-bold">Nhập lại mật khẩu</label>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp'));
                  },
                })
              ]}
              className="col-span-2"
            >
              <Input.Password id="confirmPassword" placeholder="Nhập lại mật khẩu" />
            </Form.Item>
            <p className="font-bold">Bạn là</p>
            <Form.Item name="role"
              rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
              className="col-span-2"
            >
              <Radio.Group>
                <Radio value="student_parent"> Phụ huynh, học sinh </Radio>
                <Radio value="tutor"> Gia sư </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item className="mb-0 col-span-3">
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
    </div >

  )
}

export default RegisterPage;