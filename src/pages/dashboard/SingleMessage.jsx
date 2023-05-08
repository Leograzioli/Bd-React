import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function SingleMessage() {
    const { id } = useParams()
    const [message, setMessage] = useState([])
    const token = Cookies.get('token')

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        axios.get(`http://127.0.0.1:8000/api/auth/message/${id}`, { headers }).then(resp => {
            setMessage(resp.data.message);
        })
    }, [])

    return (
        <section id="messages" className="relative mx-4 lg:mx-20 2xl:mx-auto flex flex-col items-center mt-16 max-w-[1200px] bg-white rounded border border-gray-200 p-8">

            <h2 className="text-2xl">Message From <span className='font-semibold'>{message.name}</span></h2>
            <p className='mt-2 mr-2'>{message.accountholder}</p>

            <div className='absolute top-0 right-10'>
                <p className='mt-2'>Ricevuto il: {new Date(message.created_at).toLocaleDateString()}</p>
            </div>

            <p className='mt-6 w-full px-6 md:w-3/4'>{message.message}</p>
            <div className='inline-flex w-full md:w-3/4 justify-between mt-8'>
                <Link className='rounded-md px-4 py-2 font-semibold bg-blue-500 text-white' to={-1}>Back</Link>
                <div onClick={() => { window.open(`mailto:${message.accountholder}`) }} className='cursor-pointer w-fit bg-blue-500 text-white rounded-md px-4 py-2 font-semibold'> rispondi <i className='fa-solid fa-envelope'></i></div>
            </div>


        </section>
    )
}
