import TiptapView from "@/components/tiptap/TiptapView";
import { useAppSelector } from "@/hooks/useRedux"
import { getTutorByAccountId } from "@/lib/api/tutor-api";
import AchievementCard from "@/pages/home/tutor-detail/AchievementCard";
import Feedback from "@/pages/home/tutor-detail/Feedback";
import { formatNumberWithCommas } from "@/utils/numberUtil";
import { Button, Dropdown, MenuProps, Tooltip } from "antd";
import { Album, BookText, BriefcaseBusiness, EllipsisVertical, ImageUp, MapPin, Pencil, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TutorProfilePage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: "Cập nhật ảnh đại diện",
      key: 'update-pfp',
      icon: <ImageUp width={15}/>,
    },
    {
      label: "Chỉnh sửa thông tin cá nhân",
      key: 'update-profile',
      icon: <Pencil width={15} />,
      onClick: () => {navigate("/tutor/profile/edit")}
    },
    {
      label: "Quản lí hình ảnh bằng cấp",
      key: 'manage-certification',
      icon: <Album width={15} />,
      onClick: () => {navigate("/tutor/certification")}
    },
  ];
  const [tutorDetail, setTutorDetail] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTutorByAccountId(loggedUser.id);
      if (result.data) {
        setTutorDetail(result.data);
      }
    }
    fetchData();
  }, [])

  return (
    <div>
      <div className="bg-white drop-shadow p-3 rounded-lg flex gap-2 mb-2">
        <div className="overflow-hidden drop-shadow rounded-lg aspect-square w-[150px]">
          <img src={tutorDetail?.profilePicUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">
              {loggedUser.fullName}
            </h2>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} className="me-3" />
            </Dropdown>
          </div>

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
        </div>
      </div>
      <div className="bg-white drop-shadow p-3 rounded-lg mb-2">
        <h4 className="font-semibold  text-2xl">
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
      </div>
      <div className="bg-white drop-shadow p-3 rounded-lg mb-2">
        <div className="flex justify-between">
          <h4 className="font-semibold  text-2xl">
            Lịch dạy gia sư
          </h4>
          <Tooltip title="Thay đổi lịch dạy">
            <Button type="default" shape="circle" icon={<Pencil width={15} />} className="me-3" />
          </Tooltip>
        </div>

        <div className="grid grid-cols-12">
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
      <div className="bg-white drop-shadow p-3 rounded-lg mb-2">
        <h4 className="font-semibold  text-2xl mb-2">
          Hình ảnh hoạt động dạy học/thành tích
        </h4>
        <div className="grid grid-cols-4 gap-3">
          {
            tutorDetail?.achievements.map((achieve: any, index: number) => {
              return (
                <AchievementCard data={achieve} key={`achievement-${index}`} />
              )
            })
          }
        </div>
      </div>
      <div className="bg-white drop-shadow p-3 rounded-lg">
        <h4 className="font-semibold  text-2xl mb-2">
          Lượt đánh giá
        </h4>
        {
          tutorDetail?.feedbacks.map((feedback: any, index: number) => {
            return (
              <Feedback key={`feedback-${index}`} data={feedback} />
            )
          })
        }
      </div>
    </div>
  )
}

export default TutorProfilePage