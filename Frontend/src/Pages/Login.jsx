import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Github, EyeOff, Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Modal from '../components/custom/Modal'
import PasswordChange from '@/components/auth/PasswordChange'

const Login = () => {

  const [ispassVisible, setIspassVisible] = useState(false)
  const [Role, setRole] = useState('Student')
  const [Formdata, setFormdata] = useState('')
  const [Loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const togglePasswordView = () => {
    setIspassVisible(!ispassVisible)
  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onsubmit = (data) => {
    setFormdata(data)
    console.log(data)
    if (data.Role == 'Student' || data.Role == 'Staff') {
      setLoading(true)
      setTimeout(() => {
        navigate('/chat')
      }, 3000);
    }
    else {
      setLoading(true)
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000);
    }
  }
  return (
    <section className='p-10 w-full min-h-screen bg-[#000000] flex md:flex-row flex-col gap-18 overflow-y-hidden'>
      {Loading ? <div className='text-center text-white text-3xl flex justify-center items-center h-[90vh] w-full'>loading...</div> : <>
        <div className='p-8 md:h-[90vh] h-96 md:w-5/12 sm:w-full relative shadow-2xl shadow-indigo-500/30 rounded-xl flex flex-col items-center justify-center overflow-hidden'>
          <video
            src={'https://res.cloudinary.com/dp5tdrmf8/video/upload/v1753990722/117924-713330888_handen.mp4'}
            autoPlay
            muted
            loop
            className='w-full h-full object-cover absolute top-0 left-0 z-10'
          />
          <Link to={'/'}>
            <button className='py-2 px-4 bg-black flex absolute -left-0 -top-0 rounded-br-2xl z-30'>
              <span className='bg-neutral-900 py-1 px-1 cursor-pointer hover:scale-110 duration-300 rounded-full'>
                <ArrowLeft color='white' size={'20px'} />
              </span>
            </button>
          </Link>
          <h1 className='text-black text-3xl font-bold text-center z-30'>
            <span className="flex items-center justify-center gap-2 z-30">
              <svg width="40" height="40" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="50" rx="10" ry="10" fill="#e4e892" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="27" fontWeight="bold" fill="#000">UR</text>
              </svg>
              <span>UNIRAG.</span>
            </span>
          </h1>
          <p className='z-30 text-2xl font-semibold my-6 text-center'>One Login.Infinite Insights.</p>
        </div>
        <div className='flex flex-col justify-center md:p-10 p-0 items-center w-full md:w-6/12 text-white rounded-3xl'>
          <div className='w-full flex justify-center items-center'>
            <div className='w-fit flex flex-col justify-center items-center bg-gray-500/10 rounded-4xl md:p-8 p-10'>
              <h2 className='text-2xl pb-2'>Sign In Account </h2>
              <p>Enter your data to create account</p>
              <div>
                <form onSubmit={handleSubmit(onsubmit)} className='mt-10 flex-col flex gap-2.5 '>
                  <div className='flex md:flex-row flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                      <label htmlFor="FirstName">First Name</label>
                      <input type="text" {...register('FirstName', { required: 'First name is required' })} placeholder='eg. Aditya' className='py-2 px-4 bg-neutral-600/30 p-1 outline-none rounded-lg focus:ring-2 focus:outline-none focus:ring-[blue] focus:border-[blue]' />
                      {errors.FirstName && <span className="text-red-500 text-xs mt-1">{errors.FirstName.message}</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label htmlFor="LastName">Last Name</label>
                      <input type="text" {...register('LastName', { required: 'Last name is required' })} placeholder='eg. Singh' className='py-2 px-4 bg-neutral-600/30 p-1 outline-none rounded-lg focus:ring-2 focus:outline-none focus:ring-[blue] focus:border-[blue]' />
                      {errors.LastName && <span className="text-red-500 text-xs mt-1">{errors.LastName.message}</span>}
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 '>
                    <label htmlFor="Role">Role</label>
                    <select name="role" id="Role" {...register('Role', { required: 'Role is required' })} className='py-2 px-4 w-full bg-neutral-600/30 p-1 outline-none rounded-lg focus:ring-2 focus:outline-none focus:ring-[blue] focus:border-[blue]' onChange={(e) => setRole(e.target.value)} >
                      <option value="Student">Student</option>
                      <option value="HOD">HOD</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                    </select>
                    {errors.Role && <span className="text-red-500 text-xs mt-1">{errors.Role.message}</span>}
                  </div>
                  {Role != 'Student' ? <div className='flex flex-col gap-1 '>
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register('email', { required: 'email is required' })} placeholder='Enter your email' className='py-2 px-4 w-full bg-neutral-600/30 p-1 outline-none rounded-lg' />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                  </div> : <div className='flex flex-col gap-1 '>
                    <label htmlFor="username">Username</label>
                    <input type="text" {...register('username', { required: 'Username is required' })} placeholder='Enter your username' className='py-2 px-4 w-full bg-neutral-600/30 p-1 outline-none rounded-lg focus:ring-2 focus:outline-none focus:ring-[blue] focus:border-[blue]' />
                    {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username.message}</span>}
                  </div>}
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="password">Password</label>
                    <div className='flex bg-neutral-600/30 rounded-xl items-center px-2 '>
                      <input type={ispassVisible ? 'text' : 'password'} {...register('password', { required: 'Password is required' })} placeholder='Enter your password' className='w-full px-2 py-2 outline-none rounded-lg' />
                      {ispassVisible ? <Eye size={'20px'} onClick={togglePasswordView} /> : <EyeOff size={'20px'} onClick={togglePasswordView} />}
                    </div>
                    {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                  </div>
                  <input type="submit" value={`Sign In`} className='w-full hover:cursor-pointer bg-white text-black my-4 rounded-xl py-2 px-4' />
                </form>
                <p className='text-center'>Forgot password? <button className='underline cursor-pointer text-neutral-400 hover:text-blue-300' onClick={() => setIsModalOpen(true)}>change password</button></p>
              </div>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Change Password" size="sm">
            <PasswordChange onsuccess={() => setIsModalOpen(false)} />
          </Modal>
        </div>  
      </>

      }
    </section>
  )
}

export default Login