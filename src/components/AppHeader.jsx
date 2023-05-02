import axios from "axios"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"

import logo from '../assets/logo.jpg'

export default function AppHeader() {
  const token = Cookies.get('token')
  const navigate = useNavigate()

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
        navigate('/login')

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
            {token && <a className="ml-3" href="" onClick={ (e) => {handleClick(e)} }>Logout</a>}

          </div>
        </nav>
      </header>
    </div>
  )
}
