import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { motion, AnimatePresence } from "motion/react";

import useError from '@hooks/useError';

const Error = () => {
    const { error } = useError()

    return (
        <AnimatePresence>
            {error && <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                    duration: 0.2,
                }} className='fixed bottom-5 right-5'>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </motion.div>}
        </AnimatePresence>
    )
}

export default Error