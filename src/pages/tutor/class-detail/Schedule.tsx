import { getTimeString } from "@/utils/dateUtil";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import UpdateScheduleButton from "./UpdateScheduleButton";
import { deleteSchedule } from "@/lib/api/schedule-api";
import { toast } from "react-toastify";
import BookingCard from "./BookingCard";
import { useEffect, useState } from "react";
import type { PopconfirmProps } from 'antd';
import { Popconfirm } from 'antd';
import { getBookingByScheduleId } from "@/lib/api/booking-api";
type ScheduleProps = {
  classMethod: string;
  data: any;
  rerender: () => void;
}
const Schedule = ({ classMethod, data, rerender }: ScheduleProps) => {
  const [showBooking, setShowBooking] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const handleDeleteSchedule = async () => {
    const { error } = await deleteSchedule(data.scheduleID);
    if (error) {
      toast.error("Xóa lịch thất bại!");
    } else {
      toast.success("Xóa lịch thành công!");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
  }

  const confirm: PopconfirmProps['onConfirm'] = () => {
    handleDeleteSchedule();
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookingsResult = await getBookingByScheduleId(data.scheduleID);
      if (bookingsResult.error) {
        toast.error("Lấy thông tin đặt lịch thất bại");
      } else {
        var sortedBookings = [];
        if (bookingsResult.data != null && bookingsResult.data.length > 0) {
          sortedBookings = bookingsResult.data.sort((bookingA: any, bookingB: any) => {
            const dateA = new Date(bookingA.createDate);
            const dateB = new Date(bookingB.createDate);
            return dateB.getTime() - dateA.getTime();
          })
        }
        setBookings(sortedBookings);
      }
    }
    fetchData();
  }, [data])


  if (!data) return;
  var pendingBookingCount = 0;
  data.bookings.forEach((booking: any) => {
    if (booking.status == "Pending") {
      pendingBookingCount++;
    }
  });

  return (
    <div className="bg-white rounded-lg drop-shadow p-3">
      <h3 className="font-semibold">Lịch #{data.scheduleID}</h3>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">
          {data.title}
        </p>
        <div className="flex gap-2">
          <Popconfirm
            title="Xóa lịch"
            description="Xác nhận xóa lịch học này?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="default"
              danger
              shape="circle"
              icon={<Trash2 width={15} />}
            />
          </Popconfirm>
          <UpdateScheduleButton
            classId={0}
            scheduleData={data}
            rerender={rerender}
          />
        </div>
      </div>
      <hr className="my-2" />
      <h4 className="font-semibold text-lg mt-2">
        Ngày học
      </h4>
      <div className="flex justify-center gap-2">
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 2</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 3</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 4</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 5</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 6</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 7</p>
        <p className={`px-5 font-semibold py-2 drop-shadow bg-white`}>Chủ nhật</p>
      </div>
      <p className="text-lg mt-2">
        <span className="font-semibold">Thời gian học: </span>  {getTimeString(new Date(data.startTime))} - {getTimeString(new Date(data.endTime))}
      </p>
      {
        data.description && data.description.length > 0 && (
          <>
            <h4 className="font-semibold text-lg">
              Mô tả
            </h4>
            <p>
              {data.description}
            </p>
          </>
        )
      }
      <hr className="my-2" />
      <div>
        {(data.bookings != null && data.bookings.length > 0) && (
          <>
            {
              pendingBookingCount > 0 && (
                <p className="text-red-500">Có {pendingBookingCount} đơn đặt đang đợi duyệt</p>
              )
            }
            {
              showBooking ? (
                <>
                  <div className="flex gap-5 items-center mb-3">
                    <h4 className="font-semibold text-lg">
                      Đơn đặt lịch học
                    </h4>
                    <button className="text-orange-400" onClick={() => { setShowBooking(false) }}>
                      &lt;&lt; Ẩn đơn đặt lịch học
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {
                      bookings.map((booking: any, index: number) => {
                        return (
                          <BookingCard
                            key={`schedule-${data.scheduleID}-booking-${index}`}
                            classMethod={classMethod}
                            bookingData={booking}
                            rerender={rerender}
                          />
                        )
                      })
                    }
                  </div>
                </>
              )
                : (
                  <button className="text-blue-400" onClick={() => { setShowBooking(true) }}>
                    Hiện đơn đặt lịch học &gt;&gt;
                  </button>
                )
            }
          </>
        )}
      </div>
    </div>
  )
}

export default Schedule