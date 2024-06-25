import { useAppSelector } from "@/hooks/useRedux";
import { getAllClass } from "@/lib/api/class-api";
import { useEffect, useState } from "react";
import Datatable from "./Datatable";
import { Button } from "antd";
import { SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { getTutorBooking } from "@/lib/api/booking-api";

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
      const classesResult = await getAllClass();
      if (classesResult.error) {
        toast.error("Lấy danh sách lớp thất bại", {
          toastId: 'error_tutorClassList',
        });
      } else {
        const bookingResult = await getTutorBooking(loggedUser.userId);
        if (bookingResult.error) {
          toast.error("Lấy thông tin đặt lớp thất bại!", {
            toastId: 'error_tutorAvatarBooking',
          });
        } else {
          const filteredBookings = bookingResult.data.filter((booking: any) => booking.status == "Pending");
          const filteredListClass = classesResult.data.filter((c: any) => c.tutorId == loggedUser.userId);
          const tableData = filteredListClass.map((_class: any) => {
            let numOfBooking = 0;
            filteredBookings.forEach((booking: any) => {
              if (booking.class.classId == _class.classId) {
                numOfBooking++;
              }
            });
            return {
              classId: _class.classId,
              className: _class.className,
              classLevel: _class.classLevel,
              classMethod: _class.classMethod,
              classFee: _class.classFee,
              active: _class.active,
              numOfBooking: numOfBooking
            }
          })
          console.log(tableData);
          setClasses(tableData);
        }
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