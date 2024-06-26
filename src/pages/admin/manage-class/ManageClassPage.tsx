import { getAllClass } from "@/lib/api/class-api";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";

const ManageClassPage = () => {
  const [classes, setClasses] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      const classResult = await getAllClass();
      if (classResult.data != null) {
        setClasses(classResult.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-xl">Quản lí lớp học</h1>
      </div>
      {
        classes && (
          <DataTable dataSource={classes} />
        )
      }
    </div>
  )
}

export default ManageClassPage