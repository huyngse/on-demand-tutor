import { LoaderIcon } from "lucide-react"

const Loader = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
        <LoaderIcon className="animate-spin-slow"/>
    </div>
  )
}

export default Loader