import { Button } from "antd"
import { Link } from "react-router-dom"

const Navbar = () => {
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
            <div className="flex gap-5 items-center">
                <Link to="/login">
                    <Button>Đăng nhập</Button>
                </Link>
                <Link to="/register">
                    <Button type="primary">Đăng ký</Button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar