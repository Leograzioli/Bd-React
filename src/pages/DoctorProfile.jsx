import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//img
import doc from '../assets/doc-2.jpg'

export default function DoctorProfile() {
    const { id } = useParams()
    const [doctor, setDoctor] = useState({})
    const [name, setName] = useState('')
    const [accountholder, setAccountHolder] = useState('')
    const [message, setMessage] = useState('')
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

    // submit new message 
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/guest/message/add', {
            name,
            accountholder,
            message,
            user_id: doctor.id
        }).then(resp => {
            console.log(resp.data);

        }).catch(err => {
            console.log(err);

        }).finally(() => {
            setName('')
            setAccountHolder('')
            setMessage('')
        })
    }

    return (
        <div className="max-w-[1200px] mx-auto my-16">

            {/* will display the doctor only if the fetched data is over and there's a doctor to display */}
            {!isLoading && doctor && <div className="">

                {/* card */}
                <div className="md:flex">

                    {/* left card*/}
                    <div className=" bg-gray-50 border border-gray-200 md:max-w-[350px] rounded-md py-10 px-4 sm:px-10 mx-4 md:mx-4 flex flex-col items-center">

                        {/* profile picture */}
                        <img className="min-w-[310px] min-h-[310px] max-w-[310px] rounded-full object-cover" src={doc} alt="" />

                        <div className="mt-10 text-md">
                            <p className="font-semibold"><i className="fa-solid fa-envelope"></i> {doctor.email}</p>
                            {doctor.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-phone"></i> {doctor.user_detail.phone}</p>}
                            {doctor.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-syringe"></i> {doctor.user_detail.performance}</p>}
                            {doctor.user_detail && <p className="mt-4 font-semibold "><i className="fa-solid fa-house"></i> {doctor.user_detail.address}</p>}
                        </div>
                    </div>

                    {/* right card*/}
                    <div >

                        {/* details */}
                        <div className="bg-gray-50  border border-gray-200 rounded-md mx-4 p-4 sm:px-10 mt-4 md:mt-0">

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
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 sm:p-10 mt-4 mx-4 min-h-[300px]">
                            <div className="font-semibold text-2xl mt-4">Feedback:</div>
                            {doctor.feedback && doctor.feedback.map(feedback => {
                                return (
                                    <div key={feedback.id} className="mt-4 border-2 rounded-md border-white p-4 ">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-semibold mr-2">{feedback.name}</h2>
                                            <div>
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <i
                                                        key={i}
                                                        className={`fa-star ${i < Math.trunc(feedback.vote) ? 'fa-solid' : 'fa-regular'}`}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-2">{feedback.feedback_description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>}

            {/* loading  */}
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

            {/* send message */}
            <div className="mt-4 p-4 sm:p-10 mx-4 bg-gray-50 border border-gray-200 rounded-md">

                <h4 className="text-xl font-semibold">Send a Message</h4>

                <form className="mt-6" onSubmit={(e) => { handleSubmit(e) }} >
                    <div className="md:flex justify-around">

                        <div className="md:w-1/2">
                            <label className="">
                                <div className="text-lg font-semibold">Name</div>
                                <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder="example: mario " className="mt-1 w-full md:w-3/4 p-2 rounded-md focus:outline-blue-200 border-2 hover:border-blue-300 hover:outline-blue-200" />
                            </label>

                            <label>
                                <div className="mt-5 text-lg font-semibold">Email</div>
                                <input onChange={(e) => { setAccountHolder(e.target.value) }} value={accountholder} type="text" placeholder="example@gmail.com" className="mt-1 w-full md:w-3/4 p-2 rounded-md focus:outline-blue-200 border-2 hover:border-blue-300 hover:outline-blue-200" />
                            </label>
                        </div>

                        <div className="md:w-1/2">
                            <label>
                                <div className=" text-lg font-semibold">Message</div>
                                <textarea onChange={(e) => { setMessage(e.target.value) }} value={message} name="" id="" rows="5" className="w-full rounded-md mt-1 p-2 focus:outline-blue-200 border-2 hover:border-blue-300 hover:outline-blue-200"></textarea>
                            </label>
                        </div>
                    </div>

                    <div className="text-end mt-4">
                        <button className="px-2 py-1 bg-blue-600 rounded-md text-white" >send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
