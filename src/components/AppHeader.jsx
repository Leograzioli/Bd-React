import axios from "axios"
import Cookies from "js-cookie"
import { Link, useLocation, useNavigate } from "react-router-dom"

import logo from '../assets/logo.jpg'
import { useEffect, useRef, useState } from "react"

export default function AppHeader() {
  const token = Cookies.get('token')
  const user = Cookies.get('userName')
  let location = useLocation()

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  useEffect(() => {

    if (!location.pathname.includes('/dashboard')) {
      
      const handleMenu = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleMenu)
  
      return () => {
        document.removeEventListener("mousedown", handleMenu)
      }
    }

  })

  //logout function. remove the token and redirect to login page
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
      {!location.pathname.includes('/dashboard') && <div className="bg-blue-200 border-b">
        <header className="mx-auto px-4 max-w-[1200px]">
          <nav className="h-[59px] flex ">

            <div className="left-nav w-1/4 flex items-center">
              <div className="logo">
                <img className="w-16" src={logo} alt="" />
              </div>
            </div>

            <div className="w-3/4  flex justify-end items-center font-semibold capitalize">
              <Link className="ml-3" to='/'>home</Link>
              <Link className="ml-3" to='/about-us'>about-us</Link>
              {!token && <Link className="ml-3" to='/login'>login</Link>}
              {!token && <Link className="ml-3" to='/register'>register</Link>}

              {/* drop down menu */}
              <div className="menu-container" ref={menuRef}>
                {token &&
                  <div onClick={() => { setIsOpen(!isOpen) }} className="ml-3 relative cursor-pointer">
                    <div>{user} {isOpen ? <i className="fa-solid fa-chevron-up fa-xs"></i> : <i className="fa-solid fa-chevron-down fa-xs"></i>}</div>
                    <div className={isOpen ? 'w-[130px] capitalize font-semibold absolute top-8 right-0 block rounded border border-gray-300 bg-white' : 'hidden'} >

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
          </nav>
        </header>
      </div>}
    </>
  )
}
