import { useState, createContext, useEffect } from "react"

export const errorContext = createContext()

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(false)
    const showError = (err) => {
        setError(err)
    }
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
    }, [error])
    return (
        <errorContext.Provider value={{ showError, error }}>
            {children}
        </errorContext.Provider>
    )
}

export default ErrorProvider