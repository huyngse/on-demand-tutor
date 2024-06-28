import { Roles } from "@/constants/roles";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser) {
      localStorage.removeItem("accessToken");
    }
    if (loggedUser && loggedUser.role == Roles.Admin) {
      navigate("/admin/");
    }
 
  }, [loggedUser])

  return (
    <div className="p-5">
      <h1 className="text-4xl font-semibold text-center">Trang Chủ</h1>
    </div>
  )
}

export default HomePage;