import BackButton from "@/components/BackButton";
import TiptapView from "@/components/tiptap/TiptapView";
import { getClassById } from "@/lib/api/class-api";
import { formatDate } from "@/utils/dateUtil";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Schedule from "./Schedule";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import DefaultPfp from "@/assets/images/default_profile_picture.jpg"
import { Button } from "antd";
const ClassDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classDetail, setClassDetail] = useState<any>();
  const [pfp, setPfp] = useState<string>();

  const { classId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (classId) {
        setIsLoading(true);
        const { data, error } = await getClassById(parseInt(classId));
        if (error) {
          toast.error("Lấy thông tin thất bại", {
            toastId: 'error_classDetail',
          });
        } else {
          setClassDetail(data);
          setPfp(data.tutor.profileImage);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (isLoading) return <Loader />
  if (!classDetail) return;
  return (
    <div className="bg-gray-50">
      <div className="mx-5 pt-3">
        <BackButton title="Quay về" iconWidth={15} />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-3 p-3">
          <div className="p-3 drop-shadow bg-white">
            <h1 className="font-semibold text-lg mb-2">Thông tin gia sư</h1>
            <div className="flex justify-center">
              <div className="overflow-hidden drop-shadow rounded-lg aspect-square mx-5">
                <img src={pfp} alt="" className="w-full h-full object-cover" onError={() => { setPfp(DefaultPfp) }} />
              </div>
            </div>
            <h4 className="font-bold text-center my-3 text-lg">{classDetail.tutor.fullName}</h4>
            <p><span className="font-semibold">Số điện thoại: </span>{classDetail.tutor.phoneNumber}</p>
            <p><span className="font-semibold">Email:  </span>{classDetail.tutor.emailAddress}</p>
            <p><span className="font-semibold">Địa chỉ: </span>{classDetail.tutor.street}, {classDetail.tutor.ward}, {classDetail.tutor.district}, {classDetail.tutor.city}</p>
            <Button className="w-full mt-5">Xem chi tiết</Button>
          </div>
        </div>
        <div className="col-span-9 p-3">
          <div className="bg-white rounded-lg drop-shadow p-3 mb-5">
            <h2 className="font-semibold text-xl">Lớp</h2>
            <div className="flex justify-between">
              <p className="text-3xl">{classDetail.className}</p>
            </div>
            <p>Ngày tạo: {formatDate(new Date(classDetail.createdDate))}</p>
            <hr className="my-2" />
            <div className="flex gap-5 flex-wrap">
              <h3 className="font-semibold">
                Phí dạy học: &nbsp;
                <span className="text-blue-500">
                  {formatNumberWithCommas(classDetail?.classFee)}₫
                </span>
              </h3>
              <h3 className="font-semibold">Hình thức dạy: <span className="font-normal">{classDetail.classMethod == "In-person" ? "Dạy trực tiếp (tại nhà)" : "Dạy online"}</span></h3>
              <h3 className="font-semibold">Địa chỉ lớp học: <span className="font-normal">{classDetail.ward}, {classDetail.district}, {classDetail.city}</span></h3>
              <h3 className="font-semibold">
                Trạng thái lớp: &nbsp;
                <span className={`font-normal ${classDetail.active ? "text-green-500" : "text-red-500"}`}>
                  {classDetail.active ? "Đang mở" : "Đang đóng"}
                </span>
              </h3>
            </div>
            <hr className="my-2" />
            <h2 className="font-semibold text-xl">Thông tin lớp</h2>
            {
              classDetail && <TiptapView content={classDetail?.classInfo} />
            }
            <h2 className="font-semibold text-xl">Yêu cầu lớp</h2>
            {
              classDetail && <TiptapView content={classDetail?.classRequire} />
            }
          </div>
          <div className="flex justify-between  items-center my-2">
            <h1 className="font-bold text-xl ">Lịch dạy lớp</h1>
          </div>
          {
            classDetail.schedules.length == 0 && (
              <div className="bg-white rounded-lg drop-shadow p-3 font-semibold text-gray-500 text-center">
                Lớp chưa có lịch dạy nào
              </div>
            )
          }
          {
            classDetail.schedules.length != 0 && (
              <div className="flex flex-col gap-3">
                {classDetail.schedules.map((schedule: any, index: number) => <Schedule data={schedule} key={`schedule-${index}`} />)}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ClassDetailPage