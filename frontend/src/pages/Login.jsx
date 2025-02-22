import { useState } from 'react';

import Btn from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from "motion/react";

import Button from '@components/auth/Button';
import useSession from '@hooks/useSession';
import Error from '@components/Error';

const Login = () => {
    const { loginUser, isLoading } = useSession();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await loginUser(formData)
    }
    return (
        <div className='h-screen w-screen flex items-center justify-center bg-[#0C5767]'>
            <Error />
            <div className='rounded-4xl w-3/5 min-h-[80vh] flex p-3 bg-white'>
                <section className='w-2/4 py-20 px-30'>
                    <motion.div initial={{ opacity: 0, translateX: -100 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: .7 }}>
                        <div className='text-center' >
                            <h2 className='font-semibold text-4xl'>Code Collab AI</h2>
                            <p className='mt-2'>Code More. Code With Ease</p>
                        </div>
                        <div className='flex gap-3 mb-10 mt-6 justify-center'>
                            <Button path='/register' label="Sign Up" isActive={false} />
                            <Button path='/login' label="Log In" isActive={true} />
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, translateY: 100 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: .7 }}>
                        <h2 className='font-semibold text-3xl'>Continue Your Journey</h2>
                        <p className='mt-2'>Login your account</p>
                        <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-5'>
                            <TextField value={formData.email} onChange={(e) => handleChange(e, 'email')} type='email' label="Email" variant="outlined" />
                            <TextField value={formData.password} onChange={(e) => handleChange(e, 'password')} type='password' label="Password" variant="outlined" />
                            <Btn type='submit' sx={{ background: 'black', padding: '12px 0' }} loading={isLoading} variant="contained">Log in</Btn>
                        </form>
                    </motion.div>
                </section>
                <section className='w-2/4 flex items-center justify-center'>
                    <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: .8, delay: 0.7 }} className='max-w-full max-h-full' src="https://static.vecteezy.com/system/resources/thumbnails/023/784/016/small_2x/a-man-asks-a-question-to-artificial-intelligence-bot-chatbot-in-the-form-of-a-cute-robot-answers-questions-ai-and-human-characters-using-and-chatting-messanger-neural-network-conversation-vector.jpg" alt="login" />
                </section>
            </div>
        </div>
    )
}

export default Login
