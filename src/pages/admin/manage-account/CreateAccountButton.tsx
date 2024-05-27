import { Button, DatePicker, Form, FormProps, Input, Modal, Radio, Select } from "antd";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateAccountButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    type FieldType = {
        fullName: string;
        email: string;
        password: string;
        role: string;
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        handleOk();
        toast.success("Tạo tài khoản thành công");
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button
                type="primary"
                icon={<SquarePlus width={15} height={15} className="m-0" />}
                className="flex items-center"
                onClick={showModal}
            >
                Tạo tài khoản mới
            </Button>
            <Modal
                title="Tạo tài khoản mới"
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
                    autoComplete="off"
                    className="grid grid-cols-3 gap-2 mt-5"
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
                                    return Promise.reject(new Error('Năm sinh không hợp lệ'))
                                },
                            },
                        ]}
                        className="mb-3 col-span-2"
                    >
                        <DatePicker id="dob" format={'DD/MM/YYYY'} placeholder="Ngày sinh" className="w-full" />
                    </Form.Item>
                    <p className="font-bold">Giới tính</p>
                    <Form.Item name="gender"
                        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        className="col-span-2"
                    >
                        <Radio.Group defaultValue="male">
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
                            <Button type="primary" htmlType="submit">Tạo</Button>
                        </Form.Item>
                    </div>

                </Form>
            </Modal >
        </>
    )
}

export default CreateAccountButton