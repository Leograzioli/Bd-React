import axios from "axios"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"

import logo from '../assets/logo.jpg'
import { useEffect, useRef, useState } from "react"

export default function AppHeader() {
  const token = Cookies.get('token')
  const user = Cookies.get('userName')

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    const handleMenu = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleMenu)

    return () => {
      document.removeEventListener("mousedown", handleMenu)
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

        Cookies.remove('token')
        Cookies.remove('userName')

        setTimeout(() => {
          navigate('/login')
        }, 200);

      }
    })
  }

  return (
    <div className="bg-blue-200">
      <header className="container mx-auto px-4 max-w-[1200px]">
        <nav className="h-20 flex ">
          <div className="left-nav w-1/4 flex items-center">
            <div className="logo">
              <img className="w-16" src={logo} alt="" />
            </div>
          </div>
          <div className="right-nav w-3/4  flex justify-end items-center font-semibold uppercase">
            <Link className="ml-3" to='/'>home</Link>
            <Link className="ml-3" to='/about-us'>about-us</Link>
            {!token && <Link className="ml-3" to='/login'>login</Link>}
            {!token && <Link className="ml-3" to='/register'>register</Link>}

            <div className="menu-container" ref={menuRef}>
              {token &&
                <div onClick={() => { setIsOpen(!isOpen) }} className="ml-3 relative cursor-pointer">
                  <div>{user} {isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}</div>
                  <div className={isOpen ? ' text-center absolute translate-x-[-23px] block mt-4 bg-blue-200 px-6 pb-4 border-b-2 border-white' : 'hidden'} >
                    <div>
                      <Link to={'/'}>home</Link>
                    </div>
                    <div className="mt-1">
                      <Link to={'/'}>dashboard</Link>
                    </div>
                    <div className="mt-1">
                      <Link to={'/'}>profile</Link>
                    </div>
                    <div className="mt-1">
                      <a onClick={(e) => { handleClick(e) }}>Logout</a>
                    </div>
                  </div>

                </div>}
            </div>

          </div>
        </nav>
      </header>
    </div>
  )
}
