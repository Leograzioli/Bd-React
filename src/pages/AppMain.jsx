import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

// components
import AppJumbotron from "../components/AppJumbotron"
import DoctorCard from "../components/DoctorCard"
import Pagination from "../components/Pagination"


function AppMain() {

    const [doctorsList, setDoctorsList] = useState([])
    const [specializations, setSpecializations] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [specializationValue, setSpecializationValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(null)
    const firstPage = 1
    const navigate = useNavigate()

    const getDoc = () => {

        setIsLoading(true)

        axios.get('http://127.0.0.1:8000/api/guest/doctorslist', {
            params: {
                page: currentPage
            },
        }).then(resp => {
            setDoctorsList(resp.data.doctors.data);
            setCurrentPage(resp.data.doctors.current_page)
            setLastPage(resp.data.doctors.last_page)
            setSpecializations(resp.data.specializations)

            if (specializationValue) {
                navigate(`/search?spec=${specializationValue}`)
            }
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                if (error.response.data.message === 'Unauthenticated.') {
                    navigate('/login');
                }
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    //to handle click to next page
    const handleNextPage = () => {
        if (!isLoading) {   
            currentPage < lastPage && setCurrentPage( currentPage + 1 )
        }
    }
    //to handle click to previous page
    const handlePrevPage = () => {

        if (!isLoading) {
            currentPage > firstPage && setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        getDoc()
    }, [specializationValue, currentPage])

    return (
        <div>
            <AppJumbotron />
            <section id="doctors" className="container max-w-[1200px] mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded sm:my-16 p-10 ">

                    {/* section title  */}
                    <h2 className="text-4xl mt-5 text-center font-semibold text-slate-900 ms_title_detail">Doctor List</h2>
                    <div className="mt-16 flex justify-center">
                        <select onChange={(e) => setSpecializationValue(e.target.value)} className="w-1/2 block p-3 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-blue-200 focus:border-blue-200" name="specialization" id="specialization">
                            <option value="">Select a Specialization</option>
                            {specializations && specializations.map((specialization) => {
                                return <option key={specialization.id} value={specialization.slug}> {specialization.title} </option>
                            })}

                        </select>
                    </div>

                    {/* grid  */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 lg:gap-12 mt-16">

                        {doctorsList && doctorsList.map((doctor) => {
                            return <DoctorCard key={doctor.id} doctor={doctor} />
                        })}

                    </div>

                    <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} />
                </div>
            </section>
        </div>
    )
}

export default AppMain
