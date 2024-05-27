import Navbar from "@/components/Navbar"
import { checkToken } from "@/lib/api/authentication-api"
import { setLoggedUser } from "@/lib/redux/userSlice"
import { ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"

type MainLayoutProps = {
    children: ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await checkToken();
            dispatch(setLoggedUser(data));
        }
        fetchData();
    }, []);
    return (
        <div className="min-h-[100vh] flex flex-col">
            <div className="min-h-10 border border-b">
                <Navbar />
            </div>
            <div className="flex-1">
                {children}
            </div>
            <div className="min-h-10 border border-b p-3 text-center">OnDemandTutor ©{new Date().getFullYear()} - SWP391</div>
        </div>
    )
}

export default MainLayout