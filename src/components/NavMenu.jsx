import { useState } from "react"

export default function NavMenu({ menu }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <ul className='py-2 ' onClick={() => { if (menu.subMenu) setIsOpen(!isOpen) }}>
                <span className={isOpen ? 'text-blue-500 pl-8' : 'pl-8'}>
                    <i className={menu.titleIcon}></i>{menu.title}
                </span>

                {isOpen && menu.subMenu && <li className="bg-blue-50 text-sm py-2 pl-[3.3rem] border-r-2 border-blue-500">
                    {menu.subMenu}
                </li>}
            </ul>
        </div>

    )
}
