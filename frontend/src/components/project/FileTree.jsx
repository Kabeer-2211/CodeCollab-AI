import Editor from "@monaco-editor/react";

import { updateFileTree } from '@services/project';
import useProject from '@hooks/useProject';

const FileTree = () => {
    const { id, currentFile, setCurrentFile, openFiles, setOpenFiles, fileTree, setFileTree, webContainer, runProcess, setRunProcess, setIframeUrl } = useProject()
    return (
        <section className="flex flex-grow">
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
                        updateFileTree({ projectId: id, fileTree: ft });
                    }}
                />
            </div>
        </section>
    )
}

export default FileTree
