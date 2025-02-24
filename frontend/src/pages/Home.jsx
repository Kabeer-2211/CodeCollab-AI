import { useState, useEffect } from 'react'

import axios from '@config/axios'

const Home = () => {
    const [projectName, setProjectName] = useState("")
    const [project, setProject] = useState([])
    const createProject = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/projects/create', { name: projectName });
            console.log(response);
            
            if (response) {
                setIsModalOpen(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        async function getAllProjects() {
            try {
                const response = await axios.get('/projects/all');
                if (response) {
                    setProject(response.projects)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getAllProjects()
    }, [])

    return (
        <main className='p-4'>
            <div className="projects flex flex-wrap gap-3">
                {/* <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md cursor-pointer">
                    New Project
                    <i className="ri-link ml-2"></i>
                </button> */}
                {project.map((item) => <a href={`/project/${item._id}`} key={item._id} className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
                    <h2 className='font-semibold'>{item.name}</h2>
                    <div className="flex gap-2">
                        <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                        {item.users.length}
                    </div>
                </a>)}
            </div>
        </main>
    )
}

export default Home
