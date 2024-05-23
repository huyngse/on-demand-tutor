import { formatNumberWithCommas } from "@/utils/numberUtil";
import { Button } from "antd";
import { MapPin } from "lucide-react";

type TutorCardProps = {
    data: any;
}
const TutorCard = ({ data }: TutorCardProps) => {
    return (
        <div className="drop-shadow rounded-lg overflow-hidden bg-white">
            <div className="h-[200px] overflow-hidden">
                <img src={data.profilePicUrl} alt="tutor profile picture" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex flex-col gap-1">
                <div className="font-bold text-center text-xl">
                    <a href={`/tutor/${data.id}`}>
                        {data.fullName}
                    </a>
                </div>
                <div className="flex justify-center items-center gap-1">
                    <MapPin className="w-4" />
                    {
                        data.city
                    }
                </div>
                <div className="text-center">
                    {data.academicBackground}
                </div>
                <div className="flex gap-2 justify-center">
                    {
                        data.subjects?.map((subject: any, index: number) => {
                            return (
                                <span key={`subject-${index}`} className="bg-gray-300 px-3 rounded-full">{subject.name}</span>
                            )
                        })
                    }
                </div>
                <div className="text-center text-lg text-blue-500">
                    {formatNumberWithCommas(data.pricePerSession)}vnd/buổi
                </div>
                <Button type="primary">Mời dạy</Button>
            </div>
        </div>
    )
}

export default TutorCard