import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Messages() {
  const token = Cookies.get('token')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    }

    axios.get('http://127.0.0.1:8000/api/auth/messages', { headers }).then(resp => {
      setMessages(resp.data.messages);
    })
  }, [])

  return (
    <>
      <section id="messages" className="mx-20 mt-16">

        <h2 className="text-3xl font-semibold">Messages</h2>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead
                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages && messages.map((message) => {
                      return (
                        <tr key={message.id}
                          className="border-b even:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                          <td className="whitespace-nowrap px-6 py-4 font-semibold">{ message.name }</td>
                          <td className="whitespace-nowrap px-6 py-4">{ message.accountholder }</td>
                          <td className="whitespace-nowrap px-6 py-4">{ message.message.slice(1, 40)} ...</td>
                          <td className="whitespace-nowrap px-6 py-4">{ new Date(message.created_at).toLocaleDateString() }</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link to={`${message.id}`}> click me</Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
