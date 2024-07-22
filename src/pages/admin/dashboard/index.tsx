import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import { getAllClass } from "@/lib/api/class-api";
import { getAllUsers } from "@/lib/api/user-api";
import { getAllBooking } from "@/lib/api/booking-api";
import { toast } from "react-toastify";
import { Roles } from "@/constants/roles";

const AdminDashboardPage = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [bookings, setBooking] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const classResult = await getAllClass();
      const usersResult = await getAllUsers();
      const bookingsResult = await getAllBooking();
      if (classResult.error || usersResult.error || bookingsResult.error) {
        toast.error("Lấy thông tin thất bại");
      } else {
        setUsers(usersResult.data);
        setBooking(bookingsResult.data);
        setClasses(classResult.data);
      }
    }
    fetchData();
  }, [])
  var totalTutors = 0;
  var totalStudents = 0;
  users.forEach((u: any) => {
    if (u.role == Roles.Tutor) {
      totalTutors += 1;
    } else if (u.role == Roles.Student) {
      totalStudents += 1;
    }
  })
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Tổng số lớp</p>
          <p className="text-5xl">
            {classes.length}
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Tống số gia sư</p>
          <p className="text-5xl">
            {totalTutors}
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Tống số học sinh</p>
          <p className="text-5xl">
            {totalStudents}
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
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Tống số lượt đặt</p>
          <p className="text-5xl">
            {bookings.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage;