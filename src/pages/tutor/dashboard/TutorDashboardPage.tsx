import { useAppSelector } from "@/hooks/useRedux";
import { getTutorBooking } from "@/lib/api/booking-api";
import { getClassesByTutorId } from "@/lib/api/class-api";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import BookingCard from "./BookingCard";
const TutorDashboardPage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const [classes, setClasses] = useState<any[]>([]);
  const [bookings, setBooking] = useState<any[]>([]);
  const [teachingClass, setTeachingClass] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const classResult = await getClassesByTutorId(loggedUser.userId);
      if (classResult.error) {
        toast.error("Lấy thông tin lớp thất bại");
      } else {
        setClasses(classResult.data);
      }
      const bookingResult = await getTutorBooking(loggedUser.userId);
      if (bookingResult.error) {
        toast.error("Lấy thông tin đặt học thất bại");
      } else {
        var sortedBookingArr = bookingResult.data.sort((a: any, b: any) => {
          const dateA = new Date(a.createDate);
          const dateB = new Date(b.createDate);
          return dateB.getTime() - dateA.getTime();
        }
        );
        setBooking(sortedBookingArr);
        var tc = [];
        bookingResult.data?.forEach((booking: any) => {
          if (booking.status == "Accepted" || booking.status == "Started") {
            tc.push(booking.class.classId);
          }
        });
        setTeachingClass(tc.length);
      }

    }
    fetchData();
  }, [loggedUser])

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Lớp đã tạo</p>
          <p className="text-5xl">
            {classes.length}
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Lớp đang dạy</p>
          <p className="text-5xl">
            {teachingClass}
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Số Lượt đặt lịch dạy</p>
          <p className="text-5xl">
            {bookings.length}
          </p>
        </div>
      </div>
      <div className="col-span-8">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center">
          <p className="text-xl mb-3">Lượt đặt lịch học gần đây</p>
          <p className="w-full flex flex-col gap-3">
            {
              bookings?.slice(0, 3).map((booking: any, index: number) => {
                return <BookingCard key={`booking-${index}`} bookingData={booking} />
              })
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default TutorDashboardPage