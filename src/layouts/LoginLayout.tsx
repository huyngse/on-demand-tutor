import { ReactNode } from "react"
import LoginBackgroundImage from "@/assets/images/school-tools.png";
import { Link } from "react-router-dom";
type LoginLayoutProps = {
    children: ReactNode
}
const LoginLayout = ({ children }: LoginLayoutProps) => {
    return (
        <div className="min-h-[100vh] flex flex-col">
            <div className="grid grid-cols-12 bg-blue-300">
                <div className="col-span-5 px-10 flex flex-col justify-center">
                    <img src={LoginBackgroundImage}/>
                    <Link to="/">
                        <h1 className="text-4xl font-bold">
                            On<span className="text-blue-600">Demand</span>Tutor
                        </h1>
                        <p className="font-bold">
                            Xin chào bạn
                        </p>
                    </Link>
                    {/* <h5 className="text-white italic font-semibold text-xl bottom-11 z-10">Khai phá tiềm năng của bạn với dịch vụ dạy kèm theo yêu cầu!</h5> */}
                </div>
                <div className="col-span-7 ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LoginLayout