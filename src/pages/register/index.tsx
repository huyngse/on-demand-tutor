import { Button, DatePicker, Form, FormProps, Input, Radio } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
type FieldType = {
  username: string;
  // fullName: string;
  profileImage: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: any;
  role: string;
  gender: "Male" | "Female";
  city: string;
  district: string;
  ward: string;
  street: string;
  tutorType: string;
  school: string;
  tutorDescription: string;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
  const requestBody = {
    ...values
  };
  requestBody.profileImage = "";
  requestBody.city = "";
  requestBody.district = "";
  requestBody.ward = "";
  requestBody.street = "";
  requestBody.tutorType = "";
  requestBody.school = "";
  requestBody.tutorDescription = "";
  requestBody.dateOfBirth = values.dateOfBirth.toISOString();
  console.log("requestBody: ", requestBody);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue("profileImage", "");
    form.setFieldValue("city", "");
    form.setFieldValue("district", "");
    form.setFieldValue("ward", "");
    form.setFieldValue("street", "");
    form.setFieldValue("tutorType", "");
    form.setFieldValue("school", "");
    form.setFieldValue("tutorDescription", "");
  }, [])

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
            form={form}
          >
            {/* 
            <label htmlFor="fullName" className="font-bold">Họ và tên</label>
               <Form.Item
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng họ và tên!' }]}
              className="mb-3 col-span-2"
            >
              <Input id="fullName" placeholder="Họ và tên" />
            </Form.Item>
             */}
            <label htmlFor="phoneNumber" className="font-bold">Số điện thoại</label>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại của bạn!' },
              ]}
              className="mb-3 col-span-2"
            >
              <Input id="phoneNumber" placeholder="Số điện thoại" />
            </Form.Item>

            <label htmlFor="dateOfBirth" className="font-bold">Ngày sinh</label>
            <Form.Item
              name="dateOfBirth"
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
              <DatePicker id="dateOfBirth" format={'DD/MM/YYYY'} placeholder="Ngày sinh" className="w-full" />
            </Form.Item>
            <p className="font-bold">Giới tính</p>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
              className="col-span-2"
              initialValue={"male"}
            >
              <Radio.Group>
                <Radio value="Male"> Nam </Radio>
                <Radio value="Female"> Nữ </Radio>
              </Radio.Group>
            </Form.Item>
            <label htmlFor="username" className="font-bold">Tên đăng nhập</label>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                { type: 'string', min: 4, max: 20, message: "Tên đăng nhập phải chứa 4-20 ký tự" }
              ]}
              className="mb-3 col-span-2"
            >
              <Input id="username" placeholder="Tên đăng nhập" />
            </Form.Item>
            <label htmlFor="emailAddress" className="font-bold">Email</label>
            <Form.Item
              name="emailAddress"
              rules={[
                { required: true, message: 'Vui lòng nhập email của bạn!' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
              className="mb-3 col-span-2"
            >
              <Input id="emailAddress" placeholder="Email" />
            </Form.Item>
            <label htmlFor="password" className="font-bold">Mật khẩu</label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { type: 'string', min: 6, max: 30, message: "Mật khẩu phải chứa 6-30 ký tự" }
              ]}
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
                <Radio value="Student"> Phụ huynh, học sinh </Radio>
                <Radio value="Tutor"> Gia sư </Radio>
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