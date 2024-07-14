import TiptapView from "@/components/tiptap/TiptapView";
import { Button } from "antd";
import { Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AchievementCard from "./AchievementCard";
import { getTutorbyId } from "@/lib/api/user-api";
import Loader from "@/components/Loader";
import { formatDate } from "@/utils/dateUtil";
import ClassCard from "./ClassCard";
import { getClassesByTutorId } from "@/lib/api/class-api";
import { toast } from "react-toastify";
import DefaultProfileImage from "@/assets/images/default_profile_picture.jpg";

const TutorDetailPage = () => {
  const [tutorDetail, setTutorDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pfp, setPfp] = useState<string>("");

  let { tutorId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (tutorId) {
        setIsLoading(true);
        const result = await getTutorbyId(parseInt(tutorId));
        const classResult = await getClassesByTutorId(parseInt(tutorId));
        if (result.error || classResult.error) {
          toast.error("Lấy thông tin thất bại");
        } else {
          if (classResult.data && result.data) {
            const detail = result.data;
            detail.classes = classResult.data.filter((c: any) => c.active == true);
            setTutorDetail(detail);
            setPfp(result.data.profileImage);
          }
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])
  if (isLoading) return <Loader />;
  if (!tutorDetail) return;
  return (
    <div className="bg-gray-100 px-5 flex flex-col gap-10 pb-10">
      <div className="bg-white rounded-lg drop-shadow overflow-hidden">
        <div className="bg-blue-500 p-5 pt-40  grid grid-cols-12">
          <div className="col-span-2">
          </div>
          <div className="col-span-10 px-10 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h2 className="text-white font-bold text-4xl">{tutorDetail.fullName}</h2>
              {/* <span className="bg-green-500 rounded-full w-[14px] h-[14px] flex justify-center items-center text-white">
                <Check width={10} height={10} />
              </span> */}
            </div>
            <Button type="default" shape="circle" icon={<Flag width={15} />} disabled />
          </div>
        </div>
        <div className="py-3 px-14 grid grid-cols-12 gap-5">
          <div className="col-span-2 -translate-y-32">
            <div className="overflow-hidden drop-shadow rounded-lg aspect-square">
              <img src={pfp} onError={() => { setPfp(DefaultProfileImage) }} alt="" className="w-full h-full object-cover" />
            </div>
            <table className="w-full border-r border-r-gray-300 mt-2">
              <tbody>
                <tr >
                  <th scope="row" className="text-start py-2">
                    Lớp đã tạo:
                  </th>
                  <td className="text-end pe-2">{tutorDetail.classes.length}</td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    Lượt đánh giá:
                  </th>
                  <td className="text-end  pe-2">0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-span-10 overflow-hidden">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <p>
                <span className="font-semibold">Số điện thoại: </span> {tutorDetail.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Email: </span> {tutorDetail.emailAddress}
              </p>
              <p>
                <span className="font-semibold">Ngày sinh: </span> {formatDate(new Date(tutorDetail.dateOfBirth))}
              </p>
              <p>
                <span className="font-semibold">Giới tính: </span> {tutorDetail.gender == "Male" ? "Nam" : "Nữ"}
              </p>
              <p>
                <span className="font-semibold">Địa chỉ: </span>  {tutorDetail?.street && tutorDetail?.street + ", "} {tutorDetail?.ward}, {tutorDetail?.district}, {tutorDetail?.city}
              </p>
              <p>
                <span className="font-semibold">Nghề nghiệp: </span>  {tutorDetail?.tutorType}
              </p>
            </div>
            <h4 className="font-semibold  text-2xl mt-3">
              Thông tin cơ bản
            </h4>
            {
              tutorDetail && <TiptapView content={tutorDetail.tutorDescription} />
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="py-3 px-10 bg-blue-500 font-semibold text-white rounded-t-lg">Hình ảnh hoạt động dạy học/thành tích</span>
        </div>
        <div className="bg-white rounded-lg drop-shadow overflow-hidden py-5 px-10">
          {
            !tutorDetail.achievements && (<div>Chưa có hình ảnh hoạt động dạy học/thành tích nào</div>)
          }
          <div className="flex overflow-auto gap-3">
            {
              tutorDetail.achievements?.map((achieve: any, index: number) => {
                return (
                  <AchievementCard data={achieve} key={`achievement-${index}`} />
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="py-3 px-10 bg-blue-500 font-semibold text-white rounded-t-lg">Lớp đã tạo</span>
        </div>
        <div className="bg-white rounded-lg drop-shadow overflow-hidden py-5 px-10">
          {
            !tutorDetail.classes || tutorDetail.classes.length == 0 && (<div>Chưa có lớp nào đang mở</div>)
          }
          <div className="flex gap-3 overflow-auto">
            {
              tutorDetail.classes?.map((_class: any, index: number) => {
                return (
                  <ClassCard classData={_class} key={`class-${index}`} />
                )
              })
            }
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
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
      </div> */}
    </div>
  )
}

export default TutorDetailPage;