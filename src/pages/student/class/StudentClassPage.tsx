import Loader from "@/components/Loader";
import { useAppSelector } from "@/hooks/useRedux"
import { getStudentBooking } from "@/lib/api/booking-api";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import Datatable from "./Datatable";

const StudentClassPage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [renderKey, setRenderKey] = useState<number>(0);
  const rerender = () => {
    setRenderKey(renderKey + 1);
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const bookingsResult = await getStudentBooking(loggedUser.userId);
      if (bookingsResult.error) {
        toast.error("Lấy thông tin lớp thất bại!");
      } else {
        const mappedList = bookingsResult.data.map((booking: any) => {
          return {
            bookingId: booking.bookingId,
            className: booking.class.className,
            tutorName: booking.tutor.fullName,
            createDate: booking.createDate,
            status: booking.status,
            classMethod: booking.class.classMethod,
          }
        });
        setBookings(mappedList);
      }
      setIsLoading(false);
    }
    if (loggedUser) {
      fetchData();
    }
  }, [renderKey, loggedUser]);
  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="mb-3">
        <h1 className="font-bold text-xl">Danh sách lớp đã đặt</h1>
      </div>
      <Datatable dataSource={bookings} rerender={rerender} />
    </div>
  )
}

export default StudentClassPage