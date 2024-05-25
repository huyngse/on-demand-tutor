import { useAppSelector } from "@/hooks/useRedux";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
    roles: string[];
    children: ReactNode;
}
const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const navigate = useNavigate();
    if (!(loggedUser && roles.includes(loggedUser.role))) {
        navigate("/");
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute