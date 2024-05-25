import { useAppSelector } from "@/hooks/useRedux";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
    roles: string[];
    children: ReactNode;
}
const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(loggedUser && roles.includes(loggedUser?.role))) {
            navigate("/");
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute