import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

//components
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ScrollToTop from './components/ScrollToTop'

//pages
import AppMain from './pages/AppMain'
import AboutUs from './pages/AboutUs'
import AdvancedSearch from './pages/AdvancedSearch'
import DoctorProfile from './pages/DoctorProfile'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <ScrollToTop />
        <AppHeader />
        <Routes>
          <Route path='/' element={<AppMain />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/search' element={<AdvancedSearch />} />
          <Route path='/profile/:id' element={<DoctorProfile />}/>
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </div>
  )
}

export default App
