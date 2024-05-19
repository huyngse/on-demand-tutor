import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'
type AdminLayoutProps = {
    children: ReactNode
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="min-h-[100vh] flex flex-col">
            <div className="min-h-10 border border-b">
                <Navbar />
            </div>
            <div className="flex flex-1">
                <div className="min-w-80 border border-b">Sidebar</div>
                {children}
            </div>
            <div className="min-h-10 border border-b">Footer</div>
        </div>
    )
}

export default AdminLayout