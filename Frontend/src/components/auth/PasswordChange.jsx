import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { motion } from 'motion/react'

const PasswordChange = ({onsuccess}) => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState('email')
    const [countdown, setCountdown] = useState(0)
    const [canResend, setCanResend] = useState(true)
    const [ispassVisible, setIspassVisible] = useState(false)
    const [alert, setAlert] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const togglePasswordView = () => {
        setIspassVisible(!ispassVisible)
    }

    // Timer effect
    useEffect(() => {
        let timer
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000)
        } else if (countdown === 0 && !canResend) {
            setCanResend(true)
        }
        return () => clearTimeout(timer)
    }, [countdown, canResend])

    const handleEmailSubmit = async (data) => {
        console.log(data)
        const {email} = data
        if (!email) {
            console.log('Email is required')
            return
        }

        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setEmail(email)
            setCurrentStep('otp')
            setCanResend(false)
            setCountdown(60)
            
            console.log('OTP sent to:', email)
        } catch (error) {
            console.error('Error sending OTP:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        if (!canResend) return

        setIsLoading(true)
        try {

            await new Promise(resolve => setTimeout(resolve, 1000))

            setCanResend(false)
            setCountdown(60)
            
            console.log('OTP resent to:', email)
        } catch (error) {
            console.error('Error resending OTP:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOtpSubmit = async (data) => {
        const {otp} = data  
        if (!otp) {
            console.log('OTP is required')
        }

        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            setCurrentStep('password')
            console.log('OTP verified:', otp)
        } catch (error) {
            console.error('Error verifying OTP:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePasswordSubmit = async (data) => {
        const { password, confirmPassword } = data
        
        try {
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            console.log('Password changed successfully:', password)
            setAlert(true)                
            setTimeout(() => {
                onsuccess()
            }, 3000)
            
        } catch (error) {
            console.error('Error changing password:', error)
            alert('Failed to change password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }   

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // email step
    const renderEmailStep = () => (
        <form onSubmit={handleSubmit(handleEmailSubmit)}>
            <div className='flex flex-col gap-4'>
                <div>
                    <p className='text-sm text-neutral-400 mb-2'>Enter college email to get the OTP</p>
                    <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
                        className='w-full py-2 px-4 bg-neutral-600/30 outline-none rounded-lg focus:ring-2 focus:ring-[blue] focus:border-[blue]'
                        placeholder="Enter your email"
                        required
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className='bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors'
                >
                    {isLoading ? 'Sending...' : 'Get OTP'}
                </button>
            </div>
        </form>
    )
    // otp step
    const renderOtpStep = () => (
        <div className='flex flex-col gap-4'>
    <div>
                <p className='text-sm text-green-500 mb-2'>✓ OTP sent to {email}</p>
                <form onSubmit={handleSubmit(handleOtpSubmit)}>
                    <label htmlFor="otp" className='block text-sm font-medium my-2 '>Enter OTP</label>
                    <input
                        type="text"
                        id="otp"
                        {...register('otp', { required: 'OTP is required' })}
                        
                        className='w-full py-2 px-4 bg-neutral-600/30 outline-none rounded-lg focus:ring-2 focus:ring-[blue] focus:border-[blue] text-center text-lg tracking-widest'
                        placeholder="000000"
                        maxLength={6}
                        required
                    />
                    {errors.otp && <span className="text-red-500 text-xs mt-1">{errors.otp.message}</span>}
                    <p className='text-xs text-neutral-400 mt-1'>Enter the 6-digit code sent to your email</p>
                <button
                    type="submit"
                    disabled={isLoading}
                    className='bg-blue-500 text-white py-2 px-4 w-full mt-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors'
                >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                </form>
            </div>

            <div className='flex flex-col gap-2'>

                <div className='flex items-center justify-between'>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={!canResend || isLoading}
                        className='text-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:underline'
                    >
                        Resend OTP
                    </button>
                    {!canResend && (
                        <span className='text-sm text-neutral-400'>
                            Resend in {formatTime(countdown)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
    // password step
    const renderPasswordStep = () => (
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-sm text-green-500 mb-2'>✓ OTP verified successfully!</p>
                <p className='text-sm text-neutral-400'>Now set your new password</p>
            </div>

            <form onSubmit={handleSubmit(handlePasswordSubmit)}>
                <div className='flex flex-col gap-4'>
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium mb-1'>New Password</label>
                        <div className='flex bg-neutral-600/30 rounded-xl items-center px-2'>
                            <input 
                                type={ispassVisible ? 'text' : 'password'} 
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })} 
                                placeholder='Enter your new password' 
                                className='w-full px-2 py-2 outline-none rounded-lg bg-transparent' 
                            />
                            <button 
                                type="button"
                                onClick={togglePasswordView}
                                className='text-neutral-400 hover:text-white'
                            >
                                {ispassVisible ? <Eye size={'20px'} /> : <EyeOff size={'20px'} />}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className='block text-sm font-medium mb-1'>Confirm Password</label>
                        <div className='flex bg-neutral-600/30 rounded-xl items-center px-2'>
                            <input 
                                type={ispassVisible ? 'text' : 'password'} 
                                {...register('confirmPassword', { 
                                    required: 'Please confirm your password',
                                    validate: (value, formValues) => {
                                        if (!value) return 'Please confirm your password'
                                        if (value !== formValues.password) return 'Passwords do not match'
                                        return true
                                    }
                                })} 
                                placeholder='Confirm your new password' 
                                className='w-full px-2 py-2 outline-none rounded-lg bg-transparent' 
                            />
                            <button 
                                type="button"
                                onClick={togglePasswordView}
                                className='text-neutral-400 hover:text-white'
                            >
                                {ispassVisible ? <Eye size={'20px'} /> : <EyeOff size={'20px'} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>}
            </div>
            
                    <button
                        type="submit"
                        disabled={isLoading}
                        className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Changing Password...' : 'Change Password'}
                    </button>
                </div>
        </form>
        </div>
    )

return (
    <div className='w-full'>
        {alert && (
            <motion.div className='fixed top-10 right-10 h-20 flex flex-col w-80  z-50' initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Alert variant="default" className='fixed top-10 right-10 h-20 flex flex-col w-80  z-50'>   
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                    Password changed successfully!
                </AlertDescription>
            </Alert>
            </motion.div>
        )}
        <div className='flex items-center justify-between mb-6'>
            <div className={`step ${currentStep === 'email' ? 'text-blue-500' : currentStep === 'otp' || currentStep === 'password' ? 'text-green-500' : 'text-neutral-400'}`}>
                <div className='w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium'>
                    {currentStep === 'email' ? '1' : '✓'}
                </div>
                <span className='text-xs mt-1'>Email</span>
            </div>
            <div className={`step ${currentStep === 'otp' ? 'text-blue-500' : currentStep === 'password' ? 'text-green-500' : 'text-neutral-400'}`}>
                <div className='w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium'>
                    {currentStep === 'password' ? '✓' : currentStep === 'otp' ? '2' : '2'}
                </div>
                <span className='text-xs mt-1'>OTP</span>
            </div>
            <div className={`step ${currentStep === 'password' ? 'text-blue-500' : 'text-neutral-400'}`}>
                <div className='w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium'>
                    3
                </div>
                <span className='text-xs mt-1'>Password</span>
            </div>
        </div>        

        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'otp' && renderOtpStep()}
        {currentStep === 'password' && renderPasswordStep()}
    </div>
  )
}

export default PasswordChange