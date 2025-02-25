import { useEffect, useState, useRef } from "react"

import { useParams } from "react-router-dom"
import Markdown from 'markdown-to-jsx'
import Editor from "@monaco-editor/react";

import { getProjectDetails } from "@services/project";
import UsersDrawer from "@components/project/UsersDrawer";
import UsersModal from "@components/project/UsersModal";
import Tooltip from '@components/Tooltip'
import axios from '@config/axios'
import useSession from '@hooks/useSession'
import { initializeSocket, receiveMessage, sendMessage } from "@config/socket"
import { getWebContainer } from "@config/webContainer"

const Project = () => {
    const { id } = useParams()
    const { user } = useSession()
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [project, setProject] = useState()
    const [chat, setChat] = useState([])
    const [openFiles, setOpenFiles] = useState([])
    const [currentFile, setCurrentFile] = useState()
    const [fileTree, setFileTree] = useState()
    const [webContainer, setWebContainer] = useState(null)
    const [runProcess, setRunProcess] = useState(null)
    const [iframeUrl, setIframeUrl] = useState("")
    const msgRef = useRef()
    useEffect(() => {
        if (project) {
            initializeSocket(project._id)
            receiveMessage('project-message', data => {
                setChat(prevChat => {
                    let newChat;
                    if (data.sender === 'AI') {
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
        async function getProject() {
            const response = await getProjectDetails(id)
            if (response && response.project) {
                setProject(response.project)
                setFileTree(response.project.fileTree)
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
            msgRef.current.scrollTop = msgRef.current.scrollHeight;
            setMessage("")
        }
    }
    const updateFileTree = async (ft) => {
        const response = await axios.put('/projects/update-filetree', {
            projectId: id,
            fileTree: ft
        })
    }

    return (
        <main className="h-screen w-screen flex">
            <section className="relative h-full w-96 flex flex-col bg-slate-400">
                <header className="flex items-center justify-between bg-gray-300 py-3 px-4">
                    <button className="flex items-center gap-2 cursor-pointer hover:opacity-60" onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-line text-lg"></i>
                        <div className="text-xs font-semibold">Add Collaborator</div>
                    </button>
                    <Tooltip label='Collaborators'>
                        <button className="cursor-pointer hover:opacity-60" onClick={() => setIsSidePanelOpen(true)}>
                            <i className="ri-group-fill"></i>
                        </button>
                    </Tooltip>
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
                <UsersDrawer
                    isSidePanelOpen={isSidePanelOpen}
                    setIsSidePanelOpen={setIsSidePanelOpen}
                    users={project?.users}
                />
            </section>
            {!iframeUrl && fileTree && <section className="flex flex-grow">
                <div className="file_tree w-60 bg-slate-200 overflow-y-auto border-r-2 border-slate-400">
                    {Object.keys(fileTree).map((item, index) => <button onClick={() => {
                        setCurrentFile(item)
                        setOpenFiles([...new Set([...openFiles, item])])
                    }} key={index} className={`text-sm text-start border-b border-slate-300 p-3 w-full cursor-pointer ${currentFile === item && 'bg-slate-300'} hover:bg-slate-300`}>{item}</button>)}
                </div>
                <div className="flex-grow max-w-[70vw] flex flex-col">
                    <div className="file_header flex justify-between overflow-x-auto bg-slate-200 border-b border-slate-300 w-full min-h-12">
                        <div>
                            {openFiles.map((item, index) => <button key={index} onClick={() => {
                                setCurrentFile(item)
                            }} className={`h-full px-12 text-sm border-r border-slate-300 cursor-pointer ${currentFile === item && 'bg-slate-300'} hover:bg-slate-300`}>{item}</button>)}
                        </div>
                        <button className="bg-slate-300 hover:bg-slate-400 px-5 cursor-pointer" onClick={async () => {
                            await webContainer.mount(fileTree)
                            await webContainer.spawn('npm', ['install'])
                            if (runProcess) {
                                await runProcess.kill()
                            }
                            const tempRunProcess = await webContainer.spawn('npm', ['start'])
                            setRunProcess(tempRunProcess)
                            webContainer.on('server-ready', (port, url) => {
                                setIframeUrl(url)
                            })
                        }}>run</button>
                    </div>
                    <Editor
                        language={fileTree[currentFile] ? fileTree[currentFile].file.language : 'plaintext'}
                        value={fileTree[currentFile] ? fileTree[currentFile].file.contents : ''}
                        theme="vs-dark"
                        options={{ wordWrap: "on" }}
                        onChange={(value) => {
                            const ft = {
                                ...fileTree,
                                [currentFile]: {
                                    file: {
                                        contents: value,
                                        language: fileTree[currentFile].file.language
                                    },
                                }
                            }
                            setFileTree(ft)
                            updateFileTree(ft);
                        }}
                    />
                </div>
            </section>}
            {iframeUrl && webContainer && (<div className="flex-grow flex min-w-96 flex-col h-full">
                <div className="address-bar py-2 px-4 bg-slate-200 flex justify-between">
                    <input type="text"
                        onChange={(e) => setIframeUrl(e.target.value)}
                        value={iframeUrl} className="w-full outline-0" />
                    <button className="bg-slate-300 p-2 px-6 hover:bg-slate-400 cursor-pointer" onClick={async () => {
                        setIframeUrl('')
                        await runProcess.kill()
                    }}>stop</button>
                </div>
                <iframe src={iframeUrl} className="w-full h-full"></iframe>
            </div>)}

            {/* add collaborator modal */}
            {isModalOpen && <UsersModal setIsModalOpen={setIsModalOpen} id={id} setProject={setProject} />}
        </main>
    )
}

export default Project
