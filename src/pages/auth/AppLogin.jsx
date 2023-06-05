import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function AppLogin() {
    const [email, setEmail] = useState('mariorossi@gmail.com')
    const [password, setPassword] = useState('123123123')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        axios.post('http://127.0.0.1:8000/api/auth/login', {
            email,
            password

        }).then(resp => {

            if (resp.data.status) {
                navigate('/adm')
                Cookies.set('token', resp.data.token, { expires: 1 / 24 })
                Cookies.set('userName', resp.data.user.name, { expires: 1 / 24 } )
            }

        }).catch(err => {

            setErrors(err.response.data.error);

        }).finally( () => {

            setLoading(false)
        } )
    }

    return (
        <>
            <section>
                <div className="container mx-auto h-[calc(100vh-60px)] flex justify-center items-center">

                    <div className="w-[400px] bg-blue-200 rounded-md">

                        <form onSubmit={handleSubmit} className="flex flex-col py-12 px-12">
                            <div className="mt-3 mx-auto w-full">
                                <label >
                                    <div className="text-xl">Email</div>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className={`${errors.email? 'border-2 border-red-500' : ''} rounded-md py-2 px-4 w-full mt-1`} />
                                    {errors.email && errors.email.map( err => (
                                        <span key={err} className="text-red-500 text-sm">-{err}</span>
                                    ))}
                                </label>
                            </div>
                            <div className="mt-3 mx-auto w-full">
                                <label >
                                    <div className="text-xl">Password</div>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className={`${errors.password? 'border-2 border-red-500' : ''} rounded-md py-2 px-4 w-full mt-1`} />
                                    {errors.password && errors.password.map( err => (
                                        <span key={err} className="text-red-500 text-sm">-{err}</span>
                                    ))}
                                </label>
                            </div>

                            <Link to={'/register'} className="mx-auto mt-4 text-sm underline text-blue-700">Not registered yet?</Link>

                            <button className="mt-4 bg-white rounded-md py-1 w-1/3 mx-auto font-semibold">{loading? 'loading..' : 'Login'}</button>
                        </form>

                    </div>


                </div>

            </section>
        </>
    )
}
