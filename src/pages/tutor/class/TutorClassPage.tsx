import { useAppSelector } from "@/hooks/useRedux";
import { getClassesByTutorId } from "@/lib/api/class-api";
import { useEffect, useState } from "react";
import Datatable from "./Datatable";
import { Button } from "antd";
import { SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TutorClassPage = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (loggedUser) {
        const result = await getClassesByTutorId(loggedUser.id);
        if (result.data) {
          setClasses(result.data);
        }
      }
    }
    fetchData();
  }, [loggedUser]);
  const handleCreateClass = () => {
    navigate("/tutor/class/create");
  }
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-xl">Danh sách lớp học</h1>
        <Button
          type="primary"
          icon={<SquarePlus width={15} height={15} className="m-0" />}
          className="flex items-center"
          onClick={handleCreateClass}
        >
          Tạo lớp mới
        </Button>
        {/* <CreateAccountButton /> */}
      </div>
      {
        classes && <Datatable dataSource={classes} />
      }
    </div>
  )
}

export default TutorClassPage