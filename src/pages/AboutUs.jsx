import Cookies from "js-cookie"

export default function AboutUs() {
  const name = Cookies.get('name')
  return (
    <div >
      <div className="max-w-[1200px] h-screen mx-auto bg-gray-100 my-16">

        <h2 className="text-4xl text-center pt-10 font-semibold text-slate-900 ms_title_detail">About us</h2>
        {name}

      </div>
    </div>
  )
}
