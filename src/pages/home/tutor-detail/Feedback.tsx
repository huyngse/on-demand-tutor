import { formatDate } from "@/utils/dateUtil"
import { Dropdown, MenuProps } from "antd";
import { EllipsisVertical, Flag } from "lucide-react"
const items: MenuProps['items'] = [
    {
        label: <a href="https://www.google.com" className="flex gap-2 px-2"><Flag width={15}/>Báo cáo</a>,
        key: '0',
        disabled: true,
    },
];
const Feedback = ({ data }: any) => {
    return (
        <div>
            <p className="mb-2"><strong>{data.fullName}</strong> - {formatDate(new Date(data.createdDate))}</p>
            <div className="bg-gray-200 drop-shadow py-3 px-5 flex">
                <p className="flex-1">
                    {data.content}
                </p>
                <div>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <button className="aspect-square flex justify-center items-center w-5">
                            <EllipsisVertical width={15} />
                        </button>
                    </Dropdown>
                </div>
            </div>
        </div >
    )
}

export default Feedback