import Loader from "@/components/Loader";
import TiptapView from "@/components/tiptap/TiptapView";
import { getClassById } from "@/lib/api/class-api";
import { formatDate } from "@/utils/dateUtil";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ActionButton from "./ActionButton";
import BackButton from "@/components/BackButton";
import Schedule from "./Schedule";
import CreateScheduleButton from "./CreateScheduleButton";

const TutorClassDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classDetail, setClassDetail] = useState<any>();
  const [renderKey, setRenderKey] = useState(0);
  const rerender = () => {
    setRenderKey(renderKey + 1);
  }
  const { classId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (classId) {
        setIsLoading(true);
        const { data, error } = await getClassById(parseInt(classId));
        if (error) {
          toast.error("Lấy thông tin thất bại");
        } else {
          setClassDetail(data);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, [renderKey]);
  if (isLoading) return <Loader />
  if (!classDetail) return;
  return (
    <div>
      <BackButton title="Quay về" iconWidth={15} />
      <h1 className="font-bold text-xl my-2">Thông tin lớp chi tiết</h1>
      <div className="bg-white rounded-lg drop-shadow p-3 mb-5">
        <h2 className="font-semibold text-xl">Lớp</h2>
        <div className="flex justify-between">
          <p className="text-3xl">{classDetail.className}</p>
          <ActionButton id={classDetail.classId} isActive={classDetail.active} rerender={rerender} />
        </div>
        <p>Ngày tạo: {formatDate(new Date(classDetail.createdDate))}</p>
        <hr className="my-2" />
        <div className="flex gap-5 flex-wrap">
          <h3 className="font-semibold">Phí dạy học: <span className="text-blue-500">{formatNumberWithCommas(classDetail?.classFee)}₫</span></h3>
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
        <CreateScheduleButton classId={classDetail.classId} />
      </div>
      {
        classDetail.schedules.length == 0 && (
          <div className="bg-white rounded-lg drop-shadow p-3 font-semibold text-gray-500 text-center">
            Lớp chưa có lịch dạy nào
          </div>
        )
      }
      {
        classDetail.schedules.length != 0 && classDetail.schedules.map((schedule: any) => <Schedule data={schedule} />)
      }
    </div>
  )
}

export default TutorClassDetailPage