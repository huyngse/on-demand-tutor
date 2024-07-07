import React, { useEffect, useState } from 'react';
import { getTutorDegrees } from '@/lib/api/tutor-api'; 
import AchievementCard from '@/pages/home/tutor-detail/AchievementCard';


const TutorCertification = ({ tutorId }: any ) => {
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-4xl font-bold mb-4">Tutor Degrees</h1>
      <div className="grid grid-cols-1 gap-4">
        {degrees.map((degree) => (
          <AchievementCard key={degree} data={degree} />
        ))}
      </div>
    </div>
  );
};

export default TutorCertification;
