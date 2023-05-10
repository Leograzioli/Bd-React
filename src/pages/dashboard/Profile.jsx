import Cookies from "js-cookie";
import Doc from "../../assets/doc-2.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const token = Cookies.get('token')
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getProfile = () => {

    setIsLoading(true)

    const headers = {
      Authorization: `Bearer ${token}`
    }

    axios.get('http://127.0.0.1:8000/api/auth/user', { headers })
      .then(resp => {
        setUser(resp.data.user);

      })
      .catch(err => {
        console.log(err);

      }).finally(() => {
        setIsLoading()

      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <section id="profile" >
        <h2 className="text-3xl font-semibold">Profile</h2>

        {!isLoading && <div className="mt-8 md:flex">

          {/* left profile */}
          <div className="bg-white border border-gray-200 md:max-w-[350px] rounded-md py-10 px-4 md:px-10 mr-0 md:mr-4 flex flex-col items-center">

            {/* profile picture */}
            <img className="min-w-[310px] min-h-[310px] max-w-[310px] rounded-full object-cover" src={Doc} alt="" />

            <div className="mt-10 text-md">
              <p className="font-semibold"><i className="fa-solid fa-envelope"></i> {user.email}</p>
              {user.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-phone"></i> {user.user_detail.phone}</p>}
              {user.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-syringe"></i> {user.user_detail.performance}</p>}
              {user.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-house"></i> {user.user_detail.address}</p>}
            </div>
          </div>

          {/* right profile */}
          <div className="bg-white border w-full border-gray-200 rounded-md p-4 sm:px-10 mt-4 md:mt-0">
            <h2 className="text-5xl text-center font-bold">{user.name}</h2>
            {user.specializations && user.specializations.map((spec) => {
              return (
                <div key={user.id} className="text-center mt-2">
                  <h4 className="text-xl font-semibold">#{spec.title}</h4>
                </div>
              )
            })}

            <h4 className="text-3xl font-semibold mt-6">About me</h4>
            {user.user_detail && <p className="mt-1">{user.user_detail.description}</p>}

          </div>
        </div>}
      </section>
    </>
  )
}
