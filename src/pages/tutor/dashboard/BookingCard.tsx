import BookingStatus from "@/components/BookingStatus";
import { formatDate } from "@/utils/dateUtil";
import { Button } from "antd";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
    bookingData: any;
}
const BookingCard = ({ bookingData }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="drop-shadow rounded-lg overflow-hidden p-3 bg-white flex">
            <div className="flex-1">
                <p><strong>Học và tên:</strong> {bookingData.student?.fullName}</p>
                <p><strong>Ngày đặt:</strong> {formatDate(new Date(bookingData.createDate))}</p>
                <p><strong>Lớp:</strong> {bookingData.class.className}</p>
                <p><strong>Trạng thái:</strong> <BookingStatus status={bookingData.status} /></p>
            </div>
            <div>
                <Button className="h-full" icon={<ChevronRight />} onClick={() => { navigate(`/tutor/booking/${bookingData.bookingId}`) }} />
            </div>
        </div>
    )
}

export default BookingCard