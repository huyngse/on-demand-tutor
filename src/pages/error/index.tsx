import _404Monkey from "@/assets/images/404monkey.webp";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <img src={_404Monkey} alt="" width={"20%"}/>
      Oops! Something went wrong
    </div>
  )
}

export default ErrorPage;