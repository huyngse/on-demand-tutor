import { getAccountById } from "@/lib/api/account-api";
import { Button, DatePicker, Form, FormProps, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateAvatarButton from "./UpdateAvatarButton";

const UpdateAccountPage = () => {
    const [account, setAccount] = useState<any>();
    const navigate = useNavigate();
    const { accountId } = useParams();
    const [form] = Form.useForm();
    type FieldType = {
        id: number;
        fullName: string;
        email: string;
        password: string;
        role: string;
        isActive: boolean;
        gender: "male" | "female";
    };
    const handleCancel = () => {
        navigate(-1);
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        toast.success("Cập nhật tài khoản thành công");
        setTimeout(() => {
            navigate("/admin/manage-account");
        }, 1000)
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (accountId) {
                const result = await getAccountById(parseInt(accountId));
                if (result.data) {
                    setAccount(result.data);
                    form.setFieldValue("id", result.data.id);
                    form.setFieldValue("fullName", result.data.fullName);
                    form.setFieldValue("dob", dayjs(result.data.dob));
                    form.setFieldValue("email", result.data.email);
                    form.setFieldValue("password", result.data.password);
                    form.setFieldValue("role", result.data.role);
                }
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h1 className="font-bold text-xl mb-3">Cập nhật tài khoản</h1>
            <div
                className="bg-white px-5 py-8 rounded-lg drop-shadow grid grid-cols-12 gap-2"
            >
                <div className="flex flex-col gap-2 col-span-4 px-5">
                    <div className="overflow-hidden drop-shadow rounded-lg aspect-square">
                        <img src={account?.profilePicUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <UpdateAvatarButton />
                    <Button>Gỡ ảnh đại diện</Button>
                </div>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    autoComplete="off"
                    className="grid grid-cols-4 gap-2 mt-5 col-span-8"
                >
                    <label className="font-bold">ID</label>
                    <Form.Item
                        name="id"
                        className="mb-3 col-span-3"
                    >
                        <Input placeholder="ID" disabled />
                    </Form.Item>
                    <label htmlFor="fullName" className="font-bold">Họ và tên</label>
                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng họ và tên!' }]}
                        className="mb-3 col-span-3"
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
                                    return Promise.reject(new Error('Năm sinh không hợp lệ'))
                                },
                            },
                        ]}
                        className="mb-3 col-span-3"
                    >
                        <DatePicker id="dob" format={'DD/MM/YYYY'} placeholder="Ngày sinh" className="w-full" />
                    </Form.Item>

                    <label htmlFor="email" className="font-bold">Email</label>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email của bạn!' },
                            { type: 'email', message: 'email không hợp lệ' }
                        ]}
                        className="mb-3 col-span-3"
                    >
                        <Input id="email" placeholder="Email" />
                    </Form.Item>
                    <label htmlFor="password" className="font-bold">Mật khẩu</label>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        className="mb-3 col-span-3"
                    >
                        <Input.Password id="password" autoComplete="new-password" placeholder="Mật khẩu" />
                    </Form.Item>
                    <p className="font-bold">Vai trò</p>
                    <Form.Item name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
                        className="col-span-3"
                    >
                        <Select
                            options={[
                                { value: 'student_parent', label: 'Phụ huynh, học sinh' },
                                { value: 'tutor', label: 'Gia sư' },
                                { value: 'admin', label: 'Admin' },
                                { value: 'moderator', label: 'Quản trị viên' },
                            ]}
                            placeholder="Vai trò"
                        />
                    </Form.Item>
                    <div className="flex justify-end col-span-4 gap-2">
                        <Button onClick={handleCancel}>Hủy</Button>
                        <Form.Item className="m-0">
                            <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div >
    )
}

export default UpdateAccountPage;