import { Link } from "react-router-dom"

export default function AppHeader() {
  return (
    <div className="bg-blue-200">
      <header className="container mx-auto ">
        <nav className="h-20 flex ">
          <div className="left-nav w-1/4 flex items-center">
            <div className="logo">
              <img className="w-16" src="src/assets/logo.jpg" alt="" />
            </div>
          </div>
          <div className="right-nav w-3/4  flex justify-end items-center uppercase">
            <Link className="ml-3" to='/'>home</Link>
            <Link className="ml-3" to='/about-us'>about-us</Link>

          </div>
        </nav>
      </header>
    </div>
  )
}
