import { getTimeString } from "@/utils/dateUtil";
import { Button } from "antd";
import { Pencil, Trash2 } from "lucide-react";

type ScheduleProps = {
  data: any;
}
const Schedule = ({ data }: ScheduleProps) => {
  if (!data) return;
  return (
    <div className="bg-white rounded-lg drop-shadow p-3">
      <h3 className="font-semibold">Lịch #{data.scheduleID}</h3>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">
          {data.title}
        </p>
        <div className="flex gap-2">
          <Button type="default" danger shape="circle" icon={<Trash2 width={15}/>}/>
          <Button type="default" shape="circle" icon={<Pencil width={15}/>}/>
        </div>
      </div>
      <hr className="my-2" />
      <h4 className="font-semibold text-lg mt-2">
        Ngày học
      </h4>
      <div className="flex justify-center gap-2">
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 2</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 3</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 4</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 5</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 0 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 6</p>
        <p className={`px-5 font-semibold py-2 drop-shadow ${data.dateOfWeek == 1 ? "bg-blue-500 text-white" : "bg-white"}`}>Thứ 7</p>
        <p className={`px-5 font-semibold py-2 drop-shadow bg-white`}>Chủ nhật</p>
      </div>
      <p className="text-lg mt-2">
        <span className="font-semibold">Thời gian học: </span>  {getTimeString(new Date(data.startTime))} - {getTimeString(new Date(data.endTime))}
      </p>
      <h4 className="font-semibold text-lg">
        Mô tả
      </h4>
      <p>
        {data.description}
      </p>
    </div>
  )
}

export default Schedule