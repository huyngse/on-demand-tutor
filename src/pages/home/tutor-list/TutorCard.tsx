import { Button } from "antd";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DefaultProfileImage from "@/assets/images/default_profile_picture.jpg";

type TutorCardProps = {
    data: any;
}
const TutorCard = ({ data }: TutorCardProps) => {
    const [pfp, setPfp] = useState(data.profileImage);
    var numOfEndedClasses = 0;
    data.bookings.forEach((b: any) => {
        if (b.status == "Ended") {
            numOfEndedClasses += 1;
        }
    });
    return (
        <div className="drop-shadow rounded-lg overflow-hidden bg-white">
            <div className="h-[200px] overflow-hidden">
                <img src={pfp} onError={() => {setPfp(DefaultProfileImage)}} alt="tutor profile picture" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex flex-col gap-1">
                <div className="font-bold text-center text-xl">
                    <Link to={`/tutor/${data.userId}`}>
                        {data.fullName}
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-1">
                    <MapPin className="w-4" />
                    {
                        data.city
                    }
                </div>
                <div className="text-center">
                    {data.school}
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Lớp đã tạo:
                            </td>
                            <td>
                                {data.classes.length}
                            </td>
                        </tr>
                        <tr>
                            <td>Lớp đã dạy:</td>
                            <td>
                                {numOfEndedClasses}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                </div>
                <Link to={`/tutor/${data.userId}`} className="flex justify-center mt-1">
                    <Button type="primary">Xem chi tiết</Button>
                </Link>
            </div>
        </div>
    )
}

export default TutorCard