import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
        <section id="messages" className="mx-4 md:mx-20 mt-16">

            <h2 className="text-3xl">Message From <span className='font-semibold'>{message.name}</span></h2>
            <div className='flex'>
                <p className='mt-2 mr-2'>{message.accountholder}</p>
                <p className='mt-2'>{new Date(message.created_at).toLocaleDateString()}</p>
            </div>
            <p className='mt-2 w-4/4 md:w-3/4'>{message.message}</p>
            <div className='flex justify-end mt-4'>
                <div onClick={() => { window.open(`mailto:${message.accountholder}`) }} className='cursor-pointer w-fit bg-blue-200 rounded-md px-4 py-2 '> rispondi</div>
            </div>


        </section>
    )
}
