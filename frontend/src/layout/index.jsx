import Error from "@components/Error"
import useError from "@hooks/useError"

const Layout = ({ children }) => {
    const { error } = useError()
    return (
        <div>
            <Error show={error} />
            {children}
        </div>
    )
}

export default Layout