import { useAppSelector } from "@/hooks/useRedux";
import useRerender from "@/hooks/useRerender";
import { getTutorBooking } from "@/lib/api/booking-api";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable from "./DataTable";

const TutorBookingListPage = () => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState<any[]>([]);
    const { rerender, renderKey } = useRerender();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const bookingsResult = await getTutorBooking(loggedUser.userId);
            if (bookingsResult.error) {
                toast.error("Lấy thông tin lớp thất bại!");
            } else {
                const mappedList = bookingsResult.data.map((booking: any) => {
                    return {
                        bookingId: booking.bookingId,
                        className: booking.class.className,
                        studentName: booking.student.fullName,
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
                <h1 className="font-bold text-xl">Danh sách đặt lớp</h1>
            </div>
            <DataTable dataSource={bookings} rerender={rerender} />
        </div>
    )
}

export default TutorBookingListPage