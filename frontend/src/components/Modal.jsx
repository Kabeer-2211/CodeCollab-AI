import { useState } from 'react';

import TextField from '@mui/material/TextField';
import { motion, AnimatePresence } from "motion/react";

import { createProject } from '@services/project';

const Modal = ({ isModalOpen, setisModalOpen }) => {
    const [projectName, setProjectName] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await createProject({ name: projectName });
            if (response) {
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AnimatePresence>
            {isModalOpen && <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-[#00000080] backdrop-blur-sm transition-opacity duration-300">
                <motion.div initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }} transition={{ duration: .3, ease: "easeOut" }} className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm">
                    <form onSubmit={handleSubmit} className="relative flex flex-col bg-white">
                        <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
                            <i className="ri-close-large-line absolute right-2 top-2 cursor-pointer" onClick={() => setisModalOpen(false)}></i>
                            <h3 className="text-2xl">
                                Create New Project
                            </h3>
                        </div>
                        <div className="flex flex-col gap-4 p-6">
                            <div className="w-full max-w-sm min-w-[200px]">
                                <TextField value={projectName} onChange={(e) => setProjectName(e.target.value)} label="Project Name" variant="outlined" className='w-full' />
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <button className="w-full rounded-md bg-slate-800 py-2 text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 cursor-pointer">
                                Save
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>}
        </AnimatePresence>
    )
}

export default Modal
