import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
    return (
        <div>
            {/* card  */}
            <div className="bg-white rounded-tl-3xl rounded-br-3xl p-4">

                {/* image  */}
                <div>
                    <img className="rounded-tl-3xl rounded-br-3xl" src="src/assets/doc-2.jpg" alt="" />
                </div>

                {/* contact info  */}
                <h2 className="text-2xl text-center mt-8 font-semibold text-slate-900">{doctor.name}</h2>
                <p className="mt-6"> {doctor.email} </p>
                <p className="mt-1">
                    <span className="font-semibold"> telefono:</span> {doctor.user_detail?.phone}
                </p>

                {/* specializations */}
                <div className="grid grid-cols-2 mt-1">
                    <span className="font-semibold">#
                        {doctor.specializations.map((specialization) => {
                            return specialization.title
                        })}
                    </span>
                </div>
                <div className="flex justify-between mt-8">
                    <p>stars {doctor.feedback_avg_vote}</p>
                    <Link to={'/about-us'}>Vedi profile</Link>
                </div>
            </div>
        </div>
    )
}

