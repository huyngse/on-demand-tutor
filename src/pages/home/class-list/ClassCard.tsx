import { formatDate } from "@/utils/dateUtil";
import DefaultAvatar from "@/assets/images/default_profile_picture.jpg"
import { Avatar, Button } from "antd";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
type ClassCardProps = {
    classData: any;
}
const ClassCard = ({ classData }: ClassCardProps) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white flex rounded-lg drop-shadow overflow-hidden">
            <div className="w-[175px] p-5 bg-blue-500 text-white font-semibold flex flex-col justify-center items-center">
                <Avatar src={DefaultAvatar} size="large" />
                <p>Họ và tên</p>
                <p>{formatDate(new Date(classData.createdDate))}</p>
            </div>
            <div className="p-3 flex-1">
                <Link to={`/class/${classData.classId}`}>
                    <h3 className="font-semibold text-xl">{classData.className}</h3>
                </Link>
                <p><span className="font-semibold">Phương thức dạy:</span> {classData.classMethod == "In-person" ?
                    <span className="text-pink-500">Trực tiếp (tại nhà)</span>
                    :
                    <span className="text-blue-500">Online</span>}</p>
                <p><span className="font-semibold">Phí dạy học:</span> {formatNumberWithCommas(classData.classFee)}₫</p>
                <p><span className="font-semibold">Địa chỉ dạy:</span> {classData.ward}, {classData.district}, {classData.city}</p>
                <p><span className="font-semibold">Số lịch học:</span> {classData.schedules.length}</p>
            </div>
            <Button className="h-full" icon={<ChevronRight />} onClick={() => { navigate(`/class/${classData.classId}`) }} />
        </div>
    )
}

export default ClassCard