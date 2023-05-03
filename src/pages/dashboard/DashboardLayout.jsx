import { Link, Route, Routes } from "react-router-dom"

import Profile from "./Profile"
import Messages from "./messages"
import Feedback from "./Feedback"
import Dashboard from "./Dashboard"

export default function DashboardLayout() {

    return (
        <div className="h-[calc(100vh-80px)] bg-white">
            <div className="flex">
                <div className="w-[260px] border-t border-blue-300 h-[calc(100vh-80px)] bg-blue-200 px-8 py-12">
                    <ul className="uppercase font-semibold flex flex-col gap-y-2">
                        <li>
                            <Link to={'/dashboard'}>
                                <i className="fa-solid fa-table-columns fa-sm mr-2"></i> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={'/dashboard/profile'}>
                                <i className="fa-solid fa-user fa-sm mr-2"></i> profile
                            </Link>
                        </li>
                        <li>
                            <Link to={'/dashboard/messages'}>
                                <i className="fa-solid fa-envelope fa-sm mr-2"></i> messages
                            </Link>
                        </li>
                        <li>
                            <Link to={'/dashboard/feedback'}>
                                <i className="fa-solid fa-pencil fa-sm mr-2"></i> Feedback
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className=" w-full h-[calc(100vh-80px)]">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/messages" element={<Messages  />} />
                        <Route path="/feedback" element={<Feedback />} />
                    </Routes>

                </div>
            </div>
        </div>
    )
}
