import { getAllAccounts } from "@/lib/api/account-api";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import CreateAccountButton from "./CreateAccountButton";
import { toast } from "react-toastify";

const AdminManageAccountPage = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAccounts();
      if (result.error) {
        toast.error("Lấy thông tin thất bại");
      } else {
        setAccounts(result.data);
      }
    }
    fetchData();
  }, [])

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-xl">Quản lí tài khoản</h1>
        <CreateAccountButton />
      </div>
      {
        accounts && <DataTable dataSource={accounts} />
      }
    </div>
  )
}

export default AdminManageAccountPage;