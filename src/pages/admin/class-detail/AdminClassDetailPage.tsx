import BackButton from "@/components/BackButton";
import Loader from "@/components/Loader";
import TiptapView from "@/components/tiptap/TiptapView";
import { getClassById } from "@/lib/api/class-api";
import { getSchedulesByClassId } from "@/lib/api/schedule-api";
import { formatDate } from "@/utils/dateUtil";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Schedule from "./Schedule";
import { toast } from "react-toastify";
import { formatNumberWithCommas } from "@/utils/numberUtil";

const AdminClassDetailPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [classDetail, setClassDetail] = useState<any>();
    const [schedules, setSchedules] = useState<any[]>([]);
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
                    toast.error("Lấy thông tin thất bại", {
                        toastId: 'error_tutorClassDetail',
                    });
                } else {
                    setClassDetail(data);
                }
                const schedulesResult = await getSchedulesByClassId(parseInt(classId));
                if (schedulesResult.error) {
                    toast.error("Lấy lịch của lớp thất bại", {
                        toastId: 'error_tutorClassSchedule',
                    });
                } else {
                    setSchedules(schedulesResult.data);
                }
                setIsLoading(false);
            }
        }
        fetchData();
    }, [renderKey]);
    if (isLoading) return <Loader />
    if (!classDetail || !schedules) return;
    return (
        <div>
            <BackButton title="Quay về" iconWidth={15} />
            <h1 className="font-bold text-xl my-2">Thông tin lớp chi tiết</h1>
            <div className="bg-white rounded-lg drop-shadow p-3 mb-5">
                <h2 className="font-semibold text-xl">Lớp</h2>
                <div className="flex justify-between">
                    <p className="text-3xl">{classDetail.className}</p>
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
                        {schedules.map((schedule: any, index: number) => (
                            <Schedule data={schedule} rerender={rerender} key={`class-schedule-${index}`} />
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default AdminClassDetailPage