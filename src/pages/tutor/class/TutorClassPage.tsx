import { useAppSelector } from "@/hooks/useRedux";
import { getAllClass } from "@/lib/api/class-api";
import { useEffect, useState } from "react";
import Datatable from "./Datatable";
import { Button } from "antd";
import { SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const TutorClassPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [renderKey, setRenderKey] = useState(0);
  const rerender = () => {
    setRenderKey(renderKey + 1);
  }
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await getAllClass();
      if (error) {
        toast.error("Lấy thông tin thất bại");
      } else {
        const filteredListClass = data.filter((c: any) => c.tutorId == loggedUser.userId);
        setClasses(filteredListClass);
      }
      setIsLoading(false);
    }
    if (loggedUser) {
      fetchData();
    }
  }, [loggedUser, renderKey]);


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
        !isLoading &&
          classes ? <Datatable dataSource={classes} rerender={rerender} /> : <Loader />
      }
    </div>
  )
}

export default TutorClassPage