import { useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, MenuProps } from "antd";
import { Pencil, EllipsisVertical, ImageUp } from "lucide-react";
import { getUserById } from "@/lib/api/user-api";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/dateUtil";
import UpdateAvatarModal from "@/pages/tutor/profile/UpdateAvatarModal";
import useRerender from "@/hooks/useRerender";


const StudentProfilePage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  const [studentDetail, setStudentDetail] = useState<any>();
  const { renderKey, rerender } = useRerender();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchStudentDetails = async () => {
      const { error, data } = await getUserById(loggedUser.userId);
      if (error) {
        toast.error("loi");
      } else {
        setStudentDetail(data);
      }
    };
    if (loggedUser) {
      fetchStudentDetails();
    }
  }, [loggedUser, renderKey]);

  const items: MenuProps['items'] = [
    {
      label: "Cập nhật ảnh đại diện",
      key: 'update-pfp',
      icon: <ImageUp width={15} />,
      onClick: () => { showModal() },
    },
    {
      label: "Chỉnh sửa thông tin cá nhân",
      key: 'update-profile',
      icon: <Pencil width={15} />,
      onClick: () => { navigate("/student/profile/edit") }
    }
  ];
  if (loggedUser == null) return;
  if (studentDetail == null) return;
  return (
    <div>
      <div className="bg-white drop-shadow p-3 rounded-lg flex gap-2 mb-2">
        <div className="overflow-hidden drop-shadow rounded-lg aspect-square w-[150px]">
          <img src={studentDetail.profileImage} alt="" className="w-full h-full object-cover" />
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
                    <Pencil />
                    Thông tin
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">
                  <div className="flex flex-col gap-2">
                    <span className="block">Họ và tên: {studentDetail.fullName}</span>
                    <span className="block">Số điện thoại: {studentDetail.phoneNumber}</span>
                    <span className="block">Email: {studentDetail.emailAddress}</span>
                    <span className="block">Ngày sinh: {formatDate(new Date(studentDetail.dateOfBirth))}</span>
                    <span className="block">Giới tính: {studentDetail.gender == "Male" ? "Nam" : "Nữ"}</span>
                    <span className="block">Địa chỉ: {`${studentDetail.ward}, 
                    ${studentDetail.district}, 
                    ${studentDetail.city}`}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <UpdateAvatarModal
        rerender={rerender}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default StudentProfilePage;