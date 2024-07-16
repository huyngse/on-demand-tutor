import { formatDate } from "@/utils/dateUtil"
import { useState } from "react";
import DefaultPfp from "@/assets/images/default_profile_picture.jpg"

type BookingCardProps = {
    bookingData: any;
    rerender: () => void;
}

const BookingCard = ({ bookingData }: BookingCardProps) => {
    const [pfp, setPfp] = useState<string>(bookingData.student.profileImage);

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

    return (
        <div className="bg-white drop-shadow p-3 rounded-lg grid grid-cols-12">
            <div className="col-span-3">
                <h5 className="font-bold text-lg">Thông tin người đặt</h5>
                <div className="overflow-hidden drop-shadow rounded-lg aspect-square w-[50%] my-3">
                    <img src={pfp} alt="" className="w-full h-full object-cover" onError={() => { setPfp(DefaultPfp) }} />
                </div>

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
            <div className="col-span-9 flex flex-col">
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
                {
                    (
                        bookingData.status == "Cancelled_by_student" ||
                        bookingData.status == "Cancelled_by_tutor" ||
                        bookingData.status == "Cancelled") &&
                        (bookingData.cancellationReason?.length > 0) && (
                        <p>
                            <span className="font-semibold">Lý do hủy: </span>{bookingData.cancellationReason}
                        </p>
                    )
                }
            </div>
        </div >
    )
}

export default BookingCard