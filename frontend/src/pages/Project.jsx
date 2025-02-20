import { useEffect, useState, useRef } from "react"

import { useParams } from "react-router-dom"
import Markdown from 'markdown-to-jsx'

import axios from '@config/axios'
import useSession from '@hooks/useSession'
import { initializeSocket, receiveMessage, sendMessage } from "@config/socket"

const Project = () => {
    const { id } = useParams()
    const { user } = useSession()
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState([])
    const [message, setMessage] = useState("")
    const [users, setUsers] = useState([])
    const [project, setProject] = useState()
    const [chat, setChat] = useState([])
    const [editorContent, setEditorContent] = useState()
    const [openFiles, setOpenFiles] = useState([])
    const [currentFile, setCurrentFile] = useState()
    const [fileTree, setFileTree] = useState()
    const msgRef = useRef()
    useEffect(() => {
        if (project) {
            initializeSocket(project._id)
            receiveMessage('project-message', data => {
                setChat(prevChat => {
                    let newChat;
                    if (data.sender === 'AI') {
                        // console.log(data.message)
                        console.log(JSON.parse(data.message))
                        const message = JSON.parse(data.message);
                        if(message.fileTree){
                            setFileTree(message.fileTree)
                        }
                        newChat = [...prevChat, { sender: data.sender, message: message.text }];
                    } else {
                        newChat = [...prevChat, data];
                    }
                    return newChat;
                })
            });
        }
    }, [project])

    useEffect(() => {
        async function getProject() {
            const response = await axios.get(`/projects/get-project/${id}`)
            if (response && response.project) {
                setProject(response.project)
            }
        }
        getProject()
    }, [])
    useEffect(() => {
        async function getAllUsers() {
            const response = await axios.get('/users/all')

            if (response && response.users) {
                setUsers(response.users)
            }
        }
        getAllUsers()
    }, [])
    const handleAddCollaborators = async () => {
        try {
            const response = await axios.put('/projects/add-user', {
                projectId: id,
                users: Array.from(selectedUser)
            });
            console.log(response)
            if (response && response.project) {
                setProject(response.project)
                setIsModalOpen(false)
            }
        } catch (err) {
            console.log(err)
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
    const send = (e) => {
        e.preventDefault()
        if (message.trim().length >= 1) {
            sendMessage('project-message', {
                message,
                sender: user.email
            });
            msgRef.current.scrollTop = msgRef.current.scrollHeight;
            setMessage("")
        }
    }

    return (
        <main className="h-screen w-screen flex">
            <section className="relative h-full w-96 flex flex-col bg-slate-400">
                <header className="flex items-center justify-between bg-gray-300 py-3 px-4">
                    <button className="flex items-center gap-2 cursor-pointer hover:opacity-60" onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-line text-lg"></i>
                        <div className="text-xs font-semibold">Add Collaborator</div>
                    </button>
                    <button className="cursor-pointer hover:opacity-60" onClick={() => setIsSidePanelOpen(true)}>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area flex-grow flex flex-col">
                    <div ref={msgRef} className="message-box max-h-[90vh] overflow-y-auto flex-grow p-2 flex flex-col gap-2">
                        {chat && chat.map((item, i) => <div key={i} className={`message px-3 py-2 ${item.sender === user.email ? 'ms-auto bg-green-200' : 'bg-white'} w-fit max-w-80 rounded-sm flex flex-col`}>
                            <small className="opacity-50 text-xs">{item.sender}</small>
                            {item.sender === 'AI' ? <Markdown>{item.message}</Markdown> : <p className="text-sm">{item.message}</p>}
                        </div>)
                        }
                    </div>
                    <form onSubmit={send} className="message-field w-full p-3 bg-white flex items-center">
                        <input type="text" placeholder="Enter Message" className="outline-0 flex-grow" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className="ps-3 cursor-pointer w-8 h-8 bg-green-300 rounded-full flex items-center justify-center"><i className="ri-send-plane-fill me-3 mt-1"></i></button>
                    </form>
                </div>
                <div className={`w-full h-full bg-gray-100 absolute top-0 transition-all duration-400 ${isSidePanelOpen ? 'left-0' : '-left-full'}`}>
                    <header className="flex justify-between items-center p-3 bg-gray-300">
                        <h1 className="font-bold text-lg">Collaborators</h1>
                        <button className="cursor-pointer hover:opacity-60" onClick={() => setIsSidePanelOpen(false)}>
                            <i className="ri-close-large-fill text-xl"></i>
                        </button>
                    </header>
                    <div className="flex flex-col py-2 max-h-[80vh] overflow-y-auto w-full">
                        {project && project.users.map(user => <div key={user._id} className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200">
                            <div className="bg-gray-600 w-10 h-10 rounded-full flex justify-center items-center">
                                <i className="ri-user-3-fill text-white"></i>
                            </div>
                            <div className="font-semibold">{user.email}</div>
                        </div>)}
                    </div>
                </div>
            </section>
            {fileTree && <section className="flex flex-grow">
                <div className="file_tree w-72 bg-slate-200 overflow-y-auto border-r-2 border-slate-400">
                    {Object.keys(fileTree).map((item, index) => <button onClick={() => {
                        setCurrentFile(item)
                        setEditorContent(fileTree[item] ? fileTree[item].file.contents : '')
                        setOpenFiles([...new Set([...openFiles, item])])
                    }} key={index} className={`text-sm text-start border-b border-slate-300 p-3 w-full cursor-pointer ${currentFile === item && 'bg-slate-300'} hover:bg-slate-300`}>{item}</button>)}
                </div>
                <div className="flex-grow max-w-[70vw] flex flex-col">
                    <div className="file_header flex overflow-x-auto bg-slate-200 border-b border-slate-300 w-full">
                        {openFiles.map((item, index) => <button key={index} onClick={() => {
                            setCurrentFile(item)
                            setEditorContent(fileTree[item] ? fileTree[item].file.contents : '')
                        }} className={`py-3 px-12 text-sm border-r border-slate-300 cursor-pointer ${currentFile === item && 'bg-slate-300'} hover:bg-slate-300`}>{item}</button>)}
                    </div>
                    <textarea className="resize-none outline-0 flex-grow p-3" onChange={(e) => setEditorContent(e.target.value)} value={editorContent}></textarea>
                </div>
            </section>}

            {/* add collaborator modal */}
            {isModalOpen && <div className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-center bg-[#00000085] h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm">
                        <div className="flex items-center justify-between py-3 px-4 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-medium text-gray-900">Select Users</h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
                                <i className="ri-close-large-fill text-xl"></i>
                            </button>
                        </div>
                        <div className="flex flex-col py-2 max-h-72 overflow-y-auto">
                            {users.map(item => <button key={item._id} className={`py-2 px-4 cursor-pointer flex items-center gap-2 hover:bg-slate-200 ${Array.from(selectedUser).indexOf(item._id) !== -1 && 'bg-slate-200'}`} onClick={() => handleUserClick(item._id)}>
                                <div className="bg-gray-600 w-10 h-10 rounded-full flex justify-center items-center">
                                    <i className="ri-user-3-fill text-white"></i>
                                </div>
                                <div className="font-semibold">{item.email}</div>
                            </button>)}
                        </div>
                        <div className="flex items-center justify-center p-3 border-t border-gray-200 rounded-b">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center cursor-pointer" onClick={handleAddCollaborators}>Add Collabrators</button>
                        </div>
                    </div>
                </div>
            </div>}
        </main>
    )
}

export default Project
