import { checkToken, login } from "@/lib/api/authentication-api";
import { Button, Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "@/lib/api/user-api";
import Cookies from "js-cookie";
import { setLoggedUser } from "@/lib/redux/userSlice";
type FieldType = {
  userName: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const { data, error } = await login(values.userName, values.password);
    if (error) {
      toast.error("Đăng nhập thất bại!");
      setIsLoading(false);
      return;
    } else {
      localStorage.setItem("accessToken", data);
      toast.success("Đăng nhập thành công!");
      const loggedUser = await getLoggedUser(values.userName);
      Cookies.set('loggedUser', JSON.stringify(loggedUser), { expires: (3 / 24) });
      dispatch(setLoggedUser(loggedUser));
      setTimeout(() => {
        const waitingUrl = Cookies.get('waitingUrl');
        if (waitingUrl) {
          Cookies.remove('waitingUrl');
          navigate(waitingUrl);
        } else {
          navigate("/");
        }
      }, 1000);
    }
    setIsLoading(false);
  };

  const getLoggedUser = async (userName: string) => {
    const { data, success } = await getAllUsers();
    if (success && data) {
      const loggedUser = data.find((user: any) => user.username == userName);
      return loggedUser;
    }
    return null;
  }

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
          <label htmlFor="userName" className="font-bold">Tên đăng nhập</label>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập của bạn!' }]}
            className="mb-3"
          >
            <Input id="userName" placeholder="Tên đăng nhập" />
          </Form.Item>
          <label htmlFor="password" className="font-bold">Mật khẩu</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}

          >
            <Input.Password id="password" placeholder="Mật khấu" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full" loading={isLoading}>
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