import { Spin } from "antd"
const Loader = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
        <Spin size="large" tip={"Đang tải"} ><div className="py-5 px-10 "></div></Spin>
    </div>
  )
}

export default Loader