import { getAccountById } from "@/lib/api/account-api";
import { Button, DatePicker, Form, FormProps, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
type UpdateAccountButtonProps = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    accountId: number;
}
const UpdateAccountButton = ({ isModalOpen, setIsModalOpen, accountId }: UpdateAccountButtonProps) => {
    const [account, setAccount] = useState<any>();
    const [form] = Form.useForm();
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    type FieldType = {
        id: number;
        fullName: string;
        email: string;
        password: string;
        role: string;
        isActive: boolean;
        gender: "male" | "female";
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        handleOk();
        toast.success("Cập nhật tài khoản thành công");
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAccountById(accountId);
            if (result.data) {
                setAccount(result.data);
            }
        }
        fetchData();
    }, [])


    return (
        <Modal
            title="Cập nhật tài khoản"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={() => (
                <>
                </>
            )}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                autoComplete="off"
                className="grid grid-cols-3 gap-2 mt-5"
            >
                <label className="font-bold">ID</label>
                <Form.Item
                    name="id"
                    className="mb-3 col-span-2"
                >
                    <Input placeholder="ID" disabled />
                </Form.Item>
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
                                return Promise.reject(new Error('Năm sinh không hợp lệ'))
                            },
                        },
                    ]}
                    className="mb-3 col-span-2"
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
                <p className="font-bold">Vai trò</p>
                <Form.Item name="role"
                    rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
                    className="col-span-2"
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
                <div className="flex justify-end col-span-3 gap-2">
                    <Button onClick={handleCancel}>Hủy</Button>
                    <Form.Item className="m-0">
                        <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
                    </Form.Item>
                </div>

            </Form>
        </Modal >
    )
}

export default UpdateAccountButton