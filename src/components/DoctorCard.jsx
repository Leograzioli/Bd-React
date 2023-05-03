import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
    return (
        <div>
            {/* card  */}
            <div className="bg-white rounded-tl-3xl rounded-br-3xl p-4 max-w-[350px]">

                {/* image  */}
                <div>
                    <img className="rounded-tl-3xl rounded-br-3xl" src="src/assets/doc-2.jpg" alt="" />
                </div>

                {/* contact info  */}
                <h2 className="text-2xl text-center mt-8 font-semibold text-slate-900">{doctor.name}</h2>
                <p className="mt-6"> <span className="font-semibold"><i className="fa-solid fa-envelope"></i></span> {doctor.email} </p>
                <p className="mt-1">
                    <span className="font-semibold"> <i className="fa-solid fa-phone"></i></span> {doctor.user_detail?.phone}
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
                    <p>
                        {Array.from({ length: 5 }, (_, i) => (
                            <i
                                key={i}
                                className={`fa-star ${i < Math.trunc(doctor.feedback_avg_vote) ? 'fa-solid' : 'fa-regular'}`}
                            ></i>
                        ))}
                    </p>
                    <Link to={`/doctor/${doctor.id}`}>Vedi profile</Link>
                </div>
            </div>
        </div>
    )
}

