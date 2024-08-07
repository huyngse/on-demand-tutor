import BackButton from "@/components/BackButton";
import TiptapView from "@/components/tiptap/TiptapView";
import useRerender from "@/hooks/useRerender";
import { getBookingDetailbyId } from "@/lib/api/booking-api";
import { formatDate, getTimeString } from "@/utils/dateUtil";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultPfp from "@/assets/images/default_profile_picture.jpg"
import BookingCard from "./BookingCard";

const TutorBookingDetailPage = () => {
    const [bookingDetail, setBookingDetail] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pfp, setPfp] = useState<string>("");
    const { bookingId } = useParams();
    const { renderKey, rerender } = useRerender();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (bookingId) {
                const bookingDetailResult = await getBookingDetailbyId(parseInt(bookingId));
                if (bookingDetailResult.error) {
                    toast.error("Lấy thông tin thất bại", {
                        toastId: 'error_bookingDetail',
                    });
                } else {
                    setBookingDetail(bookingDetailResult.data);
                    setPfp(bookingDetailResult.data.student.profileImage);
                }
            }
            setIsLoading(false);
        }
        fetchData();
    }, [renderKey]);
    if (isLoading) return <Loader />
    if (!bookingDetail) return;
    return (
        <div>
            <div className="mx-5 pt-3">
                <BackButton title="Quay về" iconWidth={15} />
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-3 p-3">
                    <div className="p-3 drop-shadow bg-white">
                        <h1 className="font-semibold text-lg mb-2">Thông tin học sinh   </h1>
                        <div className="flex justify-center">
                            <div className="overflow-hidden drop-shadow rounded-lg aspect-square mx-5">
                                <img src={pfp} alt="" className="w-full h-full object-cover" onError={() => { setPfp(DefaultPfp) }} />
                            </div>
                        </div>
                        <h4 className="font-bold text-center my-3 text-lg">{bookingDetail.student.fullName}</h4>
                        <p><span className="font-semibold">Số điện thoại: </span>{bookingDetail.student.phoneNumber}</p>
                        <p><span className="font-semibold">Email:  </span>{bookingDetail.student.emailAddress}</p>
                        <p><span className="font-semibold">Địa chỉ: </span>{bookingDetail.student.street}, {bookingDetail.student.ward}, {bookingDetail.student.district}, {bookingDetail.student.city}</p>
                    </div>
                </div>
                <div className="col-span-9 p-3">
                    <div className="bg-white rounded-lg drop-shadow p-3 mb-5">
                        <h2 className="font-semibold text-xl">Lớp</h2>
                        <div className="flex justify-between">
                            <p className="text-3xl">{bookingDetail.class.className}</p>
                        </div>
                        <p>Ngày tạo: {formatDate(new Date(bookingDetail.class.createdDate))}</p>
                        <hr className="my-2" />
                        <div className="flex gap-5 flex-wrap">
                            <h3 className="font-semibold">
                                Phí dạy học: &nbsp;
                                <span className="text-blue-500">
                                    {formatNumberWithCommas(bookingDetail.class?.classFee)}₫
                                </span>
                            </h3>
                            <h3 className="font-semibold">Hình thức dạy: <span className="font-normal">{bookingDetail.class.classMethod == "In-person" ? "Dạy trực tiếp (tại nhà)" : "Dạy online"}</span></h3>
                            <h3 className="font-semibold">Địa chỉ lớp học: <span className="font-normal">{bookingDetail.class.ward}, {bookingDetail.class.district}, {bookingDetail.class.city}</span></h3>
                            <h3 className="font-semibold">
                                Trạng thái lớp: &nbsp;
                                <span className={`font-normal ${bookingDetail.class.active ? "text-green-500" : "text-red-500"}`}>
                                    {bookingDetail.class.active ? "Đang mở" : "Đang đóng"}
                                </span>
                            </h3>
                        </div>
                        <hr className="my-2" />
                        <h2 className="font-semibold text-xl">Thông tin lớp</h2>
                        {
                            bookingDetail && <TiptapView content={bookingDetail.class?.classInfo} />
                        }
                        <h2 className="font-semibold text-xl">Yêu cầu lớp</h2>
                        {
                            bookingDetail && <TiptapView content={bookingDetail.class?.classRequire} />
                        }
                    </div>
                    {/*  SCHEDULE */}
                    <section>
                        <div className="flex justify-between  items-center my-2">
                            <h1 className="font-bold text-xl ">Lịch dạy lớp</h1>
                        </div>
                        <div className="bg-white rounded-lg drop-shadow p-3">
                            <h3 className="font-semibold">Lịch #{bookingDetail.schedule.scheduleID}</h3>
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-semibold">
                                    {bookingDetail.schedule.title}
                                </p>
                            </div>
                            <hr className="my-2" />
                            <h4 className="font-semibold text-lg mt-2">
                                Ngày học
                            </h4>
                            <div className="flex justify-center gap-2">
                                <p className={`px-5 font-semibold py-2 drop-shadow ${bookingDetail.schedule.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 2</p>
                                <p className={`px-5 font-semibold py-2 drop-shadow ${bookingDetail.schedule.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 3</p>
                                <p className={`px-5 font-semibold py-2 drop-shadow ${bookingDetail.schedule.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 4</p>
                                <p className={`px-5 font-semibold py-2 drop-shadow ${bookingDetail.schedule.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 5</p>
                                <p className={`px-5 font-semibold py-2 drop-shadow ${bookingDetail.schedule.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 6</p>
                                <p className={`px-5 font-semibold py-2 drop-shadow ${bookingDetail.schedule.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 7</p>
                                <p className={`px-5 font-semibold py-2 drop-shadow bg-white`}>Chủ nhật</p>
                            </div>
                            <p className="text-lg mt-2">
                                <span className="font-semibold">Thời gian học: </span>  {getTimeString(new Date(bookingDetail.schedule.startTime))} - {getTimeString(new Date(bookingDetail.schedule.endTime))}
                            </p>
                            {
                                bookingDetail.schedule.description && bookingDetail.schedule.description.length > 0 && (
                                    <>
                                        <h4 className="font-semibold text-lg">
                                            Mô tả
                                        </h4>
                                        <p>
                                            {bookingDetail.schedule.description}
                                        </p>
                                    </>
                                )
                            }
                        </div>
                    </section>
                    {/*  BOOKING */}
                    <section>
                        <h5 className="font-bold my-3 text-xl">Thông tin chi tiết đơn đặt</h5>
                        <BookingCard
                            classMethod={bookingDetail.class.classMethod}
                            rerender={rerender}
                            bookingData={bookingDetail}
                        />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default TutorBookingDetailPage