import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { getAllTutors } from "@/lib/api/user-api";

const ManageTutorPage = () => {
  const [tutors, setTutors] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      const tutorsResult = await getAllTutors();
      if (tutorsResult.data != null) {
        const tableData = tutorsResult.data.map((x: any) => {
          var income = 0;
          x.bookings.forEach((b: any) => {
            if (b.status == "Ended") {
              income += b.classFee;
            }
          });
          return {
            userId: x.userId,
            fullName: x.fullName,
            emailAddress: x.emailAddress,
            city: x.city,
            numOfClass: x.classes.length,
            income: income
          }
        })
        setTutors(tableData);
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