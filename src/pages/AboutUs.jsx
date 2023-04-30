import Cookies from "js-cookie"

export default function AboutUs() {
  const name = Cookies.get('name')
  return (
    <div >
      <div className="container mx-auto bg-gray-100 my-16">
        <section className="ms_vh">
          <h2 className="text-4xl text-center pt-10 font-semibold text-slate-900 ms_title_detail">About us</h2>
          { name }

        </section>
      </div>
    </div>
  )
}
