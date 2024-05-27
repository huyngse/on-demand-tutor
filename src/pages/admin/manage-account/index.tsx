import { getAllAccounts } from "@/lib/api/account-api";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { Button } from "antd";
import { SquarePlus } from "lucide-react";
import CreateAccountButton from "./CreateAccountButton";

const AdminManageAccountPage = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAccounts();
      if (result.data) {
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