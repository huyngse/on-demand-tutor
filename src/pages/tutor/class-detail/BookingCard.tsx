import { formatDate } from "@/utils/dateUtil"
import { Button } from "antd"

type BookingCardProps = {
    bookingData: any,
}
const BookingCard = ({ bookingData }: BookingCardProps) => {
    var statusEl;
    switch (bookingData.status) {
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
    }
    return (
        <div className="bg-white drop-shadow p-3 rounded-lg grid grid-cols-12">
            <div className="col-span-3">
                <h5 className="font-bold text-lg">Thông tin người đặt</h5>
                <p>
                    <span className="font-semibold">Họ và tên: </span>{bookingData.student.fullName}
                </p>
                <p>
                    <span className="font-semibold">Sô điện thoại: </span>{bookingData.student.phoneNumber}
                </p>
                <p>
                    <span className="font-semibold">Email: </span>{bookingData.student.emailAddress}
                </p>
                <p>
                    <span className="font-semibold">Giới tính: </span>{bookingData.student.gender == "Male" ? "Nam" : "Nữ"}
                </p>
                
            </div>
            <div className="col-span-9">
                <h5 className="font-bold  text-lg">Thông tin chi tiết đơn đặt</h5>
                {
                    bookingData.startDate && bookingData.endDate && (
                        <>
                            <p>
                                <span className="font-semibold">Ngày bắt đầu học: </span>{formatDate(new Date(bookingData.startDate))}
                            </p>
                            <p>
                                <span className="font-semibold">Ngày kết thúc học: </span>{formatDate(new Date(bookingData.endDate))}
                            </p>
                        </>
                    )
                }

                <p>
                    <span className="font-semibold">Địa chỉ dạy: </span>{bookingData.address}
                </p>
                <p>
                    <span className="font-semibold">Ghi chú: </span>{bookingData.description}
                </p>
                <p>
                    <span className="font-semibold">Ngày đặt: </span>{formatDate(new Date(bookingData.createDate))}
                </p>
                <p className="font-semibold">
                    Trạng thái: <span className="">{statusEl}</span>
                </p>
                <div className="flex gap-2 justify-end">
                    {
                        bookingData.status == "Pending" && (
                            <>
                                <Button danger>Từ chối đơn đặt</Button>
                                <Button type="primary">Chấp nhận đơn đặt</Button>
                            </>
                        )
                    }
                    {
                        bookingData.status == "Accepted" && (
                            <>
                                <Button danger>Hủy đơn dạy</Button>
                            </>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default BookingCard