import { ReactNode } from "react"

type MainLayoutProps = {
    children: ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-[100vh] flex flex-col">
            <div className="min-h-10 border border-b">Header</div>
            <div className="flex flex-1">
                <div className="min-w-80 border border-b">Sidebar</div>
                {children}
            </div>
            <div className="min-h-10 border border-b">Footer</div>
        </div>
    )
}

export default MainLayout