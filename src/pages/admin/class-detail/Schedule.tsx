import { getTimeString } from "@/utils/dateUtil";
import BookingCard from "./BookingCard";
import { useState } from "react";
type ScheduleProps = {
  data: any;
  rerender: () => void;
}
const Schedule = ({ data, rerender }: ScheduleProps) => {
  const [showBooking, setShowBooking] = useState(true);

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
                      data.bookings.map((booking: any, index: number) => {
                        return (
                          <BookingCard
                            key={`schedule-${data.scheduleID}-booking-${index}`}
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