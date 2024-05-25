import { useAppSelector } from "@/hooks/useRedux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  if (loggedUser && loggedUser.role == "admin") {
    navigate("/admin/");
  }
  return (
    <div className="p-5">
      <h1 className="text-4xl font-semibold text-center">Trang Chủ</h1>
    </div>
  )
}

export default HomePage;