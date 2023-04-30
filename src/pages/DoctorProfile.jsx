import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function DoctorProfile() {
    const { id } = useParams()
    const [doctor, setDoctor] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    //to fetch sigle doctor 
    const getDoc = () => {
        setIsLoading(true)
        const params = {
            id: id
        }
        axios.get('http://127.0.0.1:8000/api/guest/doctor', { params })
            .then(resp => {
                setDoctor(resp.data.doctor);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getDoc()
    }, [])
    return (
        <div className="max-w-[1200px] mx-auto my-16 bg-gray-100 h-[calc(100vh-80px-128px)]">

            {/* will display the doctor only if the fetched data is over and there's a doctor to display */}
            {!isLoading && doctor && <div>
                ciao sono  {doctor.name}
            </div>}

            {/* to handdle possible delay on fetching data  */}
            {isLoading && <div className="flex justify-center items-center h-[calc(100vh-80px-128px)]">
                <div className="text-2xl font-semibold flex items-baseline gap-x-2">
                    <svg class="animate-spin border-t-2 rounded-full border-2 border-black border-t-white w-4 h-4 " />
                    <div>Loading...</div>
                </div>
            </div>}

            {/* if there's no doc to display */}

            {!isLoading && !doctor && <div className="flex justify-center items-center h-[calc(100vh-80px-128px)]">
                <div className="text-4xl font-semibold">
                    no doc to display :(
                </div>
            </div>}

        </div>
    )
}
