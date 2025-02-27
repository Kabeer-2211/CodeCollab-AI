import { Route, Routes } from 'react-router-dom'

import Home from '@pages/Home'
import Project from '@pages/Project'
import Login from '@pages/Login'
import Register from '@pages/Register'
import ProjectPovider from '@contexts/ProjectPovider'
import PrivateRoute from '@routes/PrivateRoute'
import PublicRoute from '@routes/PublicRoute'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            <Route path='/project/:id' element={
                <PrivateRoute>
                    <ProjectPovider>
                        <Project />
                    </ProjectPovider>
                </PrivateRoute>
            } />
            <Route path='/login' element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path='/register' element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />
        </Routes>
    )
}

export default Router
