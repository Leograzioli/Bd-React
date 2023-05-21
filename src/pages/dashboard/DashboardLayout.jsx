import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"

import Profile from "./Profile"
import Messages from "./Messages"
import Feedback from "./Feedback"
import Dashboard from "./Dashboard"
import SingleMessage from "./SingleMessage"
import Logo from '../../assets/logo.jpg'
import Cookies from "js-cookie"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import NavMenu from "../../components/NavMenu"

export default function DashboardLayout() {
    const token = Cookies.get('token')
    const user = Cookies.get('userName')
    let location = useLocation()
    
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const dashRef = useRef()

    const menuItem = [
        {
            title : 'dashboard',
            titleIcon: 'fa-solid fa-table-columns fa-sm mr-2',
            subMenu : ['messages', 'feedback']
        },
        {
            title : 'profile',
            titleIcon: 'fa-solid fa-user fa-sm mr-2',
            subMenu : ['edit']
        },
    ]

    useEffect(() => {

        if (location.pathname.includes('/dashboard')) {

            const handleMenu = (e) => {
                if (!dashRef.current.contains(e.target)) {
                    setIsOpen(false)
                }
            }
            document.addEventListener("mousedown", handleMenu)

            return () => {
                document.removeEventListener("mousedown", handleMenu)
            }
        }
    })

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

                        {/* <NavLink to={'/dashboard'} end className={({ isActive }) => isActive ? 'bg-blue-50 py-3 pl-8 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all'}>
                            <i className="fa-solid fa-table-columns fa-sm mr-2"></i>
                            <span className="hidden sm:inline-block">

                                Dashboard
                            </span>
                        </NavLink>

                        <NavLink to={'/dashboard/profile'} end className={({ isActive }) => isActive ? 'bg-blue-50 py-3 pl-8 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all'}>
                            <i className="fa-solid fa-user fa-sm mr-2"></i>
                            <span className="hidden sm:inline-block">

                                profile
                            </span>
                        </NavLink>

                        <NavLink to={'/dashboard/messages'} end className={({ isActive }) => isActive ? 'bg-blue-50 py-3 pl-8 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all'}>
                            <i className="fa-solid fa-envelope fa-sm mr-2"></i>
                            <span className="hidden sm:inline-block">

                                messages
                            </span>
                        </NavLink>

                        <NavLink to={'/dashboard/feedback'} end className={({ isActive }) => isActive ? 'bg-blue-50 py-3 pl-8 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all'}>
                            <i className="fa-solid fa-pencil fa-sm mr-2"></i>
                            <span className="hidden sm:inline-block">

                                Feedback
                            </span>
                        </NavLink> */}
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

                            <div className="menu-container" ref={dashRef}>
                                {token &&
                                    <div onClick={() => { setIsOpen(!isOpen) }} className="ml-3 relative cursor-pointer">
                                        <div>{user} {isOpen ? <i className="fa-solid fa-chevron-up fa-xs"></i> : <i className="fa-solid fa-chevron-down fa-xs"></i>}</div>
                                        <div className={isOpen ? 'w-[130px]  capitalize font-semibold absolute top-8 right-0 block rounded border border-gray-300 bg-white' : 'hidden'} >

                                            <Link to={'/dashboard'} className="text-sm py-2 hover:bg-blue-50 px-4 flex items-baseline">
                                                <i className="fa-solid fa-table-columns fa-xs mr-2"></i>
                                                <div>Dashboard</div>
                                            </Link>

                                            <Link to={'/dashboard/profile'} className="text-sm py-2 hover:bg-blue-50 px-4 flex items-baseline">
                                                <i className="fa-solid fa-user fa-xs mr-2"> </i>
                                                <div>Profile</div>
                                            </Link>

                                            <Link to={'/dashboard/messages'} className="text-sm py-2 hover:bg-blue-50 px-4 flex items-baseline">
                                                <i className="fa-solid fa-envelope fa-xs mr-2"></i>
                                                <div>messages</div>
                                            </Link>

                                            <Link to={'/dashboard/feedback'} className="text-sm py-2 hover:bg-blue-50 px-4 flex items-baseline">
                                                <i className="fa-solid fa-pencil fa-xs mr-2"></i>
                                                <div>feedback</div>
                                            </Link>

                                            <div className="text-sm py-2 hover:bg-blue-50 px-4">
                                                <i className="fa-solid fa-arrow-right-from-bracket fa-xs mr-2"></i>
                                                <a onClick={(e) => { handleClick(e) }}>Logout</a>
                                            </div>
                                        </div>

                                    </div>}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[1200px] mx-4 2xl:mx-auto mt-12">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/messages" element={<Messages />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/messages/:id" element={<SingleMessage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}
