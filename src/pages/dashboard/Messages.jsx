import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination"

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [messageId, setMessageId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const navigate = useNavigate()
  const token = Cookies.get('token')
  const firstPage = 1


  const getMessages = () => {

    const headers = {
      Authorization: `Bearer ${token}`
    }

    const params = {
      page: currentPage
    }

    setIsLoading(true)

    axios.get('http://127.0.0.1:8000/api/auth/messages', { params, headers })
      .then(resp => {
        setMessages(resp.data.messages.data);
        setCurrentPage(resp.data.messages.current_page)
        setLastPage(resp.data.messages.last_page)
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
  }

  // to delete the clicked message.
  const handleDelete = (e, id) => {
    e.preventDefault()

    const headers = {
      Authorization: `Bearer ${token}`
    }

    axios.delete(`http://127.0.0.1:8000/api/auth/message/delete/${id}`, { headers }).then(resp => {
      console.log(resp.data);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setIsOpen(false)
      setMessageId(null)
      getMessages()
    })
  }

  // fetch date
  useEffect(() => {
    getMessages()
  }, [currentPage])

  //to handle click to next page
  const handleNextPage = () => {
    if (!isLoading) {
      currentPage < lastPage && setCurrentPage(currentPage + 1)
    }
  }

  //to handle click to previous page
  const handlePrevPage = () => {
    if (!isLoading) {
      currentPage > firstPage && setCurrentPage(currentPage - 1)
    }
  }

  //to mark message as read 
  const handleIsRead = (id, read) => {
    if(read === 0){
      const headers = {
        Authorization: `Bearer ${token}`
      }
  
      axios.put('http://127.0.0.1:8000/api/auth/message/edit/' + id,{}, { headers})
    }
    navigate("/adm/messages/" + id)
  }

  return (
    <>
      <section id="messages">

        <h2 className="text-3xl font-semibold">Messages</h2>

        {!isLoading && <div className="flex flex-col  bg-white border border-gray-200 px-6 pt-6 rounded mx-auto mt-8">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light ">
                  <thead
                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 hidden xl:block py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages && messages.map((message) => {
                      return (
                        <tr key={message.id}
                          className={`border-b hover:bg-blue-300 transition-all dark:border-neutral-500 dark:bg-neutral-700' ${!message.is_read && 'bg-blue-100 border-b border-white font-semibold'}`}>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold">{ message.name }</td>
                          <td className="whitespace-nowrap px-6 py-4">{ message.accountholder }</td>
                          <td className="whitespace-nowrap hidden xl:block px-6 py-4">{ message.message.slice(0, 40) } ...</td>
                          <td className="whitespace-nowrap px-6 py-4">{new Date(message.created_at).toLocaleDateString()}</td>
                          <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-x-2 text-lg ">
                            <div onClick={ () => { handleIsRead(message.id, message.is_read) }} className="cursor-pointer"> <i className="fa-solid fa-eye bg-white rounded text-blue-400"></i></div>
                            <div onClick={ () => { setIsOpen(true), setMessageId(message.id) }} href=""> <i className="fa-solid fa-trash-can text-red-600 cursor-pointer"></i></div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="text-end text-sm">pages: {lastPage}</div>

                <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} />

              </div>
            </div>
          </div>
        </div>}

        {/* loading */}
        {isLoading && <div className="mt-8 text-5xl font-semibold bg-white py-16 rounded border boder-gray-200 text-center">Loading..</div>}

        {/* modal */}
        {isOpen && <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#000000a6]">
          <div className="flex h-screen justify-center items-center">
            <div className="w-[350px] h-[200px] bg-blue-200 px-4 py-12 rounded">
              <h2 className="text-2xl text-center font-semibold">You really want to delete {messageId}?</h2>
              <div className="flex justify-center gap-x-2 mt-8">
                <div onClick={() => { setIsOpen(false) }} className="bg-red-500 rounded px-3 py-1 cursor-pointer text-white font-semibold">no</div>
                <a onClick={(e) => { handleDelete(e, messageId) }} className="bg-green-500 rounded px-3 py-1 text-white cursor-pointer font-semibold">yes</a>
              </div>
            </div>
          </div>
        </div>}

      </section>
    </>
  )
}
