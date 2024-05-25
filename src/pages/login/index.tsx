import { checkToken, login } from "@/lib/api/authentication-api";
import { Button, Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "@/lib/redux/userSlice";
type FieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await checkToken();
      if (data) {
        navigate("/");
      }
    }
    fetchData();
  }, []);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { data } = await login(values.email, values.password);
    if (data) {
      toast.success("Đăng nhập thành công!");
      Cookies.set('loggedUser', JSON.stringify(data), { expires: 7 });
      dispatch(setLoggedUser(data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Sai mật khẩu hoặc email!");
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



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
            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
            className="mb-3"
          >
            <Input id="email" />
          </Form.Item>
          <label htmlFor="password" className="font-bold">Mật khẩu</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}

          >
            <Input.Password id="password" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full">
              Đăng Nhập
            </Button>
          </Form.Item>
          <div className="text-end">
            <Link to={"/forget-password"}>
              <button type="button" className="text-blue-600 underline">Quên mật khẩu</button>
            </Link>
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