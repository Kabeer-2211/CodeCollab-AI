import axios from '@config/axios'

export const createProject = async ({ name }) => await axios.post('/projects/create', { name })