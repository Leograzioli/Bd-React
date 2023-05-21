import { Link, Route, Routes, useNavigate } from "react-router-dom"

import Profile from "./Profile"
import Messages from "./Messages"
import Feedback from "./Feedback"
import SingleMessage from "./SingleMessage"
import Logo from '../../assets/logo.jpg'
import Cookies from "js-cookie"

import axios from "axios"
import NavMenu from "../../components/NavMenu"

export default function DashboardLayout() {
    const token = Cookies.get('token')
    const navigate = useNavigate()
 


    const menuItem = [
        {
            title: 'dashboard',
            titleIcon: 'fa-solid fa-table-columns fa-sm mr-2',
            subMenu: ['messages', 'feedback']
        },
        {
            title: 'profile',
            titleIcon: 'fa-solid fa-user fa-sm mr-2',
            subMenu: ['edit']
        },
    ]



    //handle logout click
    const handleClick = (e) => {
        e.preventDefault()
        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.post('http://127.0.0.1:8000/api/auth/logout', {}, { headers }).then(resp => {
            console.log(resp);
            if (resp.data.status) {

                Cookies.remove('userName')

                setTimeout(() => {
                    Cookies.remove('token')
                    navigate('/login')
                }, 200);

            }
        })
    }

    return (
        <>
            <div className="flex">

                {/* Dashboard left menu */}
                <div className="w-[90px] sm:w-[310px] border-r border-t border-gray-200 h-screen">
                    <div className="hidden sm:flex py-3 items-center justify-center gap-x-2">
                        <img src={Logo} alt="logo" className="h-[35px]" />
                        <h1 className="text-xl font-bold">B Doctors</h1>
                    </div>

                    <div className="font-semibold flex flex-col mt-12 text-neutral-800">


                        {menuItem.map((item) => {
                            return (
                                <div key={item.title} ><NavMenu menu={item} /></div>
                            )
                        })}
                    </div>
                </div>

                {/* Dashboard content */}
                <div className=" w-full h-screen bg-blue-50 overflow-hidden">
                    <div className="bg-white border-b border-gray-200">

                        {/* Dashboard header */}
                        <div className="right-nav w-3/4 h-[60px] mx-auto flex justify-end items-center font-semibold capitalize">
                            <Link className="ml-3" to='/'>home</Link>
                            <Link className="ml-3" to='/about-us'>about-us</Link>
                            {!token && <Link className="ml-3" to='/login'>login</Link>}
                            {!token && <Link className="ml-3" to='/register'>register</Link>}

                            <div className=" py-2 ml-3 cursor-pointer">
                                <a onClick={(e) => { handleClick(e) }}>Logout</a>
                                <i className="fa-solid fa-arrow-right-from-bracket fa-xs ml-2"></i>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[1200px] mx-4 2xl:mx-auto mt-12">
                        <Routes>
                            <Route path="/profile/edit" element={<Profile />} />
                            <Route path="/dashboard/messages" element={<Messages />} />
                            <Route path="/dashboard/feedback" element={<Feedback />} />
                            <Route path="/messages/:id" element={<SingleMessage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}
