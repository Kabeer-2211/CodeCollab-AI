import { useEffect, useState } from 'react'

import { getAllUsers } from "@services/auth";
import { addCollaborators } from '@services/project';
import useError from '@hooks/useError'

const UsersModal = ({ setIsModalOpen, id, setProject }) => {
    const { showError } = useError()
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    useEffect(() => {
        async function getUsers() {
            try {
                const response = await getAllUsers()
                if (response && response.users) {
                    setUsers(response.users)
                }
            } catch (err) {
                showError(err.response?.data?.message || 'Something went wrong')
            }
        }
        getUsers()
    }, [])
    const handleAddCollaborators = async () => {
        try {
            const response = await addCollaborators({
                projectId: id,
                users: Array.from(selectedUser)
            });
            if (response && response.project) {
                setProject(response.project)
                setIsModalOpen(false)
            }
        } catch (err) {
            showError(err.response?.data?.message || 'Something went wrong')
        }
    }
    const handleUserClick = (id) => {
        setSelectedUser(prevSelectedUser => {
            const newSelectedUser = new Set(prevSelectedUser)
            if (newSelectedUser.has(id)) {
                newSelectedUser.delete(id)
            } else {
                newSelectedUser.add(id)
            }
            return newSelectedUser
        })
    }
    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-center bg-[#00000085] h-full">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between py-3 px-4 border-b rounded-t border-gray-200">
                        <h3 className="text-xl font-medium text-gray-900">Select Users</h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
                            <i className="ri-close-large-fill text-xl"></i>
                        </button>
                    </div>
                    <div className="flex justify-evenly py-2 max-h-72 overflow-y-auto">
                        {users.length > 0 ? users.map(item => <button key={item._id} className={`py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-slate-200 ${Array.from(selectedUser).indexOf(item._id) !== -1 && 'bg-slate-200'}`} onClick={() => handleUserClick(item._id)}>
                            <div className="bg-gray-600 w-10 h-10 rounded-full flex justify-center items-center">
                                <i className="ri-user-3-fill text-white"></i>
                            </div>
                            <div className='flex flex-col items-start'>
                                <div className="font-semibold">{item.username}</div>
                                <small>{item.email}</small>
                            </div>
                        </button>) : <div>Loading Users...</div>}
                    </div>
                    <div className="flex items-center justify-center p-3 border-t border-gray-200 rounded-b">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center cursor-pointer" onClick={handleAddCollaborators}>Add Collabrators</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersModal
