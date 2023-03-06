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
    const navigate = useNavigate();


    const getDoc = () => {
        axios.get('http://127.0.0.1:8000/api/guest/doctorslist')
            .then(resp => {
                console.log(resp.data);
                setDoctorsList(resp.data.doctors.data);
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
    }, [specializationValue])

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
                </div>
            </div>
        </div>
    )
}

export default AppMain
