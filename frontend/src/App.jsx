import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from "react-router-dom"

import Router from "@routes/index"
import Layout from '@layout'
import UserContextProvider from "@contexts/userProvider"
import ErrorProvider from '@contexts/errorProvider'
import AxiosInterceptorProvider from '@contexts/AxiosInterceptorProvider'

const App = () => {

  return (
    <BrowserRouter>
      <ErrorProvider>
        <AxiosInterceptorProvider>
          <UserContextProvider>
            <Layout>
              <Router />
            </Layout>
          </UserContextProvider>
        </AxiosInterceptorProvider>
      </ErrorProvider>
    </BrowserRouter>
  )
}

export default App
