import TiptapView from "@/components/tiptap/TiptapView";
import { useAppSelector } from "@/hooks/useRedux"
import { getAccountById } from "@/lib/api/account-api";
import AchievementCard from "@/pages/home/tutor-detail/AchievementCard";
import Feedback from "@/pages/home/tutor-detail/Feedback";
import { Button, Dropdown, MenuProps } from "antd";
import { Album, EllipsisVertical, ImageUp, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultPfp from "@/assets/images/default_profile_picture.jpg"

const TutorProfilePage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const [pfp, setPfp] = useState<string>();
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: "Cập nhật ảnh đại diện",
      key: 'update-pfp',
      icon: <ImageUp width={15} />,
    },
    {
      label: "Chỉnh sửa thông tin cá nhân",
      key: 'update-profile',
      icon: <Pencil width={15} />,
      onClick: () => { navigate("/tutor/profile/edit") }
    },
    {
      label: "Quản lí hình ảnh bằng cấp",
      key: 'manage-certification',
      icon: <Album width={15} />,
      onClick: () => { navigate("/tutor/certification") }
    },
  ];
  const [tutorDetail, setTutorDetail] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getAccountById(loggedUser.userId);
      if (error) {
        toast.error("Lấy thông tin thất bại!", {
          toastId: 'error_tutorProfile',
        });
      } else {
        setTutorDetail(data);
        setPfp(data.profileImage);
      }
    }
    if (loggedUser) {
      fetchData();
    }
  }, [loggedUser])
  if (!tutorDetail) return;
  return (
    <div>
      <div className="bg-white drop-shadow p-3 rounded-lg flex gap-5 mb-2">
        <div className="overflow-hidden drop-shadow rounded-lg aspect-square w-[200px]">
          <img src={pfp} alt="" className="w-full h-full object-cover" onError={() => { setPfp(DefaultPfp) }} />
        </div>
        <div className="flex justify-between flex-1">
          <h2 className="text-3xl font-bold">
            {loggedUser.fullName}
          </h2>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} className="me-3" />
          </Dropdown>
        </div>
      </div>
      <div className="bg-white drop-shadow p-3 rounded-lg mb-2">
        <h4 className="font-semibold  text-2xl">
          Thông tin cơ bản
        </h4>
        {
          tutorDetail && <TiptapView content={tutorDetail?.basicInfo} />
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
          Địa chỉ
        </h4>
        <p>
          {tutorDetail?.street}, {tutorDetail?.ward}, {tutorDetail?.district}, {tutorDetail?.city}
        </p>
      </div>
      <div className="bg-white drop-shadow p-3 rounded-lg mb-2">
        <h4 className="font-semibold  text-2xl mb-2">
          Hình ảnh hoạt động dạy học/thành tích
        </h4>
        {
          !tutorDetail.achievements && (<div>Chưa có hình ảnh hoạt động dạy học/thành tích nào</div>)
        }
        <div className="grid grid-cols-4 gap-3">
          {
            tutorDetail.achievements?.map((achieve: any, index: number) => {
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
          !tutorDetail.feedbacks && (<div>Chưa có lượt đánh giá nào</div>)
        }
        {
          tutorDetail.feedbacks?.map((feedback: any, index: number) => {
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