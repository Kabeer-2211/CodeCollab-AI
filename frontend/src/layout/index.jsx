import useSession from '@hooks/useSession'
import Error from "@components/Error"
import useError from "@hooks/useError"
import Navbar from '@components/Navbar'

const Layout = ({ children }) => {
    const { error } = useError()
    const { isAuthenticated } = useSession()
    return (
        <main>
            <Error show={error} />
            {isAuthenticated && <Navbar />}
            {children}
        </main>
    )
}

export default Layout