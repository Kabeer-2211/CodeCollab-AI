import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from "react-router-dom"

import Router from "@routes/index"
import Layout from '@layout'
import UserContextProvider from "@contexts/userProvider"
import ErrorProvider from '@contexts/errorProvider'
import AxiosInterceptor from '@contexts/AxiosInterceptorProvider'

const App = () => {

  return (
    <BrowserRouter>
      <ErrorProvider>
        <AxiosInterceptor>
          <UserContextProvider>
            <Layout>
              <Router />
            </Layout>
          </UserContextProvider>
        </AxiosInterceptor>
      </ErrorProvider>
    </BrowserRouter>
  )
}

export default App
