import Loader from "@/components/Loader";
import { useAppSelector } from "@/hooks/useRedux";
import { getVietnamAddress } from "@/lib/api/address-api";
import { searchClass } from "@/lib/api/class-api";
import { setAddress } from "@/lib/redux/addressSlice";
import { CityType, DistrictType, WardType } from "@/types/address";
import { SelectOptionType } from "@/types/antd-types";
import { Button, Empty, Form, FormProps, Pagination, Radio, Select } from "antd";
import Search from "antd/es/input/Search";
import { ListFilter, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ClassCard from "./ClassCard";
import { PaginationProp } from "@/types/pagination-types";
import { useNavigate, useSearchParams } from "react-router-dom";

type FieldType = {
  className?: string;
  classMethod?: string;
  district?: string;
  ward?: string;
  city?: string;
};

const ClassListPage = () => {
  const addresses: CityType[] = useAppSelector(state => state.address.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [wards, setWards] = useState<WardType[]>([]);
  const [pageProps, setPageProps] = useState<PaginationProp>(
    {
      currentPage: 0,
      totalCount: 0,
      totalPages: 0,
    }
  );
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function sortClassByDate(classesList: any) {
    return classesList.sort((classA: any, classB: any) => {
      const dateA = new Date(classA.createdDate);
      const dateB = new Date(classB.createdDate);
      return dateB.getTime() - dateA.getTime();
    });
  }
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    var strQuery = "";
    const queryArr: string[] = [];
    if (values.className) {
      queryArr.push("ClassName=" + values.className);
    }
    if (values.city) {
      queryArr.push("City=" + values.city);
    }
    if (values.district) {
      queryArr.push("District=" + values.district);
    }
    if (values.classMethod) {
      queryArr.push("ClassMethod=" + values.classMethod);
    }
    if (pageProps.currentPage) {
      queryArr.push("PageNumber=" + pageProps.currentPage);
    }
    if (queryArr.length > 0) {
      strQuery = "?" + queryArr.join("&");
      navigate(`/class-list${strQuery}`);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
  useEffect(() => {
    const fetchData = async () => {
      const addressResult = await getVietnamAddress();
      if (addressResult.data != null) {
        dispatch(setAddress(addressResult.data));
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const fetchSearchClassResult = async () => {
      setIsLoading(true);
      const classResult = await searchClass(searchParams.toString());
      if (classResult.error) {
        toast.error("Lấy thông tin thất bại!", {
          toastId: 'error_classList',
        });
      } else {
        setPageProps({
          currentPage: classResult.currentPage,
          totalCount: classResult.totalCount,
          totalPages: classResult.totalPages,
        })
        const filteredClassList = classResult.data.filter((c: any) => c.active == true);
        setClasses(sortClassByDate(filteredClassList));
      }
      setIsLoading(false);
    }
    fetchSearchClassResult();
  }, [searchParams])

  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        layout="vertical"
      >
        <div className="bg-blue-500 px-5 py-10 flex flex-col gap-5 items-center">
          <h1 className="text-white font-semibold text-center text-3xl">
            Danh sách lớp học
          </h1>
          <Form.Item name="className" className="mb-0">
            <Search
              placeholder="Nhập tên lớp để tìm kiếm"
              allowClear
              style={{
                width: 600,
              }}
              size="large"
              enterButton={
                <Button
                  icon={<SearchIcon width={15} height={15} />}
                  htmlType="submit"
                >
                </Button>
              }
            />
          </Form.Item>
          <p className="text-white text-sm">Có {pageProps.totalCount} kết quả</p>
        </div>
        <div className="grid grid-cols-12 m-5">
          <div className="col-span-3">
            <div className="bg-white p-3 drop-shadow rounded-lg">
              <h2 className="font-bold flex gap-2 items-center mb-5 text-lg">
                <ListFilter />
                Lọc kết quả tìm kiếm
              </h2>
              <Form.Item
                name="city"
                label="Tỉnh/thành"
                className="mb-2"
              >
                <Select
                  showSearch
                  allowClear
                  options={cityOptions}
                  placeholder="-- Chọn tỉnh/thành --"
                  onChange={onCityChange}
                />
              </Form.Item>

              <Form.Item
                name="district"
                label="Quận/huyện"
                className="mb-2"

              >
                <Select
                  showSearch
                  allowClear
                  options={districtOptions}
                  placeholder="-- Chọn quận/huyện --"
                  onChange={onDistrictChange}
                />
              </Form.Item>
              <Form.Item
                name="ward"
                label="Phường/xã"
                className="mb-2"
              >
                <Select
                  showSearch
                  allowClear
                  options={wardOptions}
                  placeholder="-- Chọn phường/xã --"
                />
              </Form.Item>
              <hr className="my-5" />
              <Form.Item
                name="classMethod"
                label="Phương thức dạy"
                className="mb-2"
              >
                <Radio.Group>
                  <Radio value={""}> Tất cả </Radio>
                  <Radio value={"Online"}> Online </Radio>
                  <Radio value={"In-person"}> Tại nhà </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item className="my-1">
                <Button type="primary" htmlType="submit" className="w-full">
                  Áp dụng
                </Button>
              </Form.Item>
            </div>
          </div>

          <div className="col-span-9 flex flex-col gap-3 px-5">
            {
              isLoading && <Loader />
            }
            {
              !isLoading && classes.length == 0 ? <Empty description={false} className="mt-10" /> : (
                classes.map((c: any, index: number) => {
                  return <ClassCard key={`class-${index}`} classData={c} />
                })
              )
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
    </div>
  )
}

export default ClassListPage;