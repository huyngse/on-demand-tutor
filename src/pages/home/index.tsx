import { Roles } from "@/constants/roles";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const loggedUser = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser) {
      localStorage.removeItem("accessToken");
    }
    if (loggedUser && loggedUser.role == Roles.Admin) {
      navigate("/admin/");
    }

  }, [loggedUser])

  return (
    <div className="">
      <div className="min-h-screen bg-blue-50 overflow-x-hidden">
        <main>
          <section className="bg-blue-200 text-white py-32 relative flex flex-col lg:flex-row gap-4">
            <div className="absolute inset-0 flex ">
              <div className="relative">
                <div className="bg-[rgb(116,168,218)] w-[400px] h-full transform skew-x-12 -ml-24">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#a3cdf5] w-[200px] h-full transform skew-x-12 -ml-24">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#c4e2fd] w-[100px] h-full transform skew-x-12">
                </div>
              </div>
            </div>
            <div className="container mx-auto text-center relative z-10  animate-fade-down">
              <h2 className="text-4xl font-bold mb-8">
                Tìm Gia Sư Hoàn Hảo Cho Bạn Ngay Hôm Nay
              </h2>
              <p className="text-xl mb-12">
                Các gia sư chuyên môn ở nhiều lĩnh vực khác nhau sẵn sàng giúp bạn
                đạt được mục tiêu học tập của mình.
              </p>
              <button className="bg-white text-blue-600 py-3 px-6 rounded-full text-lg font-bold">
                Bắt Đầu Ngay
              </button>
            </div>
            <img className="mr-4 relative" src="https://www.greatschools.org/gk/wp-content/uploads/2010/01/Looking-for-a-tutor.jpg" />

          </section>
          <section id="popular-tutors" className="relative">
            <div className="absolute inset-0 flex justify-end">
              <div className="relative">
                <div className="bg-[#deefff] w-[100px] h-full transform -skew-x-12">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#d6ebff] w-[300px] h-full transform -skew-x-12 -mr-48">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#c5e3ff] w-[400px] h-full transform -skew-x-12 -mr-48">
                </div>
              </div>
            </div>

            {/* <div className="relative mx-auto text-center py-20 w-10/12">
              <h2 className="text-3xl font-bold mb-10">Các Gia Sư Tiêu Biểu</h2>
              <div className="flex flex-wrap -mx-4">
                <div v-for="tutor in tutors" className="w-full lg:w-1/4 md:w-1/2 px-4 mb-8 transition duration-200 hover:scale-110">
                  <div className="bg-white rounded-lg shadow p-6">

                    <p className="mt-4 font-bold">{{ tutor.tutor.fullName }}</p>                <p className="flex justify-center my-2">

                    </p>
                    <p className="mt-2 italic">
                      {{ tutor.numberOfStudentclassName + tutor.numberOfBooker }} lượt đặt dạy
                    </p>
                    <button className="mt-3 bg-slate-50 text-blue-600 py-3 px-6 rounded-full text-lg font-bold">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
              <Link to={`/tutor-list`}>
                <button className="mt-3 bg-white hover:bg-slate-200 text-blue-600 py-3 px-12 rounded-full text-lg font-bold" >
                  Xem thêm gia sư
                </button>
              </Link>

            </div> */}
          </section>

          <section id="how-it-works" className=" py-20 relative">
            <div className="absolute inset-0 flex justify-end">
              <div className="relative">
                <div className="bg-[#d6ebff] w-[100px] h-full transform -skew-x-12">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#c5e3ff] w-[200px] h-full transform -skew-x-12 -ml-24">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#b5dbff] w-[400px] h-full transform -skew-x-12 -ml-24">
                </div>
              </div>
            </div>
            <div className="container mx-auto text-center relative">
              <h2 className="text-3xl font-bold mb-10">Cách Thức Hoạt Động</h2>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/3 px-4 mb-8 flex transition duration-200 hover:scale-110">
                  <div className="bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-bold mb-4 py-3 px-6 bg-blue-300 rounded-t-lg">1. Đăng ký</h3>
                    <p className="px-6 pb-6">
                      Tạo một tài khoản và nói cho chúng tôi biết về nhu cầu dạy kèm
                      của bạn.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8 flex transition duration-200 hover:scale-110">
                  <div className="bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-bold mb-4 py-3 px-6 bg-blue-300 rounded-t-lg">2. Chọn Gia Sư</h3>
                    <p className="px-6 pb-6">
                      Duyệt qua danh sách các gia sư có trình độ của chúng tôi và
                      chọn một gia sư phù hợp nhất với nhu cầu của bạn.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8 flex transition duration-200 hover:scale-110">
                  <div className="bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-bold mb-4 py-3 px-6 bg-blue-300 rounded-t-lg">3. Bắt Đầu Học</h3>
                    <p className="px-6 pb-6">
                      Lên lịch buổi học đầu tiên và bắt đầu quá trình chinh phục mục
                      tiêu học tập của bạn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>



          <section id="how-to-tutor" className="bg-blue-100 py-20 relative">
            <div className="absolute inset-0 flex justify-start">
              <div className="relative">
                <div className="bg-[#c5e3ff] w-[400px] h-full transform skew-x-12 -mr-48">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#d6ebff] w-[300px] h-full transform skew-x-12 -mr-48">
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#deefff] w-[100px] h-full transform skew-x-12">
                </div>
              </div>
            </div>
            <div className="container mx-auto text-center relative">
              <h2 className="text-3xl font-bold mb-10">Bạn Muốn Trở Thành Gia Sư?</h2>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/3 px-4 mb-8 flex transition duration-200 hover:scale-110">
                  <div className="bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-bold mb-4 py-3 px-6 bg-blue-300 rounded-t-lg ">1. Tạo tài khoản</h3>
                    <p className="px-6 pb-6">
                      Tạo một tài khoản gia sư và cung cấp các loại bằng cấp của
                      bạn.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8 flex transition duration-200 hover:scale-110">
                  <div className="bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-bold mb-4 py-3 px-6 bg-blue-300 rounded-t-lg ">2. Cập nhật hồ sơ</h3>
                    <p className="px-6 pb-6">
                      Quảng bá chuyên môn và dịch vụ học tập của bạn bằng các video
                      học tập để thu hút học viên. Họ sẽ tìm đến bạn và đăng ký học
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8 flex transition duration-200 hover:scale-110">
                  <div className="bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-bold mb-4 py-3 px-6 bg-blue-300 rounded-t-lg ">3. Bắt Đầu Dạy</h3>
                    <p className="px-6 pb-6">Bắt đầu làm việc dựa trên lịch dạy của bạn</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default HomePage;