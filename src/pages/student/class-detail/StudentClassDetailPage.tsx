import BackButton from "@/components/BackButton";
import Loader from "@/components/Loader";
import { changeBookingStatus, getBookingDetailbyId } from "@/lib/api/booking-api";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultPfp from "@/assets/images/default_profile_picture.jpg"
import { Button, Popconfirm, PopconfirmProps } from "antd";
import { formatDate, getTimeString } from "@/utils/dateUtil";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import TiptapView from "@/components/tiptap/TiptapView";
import useRerender from "@/hooks/useRerender";
import CancelBookingButton from "./CancelBookingButton";

const StudentClassDetailPage = () => {
  const [bookingDetail, setBookingDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pfp, setPfp] = useState<string>("");
  const { bookingId } = useParams();
  const { renderKey, rerender } = useRerender();

  const handleCancelBooking = async () => {
    const cancelResult = await changeBookingStatus(bookingDetail.bookingId, "Cancelled_by_student");
    if (cancelResult.error) {
      toast.error("Hủy đơn đặt thất bại");
    } else {
      toast.success("Hủy đơn đặt thành công");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
  }
  const cancelBooking_confirm: PopconfirmProps['onConfirm'] = () => {
    handleCancelBooking();
  };

  const cancelBooking_cancel: PopconfirmProps['onCancel'] = () => {
  };


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
          setPfp(bookingDetailResult.data.tutor.profileImage);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [renderKey]);

  if (isLoading) return <Loader />
  if (!bookingDetail) return;
  console.log("Booking detail:", bookingDetail);
  var statusEl;
  switch (bookingDetail.status) {
    case "Pending": {
      statusEl = <span className="text-blue-500">Đang chờ xác nhận</span>
      break;
    }
    case "Denied": {
      statusEl = <span className="text-red-500">Đã từ chối</span>
      break;
    }
    case "Accepted": {
      statusEl = <span className="text-green-500">Đã chấp nhận</span>
      break;
    }
    case "Cancelled": {
      statusEl = <span className="text-gray-500">Đã hủy</span>
      break;
    }
    case "Cancelled_by_tutor": {
      statusEl = <span className="text-gray-500">Đã hủy bởi gia sư</span>
      break;
    }
    case "Cancelled_by_student": {
      statusEl = <span className="text-gray-500">Đã hủy bởi học sinh</span>
      break;
    }
    case "Started": {
      statusEl = <span className="text-blue-500">Đang học</span>
      break;
    }
    case "Ended": {
      statusEl = <span className="text-orange-500">Đã kết thúc</span>
      break;
    }
  }
  return (
    <div>
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
            <h4 className="font-bold text-center my-3 text-lg">{bookingDetail.tutor.fullName}</h4>
            <p><span className="font-semibold">Số điện thoại: </span>{bookingDetail.tutor.phoneNumber}</p>
            <p><span className="font-semibold">Email:  </span>{bookingDetail.tutor.emailAddress}</p>
            <p><span className="font-semibold">Địa chỉ: </span>{bookingDetail.tutor.street}, {bookingDetail.tutor.ward}, {bookingDetail.tutor.district}, {bookingDetail.tutor.city}</p>
            <Link to={`/tutor/${bookingDetail.tutor.userId}`}>
              <Button className="w-full mt-5">Xem chi tiết</Button>
            </Link>
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
            <div className="flex justify-between  items-center my-2">
              <h1 className="font-bold text-xl ">Đơn đặt</h1>
            </div>
            <div className="bg-white drop-shadow p-3 rounded-lg">
              <h5 className="font-bold  text-lg">Thông tin chi tiết đơn đặt</h5>
              {
                bookingDetail.startDate && bookingDetail.endDate && (
                  <>
                    <p>
                      <span className="font-semibold">Ngày bắt đầu học: </span>{formatDate(new Date(bookingDetail.startDate))}
                    </p>
                    <p>
                      <span className="font-semibold">Ngày kết thúc học: </span>{formatDate(new Date(bookingDetail.endDate))}
                    </p>
                  </>
                )
              }
              {
                bookingDetail.class.classMethod == "In-person" ? (
                  <p>
                    <span className="font-semibold">Địa chỉ dạy: </span>{bookingDetail.address}
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Link lớp học online: </span><a href={bookingDetail.class.meetingLink}> {bookingDetail.class.meetingLink}</a>
                  </p>
                )
              }

              <p>
                <span className="font-semibold">Ghi chú: </span>{bookingDetail.description}
              </p>
              <p>
                <span className="font-semibold">Ngày đặt: </span>{formatDate(new Date(bookingDetail.createDate))}
              </p>
              <p className="font-semibold">
                Trạng thái: <span className="">{statusEl}</span>
              </p>
              {
                (
                  bookingDetail.status == "Cancelled_by_student" ||
                  bookingDetail.status == "Cancelled_by_tutor" ||
                  bookingDetail.status == "Cancelled") &&
                  (bookingDetail.cancellationReason?.length > 0) && (
                  <p>
                    <span className="font-semibold">Lý do hủy: </span>{bookingDetail.cancellationReason}
                  </p>
                )
              }
              <div className="flex justify-end gap-2">
                {
                  bookingDetail.status == "Pending" && (
                    <Popconfirm
                      title="Hủy đơn đặt"
                      description="Xác nhận hủy đơn đặt lịch này?"
                      onConfirm={cancelBooking_confirm}
                      onCancel={cancelBooking_cancel}
                      okText="Xác nhận"
                      cancelText="Hủy"
                    >
                      <Button danger>Hủy đơn đặt</Button>
                    </Popconfirm>
                  )
                }
                {
                  (bookingDetail.status == "Accepted" || bookingDetail.status == "Started") && (
                    <CancelBookingButton rerender={rerender} bookingId={bookingDetail.bookingId} />
                  )
                }
              </div>

            </div >
          </section>
        </div>
      </div>
    </div>
  )
}

export default StudentClassDetailPage