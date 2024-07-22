import BookingStatus from "@/components/BookingStatus";
import { formatDate } from "@/utils/dateUtil";
import { Button } from "antd";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
    bookingData: any;
}
const BookingCard = ({ bookingData }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="drop-shadow rounded-lg overflow-hidden p-3 bg-white flex">
            <div className="flex-1">
                <p><strong>Học sinh:</strong> {bookingData.student?.fullName}</p>
                <p><strong>Ngày đặt:</strong> {formatDate(new Date(bookingData.createDate))}</p>
                <p><strong>Lớp:</strong>
                    <Link to={`/admin/class/${bookingData.class.classId}`}>
                        {" "}{bookingData.class.className}
                    </Link>
                </p>

                <p><strong>Gia sư:</strong>
                    <Link to={`/admin/tutor/${bookingData.tutor.userId}`}>
                        {" "}{bookingData.tutor?.fullName}
                    </Link>
                </p>
                <p><strong>Trạng thái:</strong> <BookingStatus status={bookingData.status} /></p>
            </div>
            <div>
                <Button className="h-full" icon={<ChevronRight />} onClick={() => { navigate(`/admin/booking/${bookingData.bookingId}`) }} />
            </div>
        </div>
    )
}

export default BookingCard