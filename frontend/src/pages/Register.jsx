import { useState } from 'react'

import Btn from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from "motion/react";

import Button from '@components/auth/Button';
import useSession from '@hooks/useSession';

const Register = () => {
    const { signupUser, isLoading } = useSession();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signupUser(formData)
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#0C5767]'>
            <div className='my-10 rounded-4xl w-4/5 min-h-[80vh] flex bg-white'>
                <section className='w-2/4 py-10 px-30'>
                    <motion.div initial={{ opacity: 0, translateX: -100 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: .7 }}>
                        <div className='text-center' >
                            <h2 className='font-semibold text-4xl'>Code Collab AI</h2>
                            <p className='mt-2'>Code More. Code With Ease</p>
                        </div>
                        <div className='flex gap-3 mb-10 mt-6 justify-center'>
                            <Button path='/register' label="Sign Up" isActive={true} />
                            <Button path='/login' label="Log In" isActive={false} />
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, translateY: 100 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: .7 }}>
                        <h2 className='font-semibold text-3xl'>Begin Your Journey</h2>
                        <p className='mt-2'>Sign up with open account</p>
                        <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-5'>
                            <TextField value={formData.username} onChange={(e) => handleChange(e, 'username')} label="Username" variant="outlined" />
                            <TextField value={formData.email} onChange={(e) => handleChange(e, 'email')} type='email' label="Email" variant="outlined" />
                            <TextField value={formData.password} onChange={(e) => handleChange(e, 'password')} type='password' label="Password" variant="outlined" />
                            <Btn type='submit' sx={{ background: 'black', padding: '12px 0' }} loading={isLoading} variant="contained">Let's Start</Btn>
                        </form>
                    </motion.div>
                </section>
                <section className='w-2/4 flex items-center justify-center'>
                    <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: .8, delay: 0.7 }} className='max-w-full max-h-full' src="/signup.avif" alt="login" />
                </section>
            </div>
        </div>
    )
}

export default Register
