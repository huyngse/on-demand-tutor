import { setLoggedUser } from "@/lib/redux/userSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthentication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('loggedUser');
        localStorage.removeItem('accessToken');
        dispatch(setLoggedUser(null));
        navigate("/login");
    }
    return { logout };
}

export default useAuthentication