import axios from '@config/axios'

export const createProject = async ({ name }) => await axios.post('/projects/create', { name })
export const getProjects = async () => await axios.get('/projects/all')