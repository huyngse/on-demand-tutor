import { useAppSelector } from "@/hooks/useRedux";
import { checkToken } from "@/lib/api/authentication-api";
import { setLoggedUser } from "@/lib/redux/userSlice";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
    roles: string[];
    children: ReactNode;
}
const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await checkToken();
            dispatch(setLoggedUser(data));
            if (!(data && roles.includes(data?.role))) {
                navigate("/");
            }
        }
        fetchData();

    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute