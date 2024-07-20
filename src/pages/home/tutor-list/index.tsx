import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getVietnamAddress } from "@/lib/api/address-api";
import { Button, Empty, Form, FormProps, Input, Pagination, Select } from "antd";
import { ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { setAddress } from "@/lib/redux/addressSlice";
import tutorTypesData from "@/data/tutorTypes.json"
import { SelectOptionType } from "@/types/antd-types";
import { CityType, DistrictType } from "@/types/address";
import TutorCard from "./TutorCard";
import { searchTutor } from "@/lib/api/user-api";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@/components/Loader";
import { PaginationProp } from "@/types/pagination-types";
import ScrollToTop from "@/components/ScrollToTop";
type FieldType = {
  TutorName?: string;
  City?: string;
  District?: string;
  TutorType?: string;
};
const { Search } = Input;

const TutorListPage = () => {
  const addresses: CityType[] = useAppSelector(state => state.address.value);
  const navigate = useNavigate();
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [pageProps, setPageProps] = useState<PaginationProp>(
    {
      currentPage: 0,
      totalCount: 0,
      totalPages: 0,
    }
  );
  const [tutors, setTutors] = useState<any[]>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const addressResult = await getVietnamAddress();
      if (addressResult.data != null) {
        dispatch(setAddress(addressResult.data));
      }
      const tutorsResult = await searchTutor(searchParams.toString());
      if (tutorsResult.data != null) {
        setPageProps({
          currentPage: tutorsResult.currentPage,
          totalCount: tutorsResult.totalCount,
          totalPages: tutorsResult.totalPages,
        })
        setTutors(tutorsResult.data);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [searchParams]);

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

  var tutorTypesOptions: SelectOptionType[] = [];
  tutorTypesOptions = tutorTypesData.map(tutorType => {
    return {
      value: tutorType.name,
      label: tutorType.name
    }
  });


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    var strQuery = "";
    const queryArr: string[] = [];
    if (values.TutorName) {
      queryArr.push("TutorName=" + values.TutorName);
    }
    if (values.City) {
      queryArr.push("City=" + values.City);
    }
    if (values.District) {
      queryArr.push("District=" + values.District);
    }
    if (values.TutorType) {
      queryArr.push("TutorType=" + values.TutorType);
    }
    if (pageProps.currentPage) {
      queryArr.push("PageNumber=" + pageProps.currentPage);
    }
    if (queryArr.length > 0) {
      strQuery = "?" + queryArr.join("&");
      navigate(`/tutor-list${strQuery}`);
    }
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
      <ScrollToTop />
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
          <Form.Item name="TutorName" className="mb-0">
            <Search
              placeholder="Nhập tên gia sư để tìm kiếm"
              allowClear
              style={{
                width: 600,
              }}
              size="large"
            // enterButton={<Button>Hello</Button>}
            />
          </Form.Item>
          <p className="text-white text-sm">Có {pageProps.totalCount} kết quả</p>
        </div>
        <div className="p-5 grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <div className="bg-white drop-shadow p-5  rounded-lg">
              <h2 className="font-bold flex gap-2 items-center mb-5 text-lg">
                <ListFilter />
                Lọc kết quả tìm kiếm
              </h2>
              <p className="font-bold mb-1">Tỉnh/thành</p>
              <Form.Item name="City" className="mb-3">
                <Select showSearch options={cityOptions} placeholder="-- Chọn tỉnh/thành --" onChange={onCityChange} allowClear />
              </Form.Item>
              <p className="font-bold mb-1">Quận/huyện</p>
              <Form.Item name="District">
                <Select options={districtOptions} placeholder="-- Chọn quận/huyện --" allowClear />
              </Form.Item>
              <hr className="mb-5" />
              <p className="font-bold mb-1">Đối tượng dạy học</p>
              <Form.Item name="TutorType">
                <Select options={tutorTypesOptions} placeholder="-- Chọn đối tượng dạy --" allowClear />
              </Form.Item>
              <Form.Item className="mb-0">
                <Button type="primary" htmlType="submit" className="w-full">
                  Áp dụng
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="col-span-9">
            {
              isLoading ? <Loader /> :
                <>
                  {
                    tutors && tutors.length > 0 ? (
                      <div className="grid grid-cols-4 gap-5">
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
                    ) : (
                      <div className="pt-10">
                        <Empty description="Không có kết quả" />
                      </div>
                    )
                  }
                </>
            }
            <div className="flex justify-center my-2">
              <Pagination defaultCurrent={1} current={pageProps.currentPage} total={pageProps.totalCount} onChange={
                (page: number, _: number) => {
                  setPageProps(
                    {
                      ...pageProps,
                      currentPage: page
                    }
                  );
                  form.submit();
                }
              } />
            </div>
          </div>
        </div>
      </Form>
    </div >
  )
}

export default TutorListPage;