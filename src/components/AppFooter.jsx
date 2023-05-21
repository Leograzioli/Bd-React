import { useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'

export default function AppFooter() {
    let location = useLocation()

    return (
        <>
            {!location.pathname.includes('/adm', "/login", "/register")  && <footer className="bg-blue-900 py-16">
                <div className="container px-4 mx-auto max-w-[1200px]">

                    {/* top  */}
                    <div className="py-8 text-white grid sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-16 border-b-2 text-center">
                        <div className="font-semibold sm:border-r-2 sm:pr-4 py-5">
                            <div className="flex">
                                <img className="w-1/3 mr-3" src={logo} alt="logo" />
                                <p className="text-md self-center underline">BDoctors.com</p>
                            </div>
                            <p className="mt-5">2019 - 2023 <span className="text-gray-400">New York Street</span></p>
                            <p>New York - United States of America</p>
                            <p>Box-Office: (800)-523-3452</p>
                        </div>

                        <div className="font-semibold py-5">
                            <h2 className="text-2xl text-gray-400 underline">Careers</h2>
                            <p className="mt-4">Work with us</p>
                            <p>Open Positions</p>
                            <p>Our Project</p>
                            <p>Applications</p>
                            <p>Our Company</p>
                        </div>

                        <div className="font-semibold py-5">
                            <h2 className="text-2xl text-gray-400 underline">Partners</h2>
                            <p className="mt-4">Office BDoctors</p>
                            <p>FAQ</p>
                            <p>Set an appointment</p>
                            <p>Work with us</p>
                        </div>

                        <div className="font-semibold py-5">
                            <h2 className="text-2xl text-gray-400 underline">Legal Information</h2>
                            <p className="mt-4">Coockie Policy</p>
                            <p>Privacy</p>
                            <p>Copyright</p>
                        </div>
                    </div>

                    {/* bottom  */}
                    <div className="text-white mt-8 text-center text-md font-semibold">
                        &#169; <span className="text-gray-500">2023</span> Copyright
                    </div>
                </div>

            </footer>}
        </>
    )
}
