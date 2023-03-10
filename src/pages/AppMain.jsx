import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// components
import AppJumbotron from "../components/AppJumbotron"
import DoctorCard from "../components/DoctorCard"


function AppMain() {

    const [doctorsList, setDoctorsList] = useState([])
    const [specializations, setSpecializations] = useState([])
    const [specializationValue, setSpecializationValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(null)
    const firstPage = 1
    const navigate = useNavigate()


    const getDoc = () => {
        axios.get('http://127.0.0.1:8000/api/guest/doctorslist' , {
            params: {
                page: currentPage
            }
        })
            .then(resp => {
                console.log(resp.data);
                setDoctorsList(resp.data.doctors.data);
                setCurrentPage(resp.data.doctors.current_page)
                setLastPage(resp.data.doctors.last_page)
                setSpecializations(resp.data.specializations)
                if (specializationValue) {
                    navigate(`/search?spec=${specializationValue}`)
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getDoc()
    }, [specializationValue, currentPage])

    return (
        <div>
            <AppJumbotron />
            <div className="container mx-auto">
                <div className="bg-gray-100 sm:my-16 p-10 ">

                    {/* section title  */}
                    <h2 className="text-4xl mt-5 text-center font-semibold text-slate-900 ms_title_detail">Doctor List</h2>
                    <div className="my-16 flex justify-center">
                        <select onChange={(e) => setSpecializationValue(e.target.value)} className="w-1/2 block p-3 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-blue-200 focus:border-blue-200" name="specialization" id="specialization">
                            <option value="">Select a Specialization</option>
                            {specializations && specializations.map((specialization) => {
                                return <option key={specialization.id} value={specialization.slug}> {specialization.title} </option>
                            })}

                        </select>
                    </div>

                    {/* grid  */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-x-8 lg:gap-y-16">

                        {doctorsList && doctorsList.map((doctor) => {
                            return <DoctorCard key={doctor.id} doctor={doctor} />
                        })}

                    </div>

                    {/* pagination */}
                    <div className="flex justify-center mt-16 pb-5">
                        <div onClick={ () => currentPage > firstPage && setCurrentPage(currentPage - 1 ) } className="mr-3 cursor-pointer hover:scale-105">previous</div>
                        {currentPage > firstPage && <div className="cursor-pointer hover:scale-125" onClick={ () => setCurrentPage(currentPage - 1) }>{ currentPage -1 }</div>}
                        <div className={currentPage === currentPage ? 'bg-blue-500 mx-2 px-1' : ''}>{ currentPage }</div>
                        {currentPage < lastPage && <div className="cursor-pointer hover:scale-125" onClick={ ()=> setCurrentPage(currentPage + 1) }>{ currentPage +1 }</div>}
                        <div onClick={() => currentPage < lastPage && setCurrentPage(currentPage + 1)} className="ml-3 cursor-pointer hover:scale-105">next</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppMain
