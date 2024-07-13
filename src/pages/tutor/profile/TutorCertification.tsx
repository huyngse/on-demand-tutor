import React, { useEffect, useState } from 'react';
import { getTutorDegrees } from '@/lib/api/tutor-api'; 
import AchievementCard from '@/pages/home/tutor-detail/AchievementCard';
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, MenuProps } from 'antd';
import { EllipsisVertical, ImageUp, Trash2 } from "lucide-react";
import UpdateAvatarModal from "./UpdateAvatarModal";
import useRerender from "@/hooks/useRerender";


const TutorCertification = ({ tutorId }: any ) => {
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleDelete = () => {
    console.log("Delete success!");
}
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

  const items: MenuProps['items'] = [
    {
      label: "Cập nhật ảnh bằng cấp",
      key: 'update-pfp',
      icon: <ImageUp width={15} />,
      onClick: () => { showModal() }
    },
    {
      label: <div className="text-red-500 ">Gỡ ảnh bằng cấp</div>,
      key: '3',
      onClick: handleDelete,
      icon: <Trash2 width={15} color="red"/>,
      disabled: false,
  }
  ]

  useEffect(() => {
    const fetchDegrees = async () => {
      const response = await getTutorDegrees(tutorId);
      if (response.data) {
        setDegrees(response.data);
      } else {
        console.error('Lấy thông tin bằng cấp thất bại!:', response.error);
      }
      setLoading(false);
    };

    fetchDegrees();
  }, [tutorId, renderKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Tutor Degrees</h1>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="default" shape="circle" icon={<EllipsisVertical width={15} />} className="me-3" />
          </Dropdown>
      <div className="grid grid-cols-1 gap-4">
        {degrees.map((degree) => (
          <AchievementCard key={degree} data={degree} />
        ))}
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

export default TutorCertification;
