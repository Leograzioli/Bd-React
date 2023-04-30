import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function AppLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/auth/login', {
            email,
            password

        }).then(resp => {

            if (resp.data.status) {
                navigate('/')
                Cookies.set('token', resp.data.token, { expires: 1 / 24 })
            }
        })
    }

    return (
        <>
            <section>
                <div className="container mx-auto h-[calc(100vh-80px)] flex justify-center items-center">

                    <div className="w-[400px] bg-blue-200 rounded-md">

                        <form onSubmit={handleSubmit} className="flex flex-col py-12 px-12">
                            <div className="mt-3 mx-auto w-full">
                                <label htmlFor="">
                                    <div className="text-xl">Email</div>
                                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="rounded-md py-2 px-4 w-full mt-1" />
                                </label>
                            </div>
                            <div className="mt-3 mx-auto w-full">
                                <label htmlFor="">
                                    <div className="text-xl">Password</div>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="rounded-md py-2 px-4 w-full mt-1" />
                                </label>
                            </div>

                            <Link to={'/register'} className="mx-auto mt-4 text-sm underline text-blue-700">Not registered yet?</Link>

                            <button className="mt-4 bg-white rounded-md py-1 w-1/3 mx-auto font-semibold">Login</button>
                        </form>

                    </div>


                </div>

            </section>
        </>
    )
}
