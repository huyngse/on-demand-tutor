import { Button } from "antd"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="flex justify-between px-5 py-3 sahdow">
            <div className="flex items-center">
                <div className="text-xl font-bold me-5">
                    <Link to="/">
                        Estate<span className="text-blue-600">Network</span>
                    </Link>
                </div>
                <div className="font-semibold text-base flex gap-5">
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