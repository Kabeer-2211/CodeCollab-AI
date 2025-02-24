import { useState } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { filterProjects, resetProjects } from '../redux/slices/project'
import Tooltip from '@components/Tooltip'
import useSession from '@hooks/useSession'
import Modal from '@components/modal'

const Navbar = () => {
    const dispatch = useDispatch()
    const { signout, user } = useSession()
    const [isModalOpen, setisModalOpen] = useState(false)
    const [search, setSearch] = useState("")
    const handleChange = (e) => {
        const value = e.target.value;
        if (value.trim() !== '') {
            dispatch(filterProjects(value))
        } else {
            dispatch(resetProjects())
        }
        setSearch(value)
    }
    return (
        <>
            <Modal isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} />
            <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
                {/* Logo */}
                <Link to='/' className="flex items-center font-bold ms-7 text-3xl uppercase">
                    {user?.username?.split(' ')[0]}
                </Link>
                {/* Search Bar */}
                <div className="w-2/5 mx-4">
                    <div className="relative">
                        <input type="text" placeholder="Search" value={search} onChange={(e) => handleChange(e)} className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i className="ri-search-line text-gray-400"></i>
                        </div>
                    </div>
                </div>
                {/* Icons and Button */}
                <div className="flex items-center space-x-4">
                    <Tooltip label="Logout">
                        <button onClick={signout} className='px-4 py-2 text-white bg-black rounded-lg cursor-pointer hover:bg-gray-800'>
                            <i className="ri-logout-box-r-line"></i>
                        </button>
                    </Tooltip>
                    <Tooltip label="Create new project">
                        <button className="px-4 py-2 text-white bg-black rounded-lg cursor-pointer hover:bg-gray-800" onClick={() => setisModalOpen(true)}>
                            <i className="ri-lg ri-add-line me-1"></i>
                            New Project
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default Navbar
