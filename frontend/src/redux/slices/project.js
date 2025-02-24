import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    filteredProjects: []
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
            state.filteredProjects = action.payload
        },
        filterProjects: (state, action) => {
            state.filteredProjects = state.projects.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()))
        },
        resetProjects: (state) => {
            state.filteredProjects = state.projects
        }
    }
});

export const { setProjects, filterProjects, resetProjects } = projectSlice.actions

export default projectSlice.reducer