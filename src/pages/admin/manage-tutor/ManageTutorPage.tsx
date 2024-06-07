import { getAllTutors } from "@/lib/api/tutor-api";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";

const ManageTutorPage = () => {
  const [tutors, setTutors] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      const tutorsResult = await getAllTutors();
      if (tutorsResult.data != null) {
        setTutors(tutorsResult.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-xl">Quản lí gia sư</h1>
      </div>
      {
        tutors && (
          <DataTable dataSource={tutors} />
        )
      }
    </div>
  )
}

export default ManageTutorPage