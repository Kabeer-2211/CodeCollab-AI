import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from "react-router-dom"

import Router from "@routes/index"
import UserContextProvider from "@contexts/userProvider"
import useAxiosInterceptor from '@hooks/useAxiosInterceptor'

const App = () => {
  useAxiosInterceptor()
  
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
