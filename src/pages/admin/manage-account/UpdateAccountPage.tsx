import { Button, DatePicker, Form, FormProps, Input, Radio, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateAvatarButton from "./UpdateAvatarButton";
import { getUserById } from "@/lib/api/user-api";
import { Roles } from "@/constants/roles";
import DefaultProfileImage from "@/assets/images/default_profile_picture.jpg";
const UpdateAccountPage = () => {
    const navigate = useNavigate();
    const { accountId } = useParams();
  const [pfp, setPfp] = useState<string>("");
    const [form] = Form.useForm();
    type FieldType = {
        userId: number;
        fullName: string;
        emailAddress: string;
        password: string;
        role: string;
        isActive: boolean;
        phoneNumber: string;
        gender: "Male" | "Female";
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
                const result = await getUserById(parseInt(accountId));
                if (result.data) {
                    form.setFieldValue("userId", result.data.userId);
                    form.setFieldValue("fullName", result.data.fullName);
                    form.setFieldValue("dob", dayjs(result.data.dob));
                    form.setFieldValue("emailAddress", result.data.emailAddress);
                    form.setFieldValue("password", result.data.password);
                    form.setFieldValue("role", result.data.role);
                    form.setFieldValue("phoneNumber", result.data.phoneNumber);
                    form.setFieldValue("gender", result.data.gender);
                    setPfp(result.data.profileImage);
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
                        <img src={pfp} onError={() => {setPfp(DefaultProfileImage)}} alt="" className="w-full h-full object-cover" />
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
                        name="userId"
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
                    <label htmlFor="phoneNumber" className="font-bold">Số điện thoại</label>
                    <Form.Item
                        name="phoneNumber"
                        className="mb-3 col-span-3"
                    >
                        <Input id="phoneNumber" placeholder="Số điện thoại" />
                    </Form.Item>
                    <label htmlFor="gender" className="font-bold">Giới tính</label>
                    <Form.Item
                        name="gender"
                        className="mb-3 col-span-3"
                    >
                        <Radio.Group id="gender">
                            <Radio value="Male"> Nam </Radio>
                            <Radio value="Female"> Nữ </Radio>
                        </Radio.Group>
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
                        name="emailAddress"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email của bạn!' },
                            { type: 'email', message: 'email không hợp lệ' }
                        ]}
                        className="mb-3 col-span-3"
                    >
                        <Input id="email" placeholder="Email" />
                    </Form.Item>
                    <p className="font-bold">Vai trò</p>
                    <Form.Item name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
                        className="col-span-3"
                    >
                        <Select
                            options={[
                                { value: Roles.Student, label: 'Học sinh' },
                                { value: Roles.Tutor, label: 'Gia sư' },
                                { value: Roles.Admin, label: 'Admin' },
                                { value: Roles.Moderator, label: 'Quản trị viên' },
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