import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AppRegister() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [specializations, setSpecializations] = useState([])
    const [specialization, setSpecialization] = useState(null)
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/auth/register', {
            name,
            email,
            specialization,
            password,
            password_confirmation
        }).then(resp => {
            console.log(resp.data);
            if (resp.data.status) {
                Cookies.set('token', resp.data.token, { expires: 1 / 24 })
                Cookies.set('userName', resp.data.user.name, { expires: 1 / 24 })
                navigate('/')
                toast.success('Account created successfully')
            }
        }).catch(err => {
            setErrors(err.response.data.error);
            console.log(err.response.data.error);

            for (let error in err.response.data.error) {
                if (err.response.data.error.hasOwnProperty(error)) {
                    toast(err.response.data.error[error][0]);
                }
            }

        })
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/guest/doctorslist').then(resp => {
            setSpecializations(resp.data.specializations);
        })
    }, [])

    return (
        <>
            <section>
                <div className="container mx-auto h-[calc(100vh-60px)] flex justify-center items-center">
                    <div className="w-[400px] bg-blue-200 rounded-md">

                        <form onSubmit={handleSubmit} className="flex flex-col py-8 px-12 capitalize">
                            <div className="mt-3 mx-auto w-full">
                                <label>
                                    <div className="text-xl">name* </div>
                                    <input placeholder="ex: Mario Bross" onChange={(e) => { setName(e.target.value) }} name="name" type="text" className={`${errors.name ? 'border-2 border-red-500' : ''} rounded-md py-2 px-4 w-full mt-1`} />
                                    {errors.name && errors.name.map(err => (
                                        <span key={err} className="text-red-500 text-xs">-{err}</span>
                                    ))}
                                </label>
                            </div>

                            <div className="mt-3">
                                <label>
                                    <div className="text-xl">email* </div>
                                    <input placeholder="ex: mariobross@gmail.com" onChange={(e) => { setEmail(e.target.value) }} name="email" type="email" className={`${errors.email ? 'border-2 border-red-500' : ''} rounded-md py-2 px-4 w-full mt-1`} />
                                    {errors.email && errors.email.map(err => (
                                        <span key={err} className="text-red-500 text-xs">-{err}</span>
                                    ))}
                                </label>
                            </div>

                            <div className="mt-3">
                                <label>
                                    <div className="text-xl">specialization*</div>
                                    <select onChange={(e) => { setSpecialization(e.target.value) }} className={`${errors.specialization ? 'border-2 border-red-500' : ''} rounded-md py-2 px-4 w-full mt-1`} name="" id="">
                                        <option value="">Choose an Specialization</option>
                                        {specializations && specializations.map((spec) => {
                                            return (
                                                <option key={spec.id} value={spec.id}>{spec.title}</option>
                                            )
                                        })}
                                    </select>
                                    {errors.specialization && errors.specialization.map(err => (
                                        <span key={err} className="text-red-500 text-xs">-{err}</span>
                                    ))}
                                </label>
                            </div>

                            <div className="mt-3">
                                <label>
                                    <div className="text-xl">password* </div>
                                    <input onChange={(e) => { setPassword(e.target.value) }} name="password" type="password" className={`${errors.password ? 'border-2 border-red-500' : ''} rounded-md py-2 px-4 w-full mt-1`} />
                                    {errors.password && errors.password.map(err => (
                                        <span key={err} className="text-red-500 text-xs">-{err}</span>
                                    ))}
                                </label>
                            </div>

                            <div className="mt-3">
                                <label>
                                    <div className="text-xl">password* </div>
                                    <input onChange={(e) => { setPassword_confirmation(e.target.value) }} name="password" type="password" className={`${errors.password ? 'border-2 border-red-500' : ''} rounded-md py-2 px-4 w-full mt-1`} />
                                    {errors.password && errors.password.map(err => (
                                        <span key={err} className="text-red-500 text-xs">-{err}</span>
                                    ))}
                                </label>
                            </div>

                            <Link to={'/login'} className="mx-auto mt-2 text-xs underline text-blue-700">already registered?</Link>
                            <button className="mt-6 bg-white rounded-md py-1 w-1/3 mx-auto font-semibold">Register</button>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
