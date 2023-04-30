

export default function AppJumbotron() {
    return (
        <div className="bg-blue-200">

            <div className="container mx-auto max-w-[1200px]">
                <div className="flex">
                    <div className="w-full md:w-1/2 self-center px-5 pb-10">
                        <p className="text-2xl text-gray-500 font-semibold">We care about you..</p>
                        <h2 className="text-4xl mt-10 text-slate-900 font-semibold">THE BEST <br /> ONLINE <br /> SUPPORT FOR YOUR HEALTH</h2>
                        <p className="text-xl text-gray-500 mt-5 ">Meet our doctors</p>
                        <div className="mt-16">
                            <h2 className="text-xl text-slate-900 font-semibold">More than 200.000 happy clients</h2>
                            <p className="mt-3 text-gray-500">you can check the doctor's feedback!</p>
                        </div>
                        <div className="mt-10 ">
                            <h2 className="text-xl text-slate-900 font-semibold">+50 Doctors are already registered!</h2>
                            <p className="mt-3 text-gray-500">We offer an advanced serach for you <br /> to match the exact doctor for you.</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-1/2 mt-48">
                        <img className="mx-auto " src="src/assets/jumbo-doctor.png" alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}
