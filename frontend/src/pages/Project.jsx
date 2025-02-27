import { useState } from "react"

import Markdown from 'markdown-to-jsx'

import useProject from "../hooks/useProject"
import FileTree from "@components/project/FileTree"
import WebContainer from "@components/project/WebContainer"
import UsersDrawer from "@components/project/UsersDrawer";
import UsersModal from "@components/project/UsersModal";
import Tooltip from '@components/Tooltip'
import useSession from '@hooks/useSession'

const Project = () => {
    const {
        message,
        setMessage,
        project,
        chat,
        fileTree,
        webContainer,
        iframeUrl,
        send
    } = useProject()
    const { user } = useSession()
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <main className="flex">
            <section className="relative h-full w-96 flex flex-col bg-slate-400">
                <header className="flex items-center justify-end gap-4 bg-gray-300 py-2 px-5">
                    <Tooltip label='Add Collaborators'>
                        <button className="flex items-center gap-2 cursor-pointer hover:opacity-60" onClick={() => setIsModalOpen(true)}>
                            <i className="ri-add-line text-lg"></i>
                        </button>
                    </Tooltip>
                    <Tooltip label='Collaborators'>
                        <button className="cursor-pointer hover:opacity-60" onClick={() => setIsSidePanelOpen(true)}>
                            <i className="ri-group-fill"></i>
                        </button>
                    </Tooltip>
                </header>
                <div className="conversation-area">
                    <div className="message-box h-[71vh] overflow-y-auto p-2 flex flex-col gap-2">
                        {chat && chat.map((item, i) => <div key={i} className={`message px-3 py-2 ${item.sender.name === user.username ? 'ms-auto bg-green-200' : 'bg-white'} w-fit max-w-80 rounded-sm flex flex-col`}>
                            <small className="opacity-50 text-xs">{item.sender.name}</small>
                            {item.sender.name === 'AI' ? <Markdown>{item.message}</Markdown> : <p className="text-sm">{item.message}</p>}
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
            {/* file tree and editor */}
            {!iframeUrl && fileTree && <FileTree />}
            {/* webContainer iframe */}
            {iframeUrl && webContainer && <WebContainer />}
            {/* add collaborator modal */}
            {isModalOpen && <UsersModal setIsModalOpen={setIsModalOpen} />}
        </main>
    )
}

export default Project
