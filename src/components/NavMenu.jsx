import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export default function NavMenu({ menu }) {
    const [isOpen, setIsOpen] = useState(false)


    const handleMenuClick = () => {

        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (location.pathname.includes(menu.title)) {
            setIsOpen(true)
        }
    }, [])

    return (
        <div>

            {/* menu title */}
            <span onClick={(e) => { handleMenuClick(e) }} className={location.pathname.includes(menu.title) ? 'text-blue-500 pl-8' : 'pl-8'}>

                {/* icons and title */}
                <i className={menu.titleIcon}></i> {menu.title} <i className={isOpen ? 'fa-solid fa-chevron-up fa-xs' : 'fa-solid fa-chevron-down fa-xs' }></i>
            </span>

            {/* submenu list */}
            <ul className='py-2 capitalize cursor-pointer' id={menu.title} >

                {isOpen && menu.subMenu && menu.subMenu.map(subMenu => {
                    return (
                        <li key={subMenu} className="text-sm ">
                            <NavLink className={({ isActive }) => isActive ? 'bg-blue-50 block py-3 pl-[3.3rem] border-r-2 border-blue-500 font-normal' : 'font-normal py-3 pl-[3.3rem] block hover:bg-blue-50 transition-all'} to={`/adm/${menu.title}/${subMenu}`}>
                                {subMenu}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}
