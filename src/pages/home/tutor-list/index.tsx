import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getVietnamAddress } from "@/lib/api/address-api";
import { Button, Form, FormProps, Input, Select } from "antd";
import { SearchProps } from "antd/es/input";
import { ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { setAddress } from "@/lib/redux/addressSlice";
import subjectData from "@/data/subjects.json";
import tutorTypesData from "@/data/tutorTypes.json"
import { SelectOptionType } from "@/types/antd-types";
import { CityType, DistrictType } from "@/types/address";
import { getAllTutors } from "@/lib/api/tutor-api";
import TutorCard from "./TutorCard";
type FieldType = {
  city?: string;
  district?: string;
  subject?: string;
  tutorType?: string;
};
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
const TutorListPage = () => {
  const addresses: CityType[] = useAppSelector(state => state.address.value);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [tutors, setTutors] = useState<any[]>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const addressResult = await getVietnamAddress();
      if (addressResult.data != null) {
        dispatch(setAddress(addressResult.data));
      }
      const tutorsResult = await getAllTutors();
      if (tutorsResult.data != null) {
        setTutors(tutorsResult.data);
      }
    }
    fetchData();
  }, []);

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
  var subjectOptions: SelectOptionType[] = [];
  subjectOptions = subjectData.map(subject => {
    return {
      value: subject.name,
      label: subject.name
    }
  });
  var tutorTypesOptions: SelectOptionType[] = [];
  tutorTypesOptions = tutorTypesData.map(tutorType => {
    return {
      value: tutorType.name,
      label: tutorType.name
    }
  });


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onCityChange = (e: any) => {
    const selectedCity = addresses.find(addr => addr.Name == e);
    if (selectedCity == null) return;
    setDistricts(selectedCity.Districts);
    form.setFieldValue("district", null);
  }

  return (
    <div className="bg-gray-100">
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="bg-blue-500 px-5 py-10 flex flex-col gap-5 items-center">

          <h1 className="text-white font-semibold text-center text-3xl">
            Danh Sách Gia Sư
          </h1>
          <Search
            placeholder="Nhập tên gia sư để tìm kiếm"
            allowClear
            onSearch={onSearch}
            style={{
              width: 600,
            }}
            size="large"
          // enterButton={<Button>Hello</Button>}
          />
          <p className="text-white text-sm">Có {tutors?.length} kết quả</p>
        </div>
        <div className="p-5 grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <div className="bg-white drop-shadow p-5  rounded-lg">
              <h2 className="font-bold flex gap-2 items-center mb-5 text-lg">
                <ListFilter />
                Lọc kết quả tìm kiếm
              </h2>
              <p className="font-bold mb-1">Tỉnh/thành</p>
              <Form.Item name="city" className="mb-3">
                <Select showSearch options={cityOptions} placeholder="-- Chọn tỉnh/thành --" onChange={onCityChange} />
              </Form.Item>
              <p className="font-bold mb-1">Quận/huyện</p>
              <Form.Item name="district">
                <Select options={districtOptions} placeholder="-- Chọn quận/huyện --" />
              </Form.Item>
              <hr className="mb-5" />
              <p className="font-bold mb-1">Môn học</p>
              <Form.Item name="subject" className="mb-3">
                <Select options={subjectOptions} placeholder="-- Chọn môn học --" />
              </Form.Item>
              <p className="font-bold mb-1">Đối tượng dạy học</p>
              <Form.Item name="tutorType">
                <Select options={tutorTypesOptions} placeholder="-- Chọn đối tượng dạy --" />
              </Form.Item>
              <Form.Item className="mb-0">
                <Button type="primary" htmlType="submit" className="w-full">
                  Áp dụng
                </Button>
              </Form.Item>
            </div>
          </div>

          <div className="col-span-9 grid grid-cols-3 gap-5">
            {
              tutors?.map((tutor: any, index: number) => {
                return (
                  <div key={`tutor-card-${index}`} className="col-span-1">
                    <TutorCard data={tutor} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </Form>
    </div >
  )
}

export default TutorListPage;