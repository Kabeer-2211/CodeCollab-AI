import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from "react-router-dom"

import Router from "@routes/index"
import Layout from '@layout'
import UserContextProvider from "@contexts/userProvider"
import ErrorProvider from '@contexts/errorProvider'

const App = () => {

  return (
    <BrowserRouter>
      <ErrorProvider>
        <UserContextProvider>
          <Layout>
            <Router />
          </Layout>
        </UserContextProvider>
      </ErrorProvider>
    </BrowserRouter>
  )
}

export default App
