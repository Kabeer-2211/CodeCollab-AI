import { createContext, useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import useSession from '@hooks/useSession'
import useError from '@hooks/useError'
import { getAllUsers } from "@services/auth";
import { getProjectDetails } from "@services/project";
import { initializeSocket, receiveMessage, sendMessage } from "@config/socket"
import { getWebContainer } from "@config/webContainer"

export const projectContext = createContext()

const ProjectPovider = ({ children }) => {
    const { id } = useParams()
    const { user } = useSession()
    const { showError } = useError()
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")
    const [project, setProject] = useState()
    const [chat, setChat] = useState([])
    const [fileTree, setFileTree] = useState()
    const [currentFile, setCurrentFile] = useState()
    const [openFiles, setOpenFiles] = useState([])
    const [webContainer, setWebContainer] = useState(null)
    const [runProcess, setRunProcess] = useState(null)
    const [iframeUrl, setIframeUrl] = useState("")
    useEffect(() => {
        if (project) {
            initializeSocket(project._id)
            receiveMessage('project-message', data => {
                console.log(data)
                setChat(prevChat => {
                    let newChat;
                    if (data.sender.name === 'AI') {
                        console.log(JSON.parse(data.message))
                        const message = JSON.parse(data.message);
                        if (message.fileTree) {
                            setFileTree(message.fileTree)
                            setOpenFiles([])
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
        if (!webContainer) {
            getWebContainer().then(container => setWebContainer(container))
        }
    }, [])
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
    useEffect(() => {
        async function getProject() {
            try {
                const response = await getProjectDetails(id)
                if (response && response.project) {
                    setProject(response.project)
                    setFileTree(response.project.fileTree)
                }
            } catch (err) {
                showError(err.response?.data?.message || 'Something went wrong')
            }
        }
        getProject()
    }, [])
    const send = (e) => {
        e.preventDefault()
        if (message.trim().length >= 1) {
            sendMessage('project-message', {
                message,
                sender: user.email
            });
            setMessage("")
        }
    }
    return (
        <projectContext.Provider value={{
            id,
            users,
            message,
            setMessage,
            project,
            setProject,
            chat,
            fileTree,
            setFileTree,
            currentFile,
            setCurrentFile,
            openFiles,
            setOpenFiles,
            webContainer,
            runProcess,
            setRunProcess,
            iframeUrl,
            setIframeUrl,
            send
        }}>
            {children}
        </projectContext.Provider>
    )
}

export default ProjectPovider
