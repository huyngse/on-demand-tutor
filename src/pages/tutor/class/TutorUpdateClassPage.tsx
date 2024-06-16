import BackButton from "@/components/BackButton";
import TiptapInput from "@/components/tiptap/TiptapInput";
import { useAppSelector } from "@/hooks/useRedux";
import { getVietnamAddress } from "@/lib/api/address-api";
import { getClassById, updateClass } from "@/lib/api/class-api";
import { setAddress } from "@/lib/redux/addressSlice";
import { CityType, DistrictType, WardType } from "@/types/address";
import { SelectOptionType } from "@/types/antd-types";
import { Button, Form, FormProps, Input, InputNumber, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type FieldType = {
  className: string;
  classInfo: string;
  classRequire: string;
  classAddress: string;
  classMethod: string;
  classLevel: string;
  classFee: string;
  city: string;
  ward: string;
  district: string;
  active: boolean;
  tutorId: number;
};
const TutorUpdateClassPage = () => {
  const addresses: CityType[] = useAppSelector(state => state.address.value);
  const [classDetail, setClassDetail] = useState<any>();
  const { classId } = useParams();
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [wards, setWards] = useState<WardType[]>([]);
  const [form] = Form.useForm();
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
  const onCityChange = (e: any) => {
    const selectedCity = addresses.find(addr => addr.Name == e);
    if (selectedCity == null) return;
    setDistricts(selectedCity.Districts);
    form.setFieldValue("district", null);
    form.setFieldValue("ward", null);
    setWards([]);
  }
  const onDistrictChange = (e: any) => {
    const selectedDistrict = districts.find(addr => addr.Name == e);
    if (selectedDistrict == null) return;
    form.setFieldValue("ward", null);
    setWards(selectedDistrict.Wards);
  }
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    // console.log('Success:', values);
    const { error } = await updateClass(values, classDetail.classId);
    if (error) {
      toast.error("Lưu thay đổi thất bại");
    } else {
      toast.success("Lưu thay đổi thành công!");
      setTimeout(() => { navigate("/tutor/class") }, 1000);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    const fetchData = async () => {
      const addressResult = await getVietnamAddress();
      if (addressResult.data != null) {
        dispatch(setAddress(addressResult.data));
      }


      if (classId) {
        const classResult = await getClassById(parseInt(classId));
        if (classResult.data) {
          form.setFieldValue("active", classResult.data.active);
          form.setFieldValue("city", classResult.data.city);
          form.setFieldValue("classFee", classResult.data.classFee);
          form.setFieldValue("classInfo", classResult.data.classInfo);
          form.setFieldValue("classMethod", classResult.data.classMethod);
          form.setFieldValue("classLevel", classResult.data.classLevel);
          form.setFieldValue("className", classResult.data.className);
          form.setFieldValue("classRequire", classResult.data.classRequire);
          form.setFieldValue("district", classResult.data.district);
          form.setFieldValue("ward", classResult.data.ward);
          setClassDetail(classResult.data);
        }
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <BackButton title="Quay về" iconWidth={15} />
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <h1 className="font-bold text-xl my-2">Thay đổi thông tin lớp học</h1>
        <div className="p-5 rounded drop-shadow bg-white">
          <Form.Item
            label="Tên lớp"
            name="className"
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
          >
            <Input placeholder="Tên lớp" />
          </Form.Item>

          {
            classDetail && (
              <Form.Item
                label="Thông tin lớp"
                name="classInfo"
                rules={[{ required: true, message: 'Vui lòng nhập thông tin lớp học!' }]}
              >
                <TiptapInput content={classDetail?.classInfo} handleUpdate={(string: string) => form.setFieldValue('classInfo', string)} />
              </Form.Item>
            )
          }
          {
            classDetail && (
              <Form.Item
                label="Yêu cầu lớp học"
                name="classRequire"
                rules={[{ required: true, message: 'Vui lòng nhập yêu cầu lớp học!' }]}
              >
                <TiptapInput content={classDetail?.classRequire} handleUpdate={(string: string) => form.setFieldValue('classRequire', string)} />
              </Form.Item>
            )
          }
          <hr className="my-2" />

          <h3 className="font-bold text-lg mb-2">Địa chỉ lớp</h3>
          <Form.Item
            label="Tỉnh/thành"
            name="city"
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành!' }]}
            wrapperCol={{ span: 8 }}
          >
            <Select
              showSearch
              options={cityOptions}
              placeholder="-- Chọn tỉnh/thành --"
              onChange={onCityChange}
            />
          </Form.Item>
          <Form.Item
            label="Quận/huyện"
            name="district"
            rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
            wrapperCol={{ span: 8 }}
          >
            <Select
              showSearch
              options={districtOptions}
              placeholder="-- Chọn quận/huyện --"
              onChange={onDistrictChange}
            />
          </Form.Item>
          <Form.Item
            label="Phường/xã"
            name="ward"
            rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
            wrapperCol={{ span: 8 }}
          >
            <Select
              showSearch
              options={wardOptions}
              placeholder="-- Chọn phường/xã --"
            />
          </Form.Item>
          <hr className="my-2" />
          <Form.Item
            label="Phương thức dạy"
            name="classMethod"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức dạy học!' }]}
          >
            <Radio.Group>
              <Radio value="In-person"> Trực tiếp (tại nhà) </Radio>
              <Radio value="Online"> Online </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Trình độ lớp học"
            name="classLevel"
            rules={[{ required: true, message: 'Vui lòng nhập trình độ lớp học!' }]}
          >
            <Input placeholder="Trình độ lớp học" />
          </Form.Item>
          <Form.Item
            label="Phí dạy học"
            name="classFee"
            rules={[{ required: true, message: 'Vui lòng nhập phí dạy học' }]}
          >
            <InputNumber
              placeholder="Phí dạy học"
              min={10000}
              max={1000000000}
              className="w-full"
              formatter={(value) => `${value}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>
          <Form.Item
            label="Trạng thái lớp"
            name="active"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái lớp học!' }]}
          >
            <Radio.Group>
              <Radio value={false}> Đóng </Radio>
              <Radio value={true}> Mở </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <Button type="default" htmlType="button" onClick={() => { navigate(-1) }}>Hủy</Button>
          <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
        </div>
      </Form>
    </div>
  )
}

export default TutorUpdateClassPage;
//TIP TAP