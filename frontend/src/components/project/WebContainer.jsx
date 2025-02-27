import useProject from "@hooks/useProject"

const WebContainer = () => {
    const { iframeUrl, setIframeUrl, runProcess } = useProject()
    return (
        <div className="flex-grow flex min-w-96 flex-col h-full">
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
        </div>
    )
}

export default WebContainer
