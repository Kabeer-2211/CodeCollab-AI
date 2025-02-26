import axios from '@config/axios'

export const createProject = async ({ name }) => await axios.post('/projects/create', { name })
export const getProjects = async () => await axios.get('/projects/all')
export const getProjectDetails = async (id) => await axios.get(`/projects/get-project/${id}`)
export const addCollaborators = async (data) => await axios.put('/projects/add-user', data)