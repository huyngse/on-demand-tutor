import React, { useEffect, useState } from 'react';
import { getTutorDegrees } from '@/lib/api/tutor-api'; 
import AchievementCard from '@/pages/home/tutor-detail/AchievementCard';
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, MenuProps } from 'antd';
import { EllipsisVertical, ImageUp, Trash2 } from "lucide-react";


const TutorCertification = ({ tutorId }: any ) => {
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleDelete = () => {
    console.log("Delete success!");
}
  const items: MenuProps['items'] = [
    {
      label: "Cập nhật ảnh bằng cấp",
      key: 'update-pfp',
      icon: <ImageUp width={15} />,
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
        console.error('Error fetching degrees:', response.error);
      }
      setLoading(false);
    };

    fetchDegrees();
  }, []);

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
    </div>
  );
};

export default TutorCertification;
