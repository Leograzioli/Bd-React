import { useParams } from "react-router-dom"

export default function DoctorProfile() {
    const { id } = useParams()
    return (
        <div className="ms_vh">
            <div className="container mx-auto my-16 bg-gray-100">

                ciao sono il medico  {id}
            </div>
        </div>
    )
}
