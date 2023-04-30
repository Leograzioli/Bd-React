import './App.css'
import { Route, BrowserRouter, Routes, useNavigate, Navigate} from 'react-router-dom'

//components
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ScrollToTop from './components/ScrollToTop'

//pages
import AppMain from './pages/AppMain'
import AboutUs from './pages/AboutUs'
import AdvancedSearch from './pages/AdvancedSearch'
import DoctorProfile from './pages/DoctorProfile'
import AppLogin from './pages/auth/AppLogin'
import AppRegister from './pages/auth/AppRegister'
import Cookies from 'js-cookie'

function App() {

  const token = Cookies.get('token')

  return (
    <div className='App'>
      <BrowserRouter>
        <ScrollToTop />
        <AppHeader />
        <Routes>
          <Route path='/' element={<AppMain />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/login' element={token? <Navigate to={-1}/> : <AppLogin />} />
          <Route path='/register' element={token? <Navigate to={-1}/> : <AppRegister />} />
          <Route path='/search' element={<AdvancedSearch />} />
          <Route path='/profile/:id' element={<DoctorProfile />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </div>
  )
}

export default App
