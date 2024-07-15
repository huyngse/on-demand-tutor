import { BookingStatusType } from "@/lib/api/booking-api"

type Props = {
    status: BookingStatusType;
}
const BookingStatus = ({ status }: Props) => {
    var statusEl = <span></span>
    switch (status) {
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
            statusEl = <span className="text-blue-500">Đang dạy</span>
            break;
        }
        case "Ended": {
            statusEl = <span className="text-orange-500">Đã kết thúc</span>
            break;
        }
    }
    return statusEl;
}

export default BookingStatus