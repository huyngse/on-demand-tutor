import TiptapInput from "@/components/tiptap/TiptapInput";
import { useAppSelector } from "@/hooks/useRedux";
import { getVietnamAddress } from "@/lib/api/address-api";
import { setAddress } from "@/lib/redux/addressSlice";
import { CityType, DistrictType, WardType } from "@/types/address";
import { SelectOptionType } from "@/types/antd-types";
import { Button, DatePicker, Form, FormProps, Input, InputNumber, Radio, Select } from "antd"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import tutorTypesData from "@/data/tutorTypes.json";
import subjectsData from "@/data/subjects.json";
import { getTutorByAccountId } from "@/lib/api/tutor-api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
type FieldType = {
  fullName: string;
  gender: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  tutorType: string;
  subjects: any[];
  school: string;
  basicInfo: string;
  experimentInfo: string;
  achievementInfo: string;
  teachingTopic: string;
  teachingArea: string;
  dob: string;
  teachingMethod: string;
  phoneNumber: string;
  email: string;
  pricePerSession: number;
};
const TutorUpdateProfilePage = () => {
  const [form] = Form.useForm();
  const addresses: CityType[] = useAppSelector(state => state.address.value);
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [tutorDetail, setTutorDetail] = useState<any>();
  const [wards, setWards] = useState<WardType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  var cityOptions: SelectOptionType[] = [];
  if (addresses != null) {
    cityOptions = addresses.map(addr => {
      return {
        value: addr.Name,
        label: addr.Name
      }
    })
  }
  var districtOptions: SelectOptionType[] = [];
  if (addresses != null) {
    districtOptions = districts.map(addr => {
      return {
        value: addr.Name,
        label: addr.Name
      }
    })
  }
  var wardOptions: SelectOptionType[] = [];
  if (addresses != null) {
    wardOptions = wards.map(addr => {
      return {
        value: addr.Name,
        label: addr.Name
      }
    })
  }
  var tutorTypesOptions: SelectOptionType[] = [];
  tutorTypesOptions = tutorTypesData.map(tutorType => {
    return {
      value: tutorType.name,
      label: tutorType.name
    }
  });
  var subjectOptions: SelectOptionType[] = [];
  subjectOptions = subjectsData.map(subject => {
    return {
      value: subject.id + "",
      label: subject.name
    }
  });
  const onCityChange = (e: any) => {
    const selectedCity = addresses.find(addr => addr.Name == e);
    if (selectedCity == null) return;
    setDistricts(selectedCity.Districts);
    setWards([]);
    form.setFieldValue("district", null);
    form.setFieldValue("ward", null);
  }
  const onDistrictChange = (e: any) => {
    const selectedDistrict = districts.find(addr => addr.Name == e);
    if (selectedDistrict == null) return;
    setWards(selectedDistrict.Wards);
    form.setFieldValue("ward", null);
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    toast.success("Cập nhật thông tin thành công!");
    setTimeout(() => {navigate("/tutor/profile")}, 1000);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error("Cập nhật thông tin thất bại!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const addressResult = await getVietnamAddress();
      if (addressResult.data != null) {
        dispatch(setAddress(addressResult.data));
      }
      if (loggedUser) {
        const tutorResult = await getTutorByAccountId(loggedUser.id);
        if (tutorResult.data) {
          setTutorDetail(tutorResult.data);
          form.setFieldValue("username", loggedUser.username);
          form.setFieldValue("email", loggedUser.email);
          form.setFieldValue("fullName", loggedUser.fullName);
          form.setFieldValue("gender", loggedUser.gender);
          form.setFieldValue("phone", loggedUser.phone);
          form.setFieldValue("city", tutorResult.data.city);
          form.setFieldValue("district", tutorResult.data.district);
          form.setFieldValue("ward", tutorResult.data.ward);
          form.setFieldValue("street", tutorResult.data.street);
          form.setFieldValue("dob", dayjs(loggedUser.dob));
          form.setFieldValue("tutorType", tutorResult.data.tutorType);
          form.setFieldValue("school", tutorResult.data.school);
          form.setFieldValue("basicInfo", tutorResult.data.basicInfo);
          form.setFieldValue("experimentInfo", tutorResult.data.experimentInfo);
          form.setFieldValue("achievementInfo", tutorResult.data.achievementInfo);
          form.setFieldValue("teachingTopic", tutorResult.data.teachingTopic);
          form.setFieldValue("teachingArea", tutorResult.data.teachingArea);
          form.setFieldValue("pricePerSession", tutorResult.data.pricePerSession);
          form.setFieldValue("subjects", tutorResult.data.subjects.map(subject => subject.id + ""));
        }
      }
    }
    fetchData();
  }, [loggedUser]);

  return (
    <Form
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <div className="flex justify-end gap-2 mb-3">
        <Button type="default" onClick={() => { navigate(-1) }} htmlType="button">Hủy</Button>
        <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
      </div>
      <div className="bg-white rounded-lg py-3 px-5 drop-shadow grid grid-cols-12 gap-5">
        <h2 className="col-span-12 font-bold text-xl">
          Thông tin tài khoản
        </h2>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          className="col-span-6 mb-0"
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
          className="col-span-6 mb-0"

        >
          <Input disabled placeholder="email" />
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          className="col-span-6 mb-0"
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <div className="col-span-6">
          <div className="mb-2 flex items-center gap-1">
            <span className="text-[1.2rem] text-red-400">*</span><label htmlFor="dob">Ngày sinh</label>
          </div>
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
            className="mb-0"
          >
            <DatePicker id="dob" format={'DD/MM/YYYY'} placeholder="Ngày sinh" className="w-full" />
          </Form.Item>
        </div>
        <div className="col-span-6">
          <div className="mb-2">
            Giới tính
          </div>
          <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
            className="mb-0"
          >
            <Radio.Group>
              <Radio value="male"> Nam </Radio>
              <Radio value="female"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          className="col-span-6 mb-0"
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Tỉnh/thành"
          name="city"
          className="col-span-6 mb-0"
        >
          <Select showSearch options={cityOptions} placeholder="-- Chọn tỉnh/thành --" onChange={onCityChange} />
        </Form.Item>
        <Form.Item
          label="Quận/huyện"
          name="district"
          className="col-span-6 mb-0"
        >
          <Select showSearch options={districtOptions} placeholder="-- Chọn quận/huyện --" onChange={onDistrictChange} />
        </Form.Item>
        <Form.Item
          label="Phường/xã"
          name="ward"
          className="col-span-6 mb-0"
        >
          <Select showSearch options={wardOptions} placeholder="-- Chọn phường/xã --" />
        </Form.Item>
        <Form.Item
          label="Đường, phố, số nhà"
          name="street"
          className="col-span-6 mb-0"
        >
          <Input placeholder="Đường, phố, số nhà" />
        </Form.Item>
        <hr className="col-span-12" />
        {
          tutorDetail && (
            <>
              <h2 className="col-span-12 font-bold text-xl">
                Thông tin gia sư
              </h2>
              <Form.Item
                label="Phí dạy học (vnd/buổi)"
                name="pricePerSession"
                className="m-0 col-span-6"
                rules={[{ required: true, message: 'Vui lòng nhập phí dạy học!' }]}
              >
                <InputNumber
                  placeholder="Phí dạy học (vnd/buổi)"
                  min={10000}
                  max={1000000000}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Nghề nghiệp"
                name="tutorType"
                className="m-0 col-span-6"
                rules={[{ required: true, message: 'Vui lòng chọn nghề nghiệp!' }]}
              >
                <Select options={tutorTypesOptions} placeholder="-- Chọn nghề nghiệp --" />
              </Form.Item>
              <Form.Item
                label="Trường đang học/đã tốt nghiệp"
                name="school"
                className="m-0 col-span-12"
                rules={[{ required: true, message: 'Vui lòng nhập trường học!' }]}
              >
                <Input placeholder="Trường đang học/đã tốt nghiệp" />
              </Form.Item>
              <Form.Item label="Nhận dạy môn học" name="subjects" className="m-0 col-span-12">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Chọn môn dạy học"
                  options={subjectOptions}
                />
              </Form.Item>
              <div className="col-span-12">
                <div className="mb-2 font-semibold text-lg">
                  Thông tin cơ bản
                </div>
                <Form.Item
                  name="basicInfo"
                  className="mb-0"
                >
                  <TiptapInput content={tutorDetail.basicInfo} handleUpdate={(string: string) => form.setFieldValue('basicInfo', string)} />
                </Form.Item>
              </div>
              <div className="col-span-12">
                <div className="mb-2 font-semibold text-lg">
                  Kinh nghiệm gia sư, giảng dạy
                </div>
                <Form.Item
                  name="experimentInfo"
                  className="mb-0"
                >
                  <TiptapInput content={tutorDetail.experimentInfo} handleUpdate={(string: string) => form.setFieldValue('experimentInfo', string)} />
                </Form.Item>
              </div>
              <div className="col-span-12">
                <div className="mb-2 font-semibold text-lg">
                  Thành tích trong học tập và dạy học
                </div>
                <Form.Item
                  name="achievementInfo"
                  className="mb-0"
                >
                  <TiptapInput content={tutorDetail.achievementInfo} handleUpdate={(string: string) => form.setFieldValue('achievementInfo', string)} />
                </Form.Item>
              </div>
              <div className="col-span-12">
                <div className="mb-2 font-semibold text-lg">
                  Chủ đề dạy
                </div>
                <Form.Item
                  name="teachingTopic"
                  className="mb-0"
                >
                  <TiptapInput content={tutorDetail.teachingTopic} handleUpdate={(string: string) => form.setFieldValue('teachingTopic', string)} />
                </Form.Item>
              </div>
              <div className="col-span-12">
                <div className="mb-2 font-semibold text-lg">
                  Khu vực dạy
                </div>
                <Form.Item
                  name="teachingArea"
                  className="col-span-6 mb-0"
                >
                  <TiptapInput content={tutorDetail.teachingArea} handleUpdate={(string: string) => form.setFieldValue('teachingArea', string)} />
                </Form.Item>
              </div>
            </>
          )
        }
      </div>
    </Form>
  )
}

export default TutorUpdateProfilePage