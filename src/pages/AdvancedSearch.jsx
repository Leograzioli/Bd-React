import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

//components
import DoctorCard from "../components/DoctorCard"

export default function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [voteInput, setVoteInput] = useState('')
  const [specInput, setSpecInput] = useState(searchParams.get('spec'))
  const [doctorsList, setDoctorsList] = useState([])
  const [specializations, setSpecializations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const firstPage = 1

  const getDoc = () => {
    axios.get('http://127.0.0.1:8000/api/guest/doctorslist', {
      params: {
        ...(specInput && { spec: specInput }),
        ...(voteInput && { vote: voteInput })
      }
    })
      .then(resp => {
        setDoctorsList(resp.data.doctors.data);
        setCurrentPage(resp.data.doctors.current_page)
        setLastPage(resp.data.doctors.last_page)
        setSpecializations(resp.data.specializations)
      })
  }

  //params
  useEffect(() => {
    setSearchParams(new URLSearchParams({ ...(specInput && { spec: specInput }), ...(voteInput && { vote: voteInput }) }))
  }, [specInput, voteInput])

  //fetch
  useEffect(() => {
    getDoc()
  }, [specInput, voteInput])

  return (
    <div className="ms_vh" >
      <div className="container mx-auto">
        <div className="bg-gray-100 sm:my-16 p-10">
          <h2 className="text-4xl mt-5 text-center font-semibold text-slate-900 ms_title_detail">Doctor List</h2>

          {/* filters  section */}
          <div className="mt-10 flex">

            {/* specializations */}
            <select value={searchParams.get('spec') ? searchParams.get('spec') : ''} onChange={(e) => setSpecInput(e.target.value)} className="w-1/2 block p-3 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-blue-200 focus:border-blue-200" name="specialization" id="specialization">
              <option value="">Select a Specialization</option>
              {specializations && specializations.map((specialization) => {
                return <option key={specialization.id} value={specialization.slug}> {specialization.title} </option>
              })}

            </select>

            {/* vote */}
            <select value={searchParams.get('vote') ? searchParams.get('vote') : ''} onChange={(e) => setVoteInput(e.target.value)} className="ml-5 block p-3 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-blue-200 focus:border-blue-200" name="vote" id="vote">
              <option value="">Vote</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            
          </div>

          {/* grid  */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-x-8 lg:gap-y-16 mt-16">

            {doctorsList.length > 0 && doctorsList.map((doctor) => {
              return <DoctorCard key={doctor.id} doctor={doctor} />
            })}

          </div>

          {/* pagination */}
          <div className="flex justify-center mt-16 pb-5">
            <div onClick={() => currentPage > firstPage && setCurrentPage(currentPage - 1)} className="mr-3 cursor-pointer hover:scale-105">previous</div>
            {currentPage > firstPage && <div className="cursor-pointer hover:scale-125" onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</div>}
            <div className={currentPage === currentPage ? 'bg-blue-500 mx-2 px-1' : ''}>{currentPage}</div>
            {currentPage < lastPage && <div className="cursor-pointer hover:scale-125" onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</div>}
            <div onClick={() => currentPage < lastPage && setCurrentPage(currentPage + 1)} className="ml-3 cursor-pointer hover:scale-105">next</div>
          </div>
        </div>
      </div>
    </div>
  )
}
