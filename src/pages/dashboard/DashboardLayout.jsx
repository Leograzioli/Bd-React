import { Link, NavLink, Route, Routes } from "react-router-dom"

import Profile from "./Profile"
import Messages from "./Messages"
import Feedback from "./Feedback"
import Dashboard from "./Dashboard"
import SingleMessage from "./SingleMessage"
import AppHeader from "../../components/AppHeader"
import Cookies from "js-cookie"

export default function DashboardLayout() {
    const token = Cookies.get('token')

    return (
        <>
            <div className="flex">
                <div className="w-[310px] border-r border-t border-gray-200 h-screen  py-12">
                    <div className="font-semibold flex flex-col mt-16">

                        <NavLink to={'/dashboard'} end className={ ({ isActive }) => isActive? 'bg-blue-50 py-3 pl-10 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all' }>
                            <i className="fa-solid fa-table-columns fa-sm mr-2"></i> Dashboard
                        </NavLink>

                        <NavLink to={'/dashboard/profile'} end className={({ isActive }) => isActive? 'bg-blue-50 py-3 pl-10 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all'}>
                            <i className="fa-solid fa-user fa-sm mr-2"></i> profile
                        </NavLink>

                        <NavLink to={'/dashboard/messages'} end className={({ isActive }) => isActive? 'bg-blue-50 py-3 pl-10 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all'}>
                            <i className="fa-solid fa-envelope fa-sm mr-2"></i> messages
                        </NavLink>

                        <NavLink to={'/dashboard/feedback'} end className={({ isActive }) => isActive? 'bg-blue-50 py-3 pl-10 border-r-2 border-blue-500' : 'py-3 pl-8 hover:bg-blue-50 transition-all'}>
                            <i className="fa-solid fa-pencil fa-sm mr-2"></i> Feedback
                        </NavLink>
                    </div>
                </div>

                <div className=" w-full h-screen bg-blue-50 overflow-hidden">
                    <div className="bg-white border-b border-gray-200">
                        <div className="right-nav w-3/4 h-[80px] flex justify-end items-center font-semibold uppercase">
                            <Link className="ml-3" to='/'>home</Link>
                            <Link className="ml-3" to='/about-us'>about-us</Link>
                            {!token && <Link className="ml-3" to='/login'>login</Link>}
                            {!token && <Link className="ml-3" to='/register'>register</Link>}
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/messages/:id" element={<SingleMessage />} />
                    </Routes>

                </div>
            </div>
        </>
    )
}
