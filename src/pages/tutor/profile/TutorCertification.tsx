import { useEffect, useState } from 'react';
import { getTutorDegrees } from '@/lib/api/tutor-api';
import AchievementCard from '@/pages/home/tutor-detail/AchievementCard';
import { Button } from 'antd';
import { Upload } from "lucide-react";
import useRerender from "@/hooks/useRerender";
import UpdateCertiModal from './UpdateCertiModal';


const TutorCertification = ({ tutorId }: any) => {
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Button onClick={showModal} type='primary' icon={<Upload height={13} width={13} />}>Thêm ảnh bằng cấp</Button>
      <div className="grid grid-cols-1 gap-4">
        {degrees.map((degree) => (
          <AchievementCard key={degree} data={degree} />
        ))}
      </div>
      <UpdateCertiModal
        rerender={rerender}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default TutorCertification;
