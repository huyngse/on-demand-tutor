import { checkToken } from "@/lib/api/authentication-api";
import { Button } from "antd"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import AppAvartar from "./AppAvartar";

const Navbar = () => {
    const [loggedUser, setLoggedUser] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await checkToken();
            setLoggedUser(data);
        }
        fetchData();
    }, []);

    return (
        <div className="flex justify-between px-5 py-3 shadow">
            <div className="flex items-center gap-5">
                <div className="text-xl font-bold me-5">
                    <Link to="/">
                        On<span className="text-blue-600">Demand</span>Tutor
                    </Link>
                </div>
                <div className="font-semibold text-base flex gap-5 hover:underline">
                    <Link to="/tutor-list">
                        Danh sách gia sư
                    </Link>
                </div>
                <div className="font-semibold text-base flex gap-5 hover:underline">
                    <Link to="/class-list">
                        Danh sách lớp học
                    </Link>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                {
                    loggedUser ? (
                        <AppAvartar user={loggedUser}/>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button>Đăng nhập</Button>
                            </Link>
                            <Link to="/register">
                                <Button type="primary">Đăng ký</Button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar