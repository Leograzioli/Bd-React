import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AppRegister() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/auth/register', {
            name,
            email,
            password,
            password_confirmation
        }).then(resp => {
            console.log(resp.data);
            if (resp.data.status) {
                Cookies.set('token', resp.data.token, { expires: 1 / 24 })
                Cookies.set('userName', resp.data.user.name, { expires: 1 / 24 } )
                navigate('/')
            }
        })
    }

    return (
        <>
            <section>
                <div className="container mx-auto h-[calc(100vh-60px)] flex justify-center items-center">
                    <div className="w-[400px] bg-blue-200 rounded-md">

                        <form onSubmit={handleSubmit} className="flex flex-col py-8 px-12">
                            <div className="mt-3 mx-auto w-full">
                                <label htmlFor="">
                                    <div className="text-xl">name: </div>
                                    <input onChange={(e) => { setName(e.target.value) }} name="name" type="text" className="rounded-md py-2 px-4 w-full mt-1" />
                                </label>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="">
                                    <div className="text-xl">email: </div>
                                    <input onChange={(e) => { setEmail(e.target.value) }} name="email" type="email"  className="rounded-md py-2 px-4 w-full mt-1"/>
                                </label>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="">
                                    <div className="text-xl">password: </div>
                                    <input onChange={(e) => { setPassword(e.target.value) }} name="password" type="password"  className="rounded-md py-2 px-4 w-full mt-1"/>
                                </label>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="">
                                    <div className="text-xl">password: </div>
                                    <input onChange={(e) => { setPassword_confirmation(e.target.value) }} name="password" type="password"  className="rounded-md py-2 px-4 w-full mt-1"/>
                                </label>
                            </div>

                            <Link to={'/login'} className="mx-auto mt-2 text-sm underline text-blue-700">already registered?</Link>

                            <button className="mt-6 bg-white rounded-md py-1 w-1/3 mx-auto font-semibold">Register</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
