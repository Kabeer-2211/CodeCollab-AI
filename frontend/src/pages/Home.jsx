import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { getProjects } from '@services/project'
import { setProjects } from '@redux/slices/project'

const Home = () => {
    const dispatch = useDispatch()
    const { filteredProjects } = useSelector(state => state.project)
    console.log(filteredProjects)
    useEffect(() => {
        async function getAllProjects() {
            try {
                const response = await getProjects();
                if (response) {
                    dispatch(setProjects(response.projects))
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
                {filteredProjects.length > 0 ? filteredProjects.map((item) => <a href={`/project/${item._id}`} key={item._id} className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
                    <h2 className='font-semibold'>{item.name}</h2>
                    <div className="flex gap-2">
                        <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                        {item.users?.length}
                    </div>
                </a>) : <div className='text-3xl font-semibold p-3'>No Projects Found</div>}
            </div>
        </main>
    )
}

export default Home
