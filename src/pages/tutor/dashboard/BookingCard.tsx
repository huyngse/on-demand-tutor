import BookingStatus from "@/components/BookingStatus";
import { formatDate } from "@/utils/dateUtil";

type Props = {
    bookingData: any;
}
const BookingCard = ({ bookingData }: Props) => {
    return (
        <div className="drop-shadow rounded-lg overflow-hidden p-3 bg-white">
            <p><strong>Học và tên:</strong> {bookingData.student?.fullName}</p>
            <p><strong>Ngày đặt:</strong> {formatDate(new Date(bookingData.createDate))}</p>
            <p><strong>Lớp:</strong> {bookingData.class.className}</p>
            <p><strong>Trạng thái:</strong> <BookingStatus status={bookingData.status}/></p>
        </div>
    )
}

export default BookingCard