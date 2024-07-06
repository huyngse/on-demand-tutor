import { Button } from "antd";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
type ClassCardProps = {
    classData: any;
}
const ClassCard = ({ classData }: ClassCardProps) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-lg drop-shadow overflow-hidden">
            <div className="overflow-auto">
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
                <Button
                    type="default"
                    onClick={() => { navigate(`/class/${classData.classId}`) }}
                    style={{
                        width: "100%"
                    }}
                >
                    Xem chi tiết
                </Button>
            </div>
        </div>
    )
}

export default ClassCard