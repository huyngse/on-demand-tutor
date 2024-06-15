import BackButton from "@/components/BackButton";
import TiptapInput from "@/components/tiptap/TiptapInput";
import { useAppSelector } from "@/hooks/useRedux";
import { getVietnamAddress } from "@/lib/api/address-api";
import { getClassById } from "@/lib/api/class-api";
import { setAddress } from "@/lib/redux/addressSlice";
import { CityType, DistrictType, WardType } from "@/types/address";
import { SelectOptionType } from "@/types/antd-types";
import { Button, Form, FormProps, Input, InputNumber, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type FieldType = {
  ClassName: string;
  ClassInfo: string;
  ClassRequire: string;
  ClassAddress: string;
  ClassMethod: string;
  ClassLevel: string;
  ClassFee: string;
  City: string;
  Ward: string;
  District: string;
  Active: boolean;
  TutorId: number;
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
    setWards([]);
  }
  const onDistrictChange = (e: any) => {
    const selectedDistrict = districts.find(addr => addr.Name == e);
    if (selectedDistrict == null) return;
    setWards(selectedDistrict.Wards);
  }
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    toast.success("Lưu thay đổi thành công!");
    setTimeout(() => { navigate("/tutor/class") }, 1000);
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
          form.setFieldValue("Active", classResult.data.Active);
          form.setFieldValue("City", classResult.data.City);
          form.setFieldValue("ClassFee", classResult.data.ClassFee);
          form.setFieldValue("ClassInfo", classResult.data.ClassInfo);
          form.setFieldValue("ClassMethod", classResult.data.ClassMethod);
          form.setFieldValue("ClassLevel", classResult.data.ClassLevel);
          form.setFieldValue("ClassName", classResult.data.ClassName);
          form.setFieldValue("ClassRequire", classResult.data.ClassRequire);
          form.setFieldValue("District", classResult.data.District);
          form.setFieldValue("Ward", classResult.data.Ward);
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
            name="ClassName"
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
          >
            <Input placeholder="Tên lớp" />
          </Form.Item>
          <Form.Item
            label="Thông tin lớp"
            name="ClassInfo"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin lớp học!' }]}
          >
            <TiptapInput content={""} handleUpdate={(string: string) => form.setFieldValue('ClassInfo', string)} />
          </Form.Item>
          <Form.Item
            label="Yêu cầu lớp học"
            name="ClassRequire"
            rules={[{ required: true, message: 'Vui lòng nhập yêu cầu lớp học!' }]}
          >
            <TiptapInput content={""} handleUpdate={(string: string) => form.setFieldValue('ClassRequire', string)} />
          </Form.Item>
          <hr className="my-2" />

          <h3 className="font-bold text-lg mb-2">Địa chỉ lớp</h3>
          <Form.Item
            label="Tỉnh/thành"
            name="City"
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
            name="District"
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
            name="Ward"
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
            name="ClassMethod"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức dạy học!' }]}
          >
            <Radio.Group>
              <Radio value="In-person"> Trực tiếp (tại nhà) </Radio>
              <Radio value="Online"> Online </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Trình độ lớp học"
            name="ClassLevel"
            rules={[{ required: true, message: 'Vui lòng nhập trình độ lớp học!' }]}
          >
            <Input placeholder="Trình độ lớp học" />
          </Form.Item>
          <Form.Item
            label="Phí dạy học"
            name="ClassFee"
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
            name="Active"
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