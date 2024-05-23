import TiptapView from "@/components/tiptap/TiptapView";
import { getTutorById } from "@/lib/api/tutor-api";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import { Button } from "antd";
import { BookText, BriefcaseBusiness, Check, EllipsisVertical, Flag, MapPin, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AchievementCard from "./AchievementCard";
import { formatDate } from "@/utils/dateUtil";
import Feedback from "./Feedback";

const TutorDetailPage = () => {
  const [tutorDetail, setTutorDetail] = useState<any>();
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getTutorById(parseInt(id));
        setTutorDetail(result.data);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="bg-gray-100 px-5 flex flex-col gap-10 pb-10">
      <div className="bg-white rounded-lg drop-shadow overflow-hidden">
        <div className="bg-blue-500 p-5 pt-40  grid grid-cols-12">
          <div className="col-span-2">
          </div>
          <div className="col-span-10 px-10 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h2 className="text-white font-bold text-4xl">{tutorDetail?.fullName}</h2>
              <span className="bg-green-500 rounded-full w-[14px] h-[14px] flex justify-center items-center text-white">
                <Check width={10} height={10} />
              </span>
            </div>
            <Button type="default" shape="circle" icon={<Flag width={15} />} disabled />
          </div>
        </div>
        <div className="py-3 px-14 grid grid-cols-12 gap-5">
          <div className="col-span-2 -translate-y-32">
            <div className="overflow-hidden drop-shadow rounded-lg aspect-square">
              <img src={tutorDetail?.profilePicUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <table className="w-full border-r border-r-gray-300 mt-2">
              <tbody>
                <tr >
                  <th scope="row" className="text-start py-2">
                    Lớp đã dạy:
                  </th>
                  <td className="text-end pe-2">{tutorDetail?.noOfClasses}</td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    Lượt đánh giá:
                  </th>
                  <td className="text-end  pe-2">{tutorDetail?.feedbacks.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-span-10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th>
                    <p className="flex gap-1">
                      <BookText />
                      Nhận dạy môn
                    </p>
                  </th>
                  <th >
                    <p className="flex gap-1">
                      <Tag />
                      Phí dạy học
                    </p>
                  </th>
                  <th >
                    <p className="flex gap-1">
                      <MapPin />
                      Địa điểm
                    </p>
                  </th>
                  <th >
                    <p className="flex gap-1">
                      <BriefcaseBusiness />
                      Hình thức dạy
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">
                    <div className="flex gap-2">
                      {
                        tutorDetail?.subjects?.map((subject: any, index: number) => {
                          return (
                            <span key={`subject-${index}`} className="bg-gray-300 px-3 rounded-full text-sm">{subject.name}</span>
                          )
                        })
                      }
                    </div>
                  </td>
                  <td>
                    <div className="text-blue-500 font-semibold">
                      {tutorDetail && formatNumberWithCommas(tutorDetail?.pricePerSession)}vnd/buổi
                    </div>
                  </td>
                  <td>
                    {tutorDetail?.city}
                  </td>
                  <td>
                    {tutorDetail?.teachingMethod == "offline" && "Offline (tại nhà)"}
                    {tutorDetail?.teachingMethod == "online" && "Offline (trực tuyến)"}
                    {tutorDetail?.teachingMethod == "both" && "Offline (tại nhà), Offline (trực tuyến)"}
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="font-semibold  text-2xl mt-3">
              Thông tin cơ bản
            </h4>
            {
              tutorDetail && <TiptapView content={tutorDetail?.basicInfo} />
            }
            <h4 className="font-semibold  text-2xl mt-3">
              Kinh nghiệm gia sư, giảng dạy
            </h4>
            {
              tutorDetail && <TiptapView content={tutorDetail?.experimentInfo} />
            }
            <h4 className="font-semibold  text-2xl mt-3">
              Thành tích trong học tập và dạy học
            </h4>
            {
              tutorDetail && <TiptapView content={tutorDetail?.achievementInfo} />
            }
            <h4 className="font-semibold  text-2xl mt-3">
              Chủ đề dạy
            </h4>
            {
              tutorDetail && <TiptapView content={tutorDetail?.teachingTopic} />
            }
            <h4 className="font-semibold  text-2xl mt-3 mb-1">
              Gia sư đang là
            </h4>
            <span className="bg-gray-300 px-3 py-1 rounded-full">
              {
                tutorDetail?.tutorType
              }
            </span>
            <h4 className="font-semibold  text-2xl mt-3 mb-1">
              Khu vực dạy
            </h4>
            <p>
              {
                tutorDetail?.teachingArea
              }
            </p>
            <h4 className="font-semibold  text-2xl mt-3 mb-1">
              Địa chỉ
            </h4>
            <p>
              {tutorDetail?.street}, {tutorDetail?.ward}, {tutorDetail?.district}, {tutorDetail?.city}
            </p>
            {/* {JSON.stringify(tutorDetail)} */}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="py-3 px-10 bg-blue-500 font-semibold text-white rounded-t-lg">Lịch dạy gia sư</span>
        </div>
        <div className="py-5 px-10 bg-white rounded-md drop-shadow grid grid-cols-12">
          <div className="col-span-2 flex items-center">
            <p className="text-center">
              Thời gian có thể dạy (Màu <span className="text-blue-500">XANH</span> hiển thị những lịch có thể dạy)
            </p>
          </div>
          <div className="col-span-10 py-3 flex gap-3 px-8">
            {
              tutorDetail?.timetable.map((day: any, index: number) => {
                var dayName: string = "";
                switch (day.day) {
                  case "monday":
                    dayName = "Thứ 2";
                    break;
                  case "tuesday":
                    dayName = "Thứ 3";
                    break;
                  case "wednesday":
                    dayName = "Thứ 4";
                    break;
                  case "thursday":
                    dayName = "Thứ 5";
                    break;
                  case "friday":
                    dayName = "Thứ 6";
                    break;
                  case "saturday":
                    dayName = "Thứ 7";
                    break;
                  case "sunday":
                    dayName = "Chủ nhật";
                    break;
                  default:
                    break;
                }
                return (
                  <div className="flex flex-col gap-2" key={`time_table-${index}`}>
                    <p className="font-semibold text-center">{dayName}</p>
                    <p className={`w-[70px] ${day.morning ? "bg-blue-500 text-white" : "bg-gray-300"} px-3 py-1 text-center`}>
                      Sáng
                    </p>
                    <p className={`w-[70px] ${day.noon ? "bg-blue-500 text-white" : "bg-gray-300"} px-3 py-1 text-center`}>
                      Trưa
                    </p>
                    <p className={`w-[70px] ${day.night ? "bg-blue-500 text-white" : "bg-gray-300"} px-3 py-1 text-center`}>
                      Tối
                    </p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="py-3 px-10 bg-blue-500 font-semibold text-white rounded-t-lg">Hình ảnh hoạt động dạy học/thành tích</span>
        </div>
        <div className="bg-white rounded-lg drop-shadow overflow-hidden py-5 px-10 grid grid-cols-4 gap-3">
          {
            tutorDetail?.achievements.map((achieve: any, index: number) => {
              return (
                <AchievementCard data={achieve} key={`achievement-${index}`} />
              )
            })
          }
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="py-3 px-10 bg-blue-500 font-semibold text-white rounded-t-lg">Lượt đánh giá</span>
        </div>
        <div className="bg-white rounded-lg drop-shadow overflow-hidden py-5 px-10">
          {
            tutorDetail?.feedbacks.map((feedback: any, index: number) => {
              return (
                <Feedback key={`feedback-${index}`} data={feedback} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TutorDetailPage;