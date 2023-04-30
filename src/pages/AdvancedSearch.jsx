import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

//components
import DoctorCard from "../components/DoctorCard"
import Pagination from "../components/Pagination"

export default function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [voteInput, setVoteInput] = useState(searchParams.get('vote'))
  const [specInput, setSpecInput] = useState(searchParams.get('spec'))
  const [doctorsList, setDoctorsList] = useState([])
  const [specializations, setSpecializations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const firstPage = 1

  const getDoc = () => {
    axios.get('http://127.0.0.1:8000/api/guest/doctorslist', {
      params: {
        page: currentPage,
        ...(specInput && { spec: specInput }),
        ...(voteInput && { vote: voteInput })
      },
      headers: {

        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
      .then(resp => {
        setDoctorsList(resp.data.doctors.data);
        setCurrentPage(resp.data.doctors.current_page)
        setLastPage(resp.data.doctors.last_page)
        setSpecializations(resp.data.specializations)
      })
  }

  //url params
  useEffect(() => {
    getDoc()
    setSearchParams(new URLSearchParams({ ...(specInput && { spec: specInput }), ...(voteInput && { vote: voteInput }) }))
  }, [specInput, voteInput, currentPage])

  //to handle click to next page
  const handleNextPage = () => {
    currentPage < lastPage && setCurrentPage(currentPage + 1)
  }
  //to handle click to previous page
  const handlePrevPage = () => {
    currentPage > firstPage && setCurrentPage(currentPage - 1)
  }

  return (
    <div className="ms_vh " >
      <div className="max-w-[1200px] /px-[8%] mx-auto">
        <div className="bg-gray-100 sm:my-16 p-10">
          <h2 className="text-4xl mt-5 text-center font-semibold text-slate-900 ms_title_detail">Doctor List</h2>

          {/* filters  section */}
          <div className="mt-16 flex justify-center">

            {/* specializations */}
            <select value={searchParams.get('spec') ? searchParams.get('spec') : ''} onChange={(e) => setSpecInput(e.target.value)} className="w-1/3 block p-3 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-blue-200 focus:border-blue-200" name="specialization" id="specialization">
              <option value="">Select a Specialization</option>
              {specializations && specializations.map((specialization) => {
                return <option key={specialization.id} value={specialization.slug}> {specialization.title} </option>
              })}

            </select>

            {/* vote */}
            <select value={searchParams.get('vote') ? searchParams.get('vote') : ''} onChange={(e) => setVoteInput(e.target.value)} className="ml-5 block p-3 border border-gray-300 hover:border-gray-500 rounded-lg focus:outline-blue-200 focus:border-blue-200" name="vote" id="vote">
              <option value="">Vote</option>
              <option className="text-xl" value="1">&#9733;</option>
              <option className="text-xl" value="2">&#9733;&#9733;</option>
              <option className="text-xl" value="3">&#9733;&#9733;&#9733;</option>
              <option className="text-xl" value="4">&#9733;&#9733;&#9733;&#9733;</option>
              <option className="text-xl" value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
            </select>

          </div>

          {/* grid  */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-x-8 lg:gap-y-16 mt-16">

            {doctorsList.length > 0 && doctorsList.map((doctor) => {
              return <DoctorCard key={doctor.id} doctor={doctor} />
            })}

          </div>

          <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} />

        </div>
      </div>
    </div>
  )
}
