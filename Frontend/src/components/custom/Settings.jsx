import React, { useState } from 'react'
import { User, Palette } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const Setting = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('account')
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            assistantName: 'Assistant',
            systemInstruction: 'You are a helpful AI assistant for university students and staff.',
            assistantTraits: 'Professional, knowledgeable, friendly, and patient.'
        }
    })

    const onSubmit = (data) => {
        console.log('Personalization settings:', data)
        // Handle form submission
    }

    const userData = {
        name: 'Gaurav Yadav',
        email: 'gaurav.yadav@ghrietn.raisoni.net',
        role: 'Student',
        department: 'Information Technology',
        studentId: 'IT20240010'
    }

    return (
        <Modal isOpen={isOpen} size='lg' onClose={onClose}>
            <div className="flex h-[400px] bg-neutral-800 rounded-lg overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-64 bg-neutral-800 p-6 border-r border-neutral-600">
                    <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
                    
                    {/* Tab Navigation */}
                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 text-left ${
                                activeTab === 'account' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-neutral-300 hover:bg-neutral-700/50'
                            }`}
                        >
                            <User size={18} />
                            <span>Account</span>
                        </button>
                        
                        <button
                            onClick={() => setActiveTab('personalization')}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 text-left ${
                                activeTab === 'personalization' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-neutral-300 hover:bg-neutral-700/50'
                            }`}
                        >
                            <Palette size={18} />
                            <span>Personalization</span>
                        </button>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === 'account' ? (
                            <motion.div
                                key="account"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">Account Details</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-neutral-700/50 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="text-neutral-400 text-sm">Full Name</Label>
                                                    <p className="text-white font-medium">{userData.name}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-neutral-400 text-sm">Email</Label>
                                                    <p className="text-white font-medium">{userData.email}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-neutral-400 text-sm">Role</Label>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                                        {userData.role}
                                                    </span>
                                                </div>
                                                <div>
                                                    <Label className="text-neutral-400 text-sm">Department</Label>
                                                    <p className="text-white font-medium">{userData.department}</p>
                                                </div>
                                                {userData.role === 'Student' && (
                                                    <div>
                                                        <Label className="text-neutral-400 text-sm">Student ID</Label>
                                                        <p className="text-white font-medium">{userData.studentId}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="personalization"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">AI Assistant Personalization</h3>
                                    
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="assistantName" className="text-white">
                                                    What should the assistant call you?
                                                </Label>
                                                <Input
                                                    id="assistantName"
                                                    {...register('assistantName', { 
                                                        required: 'This field is required' 
                                                    })}
                                                    placeholder="Enter your preferred name"
                                                    className="mt-2 bg-neutral-700/50 border-neutral-500 text-white placeholder:text-neutral-400 focus:border-blue-500"
                                                />
                                                {errors.assistantName && (
                                                    <span className="text-red-400 text-sm mt-1">{errors.assistantName.message}</span>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="systemInstruction" className="text-white">
                                                    System Instruction
                                                </Label>
                                                <Textarea
                                                    id="systemInstruction"
                                                    {...register('systemInstruction', { 
                                                        required: 'This field is required',
                                                        minLength: {
                                                            value: 10,
                                                            message: 'System instruction must be at least 10 characters'
                                                        }
                                                    })}
                                                    placeholder="Define how the assistant should behave..."
                                                    rows={4}
                                                    className="mt-2 bg-neutral-700/50 border-neutral-500 text-white placeholder:text-neutral-400 focus:border-blue-500 resize-none"
                                                />
                                                {errors.systemInstruction && (
                                                    <span className="text-red-400 text-sm mt-1">{errors.systemInstruction.message}</span>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="assistantTraits" className="text-white">
                                                    What traits should the assistant have?
                                                </Label>
                                                <Textarea
                                                    id="assistantTraits"
                                                    {...register('assistantTraits', { 
                                                        required: 'This field is required',
                                                        minLength: {
                                                            value: 5,
                                                            message: 'Traits must be at least 5 characters'
                                                        }
                                                    })}
                                                    placeholder="Describe the assistant's personality traits..."
                                                    rows={3}
                                                    className="mt-2 bg-neutral-700/50 border-neutral-500 text-white placeholder:text-neutral-400 focus:border-blue-500 resize-none"
                                                />
                                                {errors.assistantTraits && (
                                                    <span className="text-red-400 text-sm mt-1">{errors.assistantTraits.message}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                Save Changes
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={onClose}
                                                className="border-neutral-500 text-neutral-300 bg-red-500 hover:bg-neutral-700/50"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    )
}

export default Setting
