
const TutorDashboardPage = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Lớp đã tạo</p>
          <p className="text-5xl">
            {0}
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Lớp đang dạy</p>
          <p className="text-5xl">
            {0}
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Số Lượt đặt lịch dạy</p>
          <p className="text-5xl">
            {0}
          </p>
        </div>
      </div>
      <div className="col-span-8">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Lượt đặt lịch học gần đây</p>
          <p className="text-5xl">
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="p-3 rounded-lg drop-shadow bg-white flex flex-col items-center justify-center h-[170px]">
          <p className="text-xl mb-3">Số lời mời dạy</p>
          <p className="text-5xl">
            {0}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TutorDashboardPage