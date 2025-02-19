import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from "react-router-dom"

import Router from "@routes/index"
import UserContextProvider from "@contexts/userProvider"

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
