import Drawer from '@mui/material/Drawer';

const UsersDrawer = ({ isSidePanelOpen, setIsSidePanelOpen, users }) => {
    return (
        <Drawer open={isSidePanelOpen} onClose={() => setIsSidePanelOpen(false)}>
            <header className="flex justify-between items-center p-3 bg-black text-white">
                <h1 className="font-bold text-lg">Collaborators</h1>
                <button className="cursor-pointer hover:opacity-60" onClick={() => setIsSidePanelOpen(false)}>
                    <i className="ri-close-large-fill text-xl"></i>
                </button>
            </header>
            <div className="flex flex-col py-2 max-h-[80vh] overflow-y-auto w-full">
                {users && users.map(user => <div key={user._id} className="p-2 pe-14 cursor-pointer flex items-center gap-2 hover:bg-slate-200">
                    <div className="bg-gray-600 w-10 h-10 rounded-full flex justify-center items-center">
                        <i className="ri-user-3-fill text-white"></i>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">{user.username}</div>
                        <small>{user.email}</small>
                    </div>
                </div>)}
            </div>
        </Drawer>
    )
}

export default UsersDrawer
