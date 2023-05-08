import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function AppLogin() {
    const [email, setEmail] = useState('mariorossi@gmail.com')
    const [password, setPassword] = useState('123123123')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/auth/login', {
            email,
            password

        }).then(resp => {
            console.log(resp.data);
            if (resp.data.status) {
                navigate('/dashboard')
                Cookies.set('token', resp.data.token, { expires: 1 / 24 })
                Cookies.set('userName', resp.data.user.name, { expires: 1 / 24 } )
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
                                    <input onChange={(e) => setEmail(e.target.value)} value={'mariorossi@gmail.com'} type="text" className="rounded-md py-2 px-4 w-full mt-1" />
                                </label>
                            </div>
                            <div className="mt-3 mx-auto w-full">
                                <label htmlFor="">
                                    <div className="text-xl">Password</div>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" value={"123123123"} className="rounded-md py-2 px-4 w-full mt-1" />
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
