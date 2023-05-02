import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//img
import doc from '../assets/doc-2.jpg'

export default function DoctorProfile() {
    const { id } = useParams()
    const [doctor, setDoctor] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    //to fetch sigle doctor 


    useEffect(() => {
        setIsLoading(true)
        const params = {
            id: id
        }
        axios.get('http://127.0.0.1:8000/api/guest/doctor', { params })
            .then(resp => {
                console.log(resp.data.doctor);
                setDoctor(resp.data.doctor);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="max-w-[1200px] mx-auto my-16 ">

            {/* will display the doctor only if the fetched data is over and there's a doctor to display */}
            {!isLoading && doctor && <div className="">

                {/* card */}
                <div className="flex gap-x-6">

                    {/* left card*/}
                    <div className=" bg-gray-100 w-1/3 rounded-md py-10 px-6 flex flex-col items-center">

                        {/* profile picture */}
                        <img className="min-w-[320px] min-h-[320px] w-[320px] rounded-full object-cover" src={doc} alt="" />

                        <div className="mt-10 text-lg pr-6">
                            <p className="font-semibold"><i className="fa-solid fa-envelope"></i> {doctor.email}</p>
                            {doctor.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-phone"></i> {doctor.user_detail.phone}</p>}
                            {doctor.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-syringe"></i> {doctor.user_detail.performance}</p>}
                            {doctor.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-house"></i> {doctor.user_detail.address}</p>}
                        </div>
                    </div>

                    {/* right card*/}
                    <div className="w-2/3">

                        {/* details */}
                        <div className="bg-gray-100  rounded-md p-10">

                            {/* full name  and specializations*/}
                            <h2 className="text-5xl text-center font-bold">{doctor.name}</h2>
                            {doctor.specializations && doctor.specializations.map((spec) => {
                                return (
                                    <div key={doctor.id} className="text-center mt-2">
                                        <h4 className="text-xl font-semibold">#{spec.title}</h4>
                                    </div>
                                )
                            })}

                            {/* stars  */}
                            <div className="mt-4  text-end">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <i key={i} className={`fa-star ${i < Math.trunc(doctor.feedback_avg_vote) ? 'fa-solid' : 'fa-regular'}`}></i>
                                ))}
                            </div>

                            {/* description */}
                            {doctor.user_detail && <div className="mt-4">
                                <div className="font-semibold text-2xl">About Me:</div>
                                <p className="mt-2">
                                    {doctor.user_detail.description}i
                                </p>
                            </div>}
                        </div>

                        {/* ricenzioni */}
                        <div className="bg-gray-100 rounded-md p-10 mt-4 min-h-[300px]">
                            <div className="font-semibold text-2xl mt-4">Feedback:</div>
                            {doctor.feedback && doctor.feedback.map(feedback => {
                                return (
                                    <div key={feedback.id} className="mt-4 border-2 rounded-md border-white p-2 ">
                                        <div className="flex items-center">
                                            <h2 className="text-lg font-semibold mr-2">{feedback.name}</h2>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <i
                                                    key={i}
                                                    className={`fa-star ${i < Math.trunc(feedback.vote) ? 'fa-solid' : 'fa-regular'}`}
                                                ></i>
                                            ))}
                                        </div>
                                        <p className="mt-1">{feedback.feedback_description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>}

            {/* to handdle possible delay on fetching data  */}
            {isLoading && <div className="flex justify-center items-center h-[calc(100vh-80px-128px)]">
                <div className="text-2xl font-semibold flex items-baseline gap-x-2">
                    <svg className="animate-spin border-t-2 rounded-full border-2 border-black border-t-white w-4 h-4 " />
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
