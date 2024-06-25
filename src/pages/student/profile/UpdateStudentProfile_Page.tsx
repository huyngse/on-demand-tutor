import { useAppSelector } from '@/hooks/useRedux';
import { getUserById } from '@/lib/api/user-api';
import { Button, DatePicker, Form, FormProps, Input, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type FieldType = {
  emailAddress: string;
  fullname: string;
  dateOfBirth: Dayjs;
  phoneNumber: string;
  gender: 'male' | 'female';
  street: string;
  ward: string;
  district: string;
  city: string;
};


const UpdateStudentProfilePage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchStudentDetails = async () => {
      const { error, data } = await getUserById(loggedUser.userId);
      if (error) {
        toast.error("loi");
      } else {
        form.setFieldValue("fullname", data.fullname)
        form.setFieldValue("phoneNumber", data.phoneNumber)
        form.setFieldValue("emailAddress", data.emailAddress)
        form.setFieldValue("dateOfBirth", dayjs(data.dateOfBirth))
        form.setFieldValue("gender", data.gender)
        form.setFieldValue("street", data.street)
        form.setFieldValue("ward", data.ward)
        form.setFieldValue("district", data.district)
        form.setFieldValue("city", data.city)
      }
    };
    if (loggedUser) {
      fetchStudentDetails();
    }
  }, [loggedUser]);


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const requestBody: any = { ...values };
    requestBody.dateOfBirth = values.dateOfBirth.toISOString();
    console.log('Success:', requestBody);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-5">Thông tin tài khoản</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Họ và tên"
          name="fullname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="emailAddress"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
        >
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Radio.Group>
            <Radio value="Male"> Nam </Radio>
            <Radio value="Female"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Đường"
          name="street"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phường"
          name="ward"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          name="district"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thành phố"
          name="city"
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateStudentProfilePage;
