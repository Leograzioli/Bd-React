import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function NavMenu({ menu }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <ul className='py-2 ' onClick={() => { if (menu.subMenu) setIsOpen(!isOpen) }}>
                <span className={isOpen ? 'text-blue-500 pl-8' : 'pl-8'}>
                    <i className={menu.titleIcon}></i>{menu.title}
                </span>

                {isOpen && menu.subMenu && menu.subMenu.map(subMenu => {
                    return (
                        <li key={subMenu} className=" text-sm">
                            <NavLink className={({ isActive }) => isActive ? 'bg-blue-50 block py-2 pl-[3.3rem] border-r-2 border-blue-500' : 'py-2 pl-[3.3rem] block hover:bg-blue-50 transition-all'} to={`/dashboard/${subMenu}`}>
                                {subMenu}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}
