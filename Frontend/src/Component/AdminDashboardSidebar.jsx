import { ChartPie, Settings, PanelLeft, PanelLeftClose, Plus, User, Upload, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import React from 'react'

const AdminDashboardSidebar = ({ onNewChat, onSidebarToggle }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(true)
    
    const onUsers = () => {
        navigate('/admin/users')
    }
    
    const onOverview = () => {
        navigate('/dashboard')
    }
    
    const AllUploads = () => {
        navigate('/admin/uploads')
    }
    
    const onActivityLogs = () => {
        navigate('/admin/activity-logs')
    }
    
    const toggleSidebar = () => {
        const newState = !isOpen
        setIsOpen(newState)
        if (onSidebarToggle) {
            onSidebarToggle(newState)
        }
    }

    // Helper function to check if a route is active
    const isActiveRoute = (route) => {
        return location.pathname === route
    }

    // Helper function to get button classes based on active state
    const getButtonClasses = (isActive) => {
        const baseClasses = "flex items-center gap-3 w-full p-2 rounded-lg transition-colors duration-200 cursor-pointer"
        return isActive 
            ? `${baseClasses} bg-neutral-700/50` 
            : `${baseClasses} hover:bg-neutral-700/50`
    }

    const sidebarVariants = {
        open: {
            width: 256,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        closed: {
            width: 80,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    }

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        },
        closed: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.2
            }
        }
    }

    const buttonVariants = {
        open: {
            rotate: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        closed: {
            rotate: 180,
            scale: 0.8,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    }


    return (
        <div className="relative">
            {/* Toggle Button - Positioned relative to sidebar */}
            <motion.button
                onClick={toggleSidebar}
                className="fixed top-10 z-50 p-2 border-2 border-neutral-600 rounded-lg backdrop-blur-sm hover:bg-neutral-700 transition-colors duration-200"
                style={{
                    left: isOpen ? '200px' : '20px'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PanelLeftClose size={18} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PanelLeft size={18} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Sidebar */}
            <motion.div
                className="fixed top-0 left-0 h-full bg-neutral-900 backdrop-blur-md border-r border-neutral-600 z-40 overflow-hidden"
                variants={sidebarVariants}
                animate={isOpen ? "open" : "closed"}
                initial="open"
            >
                <div className="flex flex-col h-full p-6 min-w-[80px]">
                    {/* Logo Section */}
                    <motion.div
                        className="flex items-center justify-start mb-8 pt-4"
                        variants={itemVariants}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="logo"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex items-center gap-3"
                                >
                                    <motion.svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <rect width="50" height="50" rx="10" ry="10" fill="#e4e892" />
                                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="bold" fill="#000">UR</text>
                                    </motion.svg>
                                    <span className="text-white text-lg font-bold">UNIRAG.</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="logo-icon"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex justify-center"
                                >
                                    <motion.svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <rect width="50" height="50" rx="10" ry="10" fill="#e4e892" />
                                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="bold" fill="#000">UR</text>
                                    </motion.svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* New Chat Button */}
                    {/* <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.button
                        key="new-chat-full"
                        onClick={onNewChat}
                        className="flex items-center gap-3 w-full p-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors duration-300 mb-6 group"
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            whileHover={{ rotate: 90 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Plus size={20} />
                        </motion.div>
                        <span className="font-medium">New Chat</span>
                    </motion.button>
                ) : (
                    <motion.button
                        key="new-chat-icon"
                        onClick={onNewChat}
                        className="flex items-center justify-center w-full p-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors duration-300 mb-6 group"
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            whileHover={{ rotate: 90 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Plus size={20} />
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence> */}

                    {/* Navigation Items */}
                    <div className="flex-1 border-t border-neutral-600 py-3">
                        <div className="space-y-1">
                            {/* Overview Button */}
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.button
                                        key="overview-full"
                                        onClick={onOverview}
                                        className={getButtonClasses(isActiveRoute('/dashboard'))}
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ChartPie size={16} className="text-neutral-400" />
                                        <span className="text-neutral-300 text-sm">Overview</span>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        key="overview-icon"
                                        onClick={onOverview}
                                        className={getButtonClasses(isActiveRoute('/dashboard'))}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ChartPie size={18} className="text-neutral-400" />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Users Button */}
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.button
                                        key="users-full"
                                        onClick={onUsers}
                                        className={getButtonClasses(isActiveRoute('/admin/users'))}
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <User size={16} className="text-neutral-400" />
                                        <span className="text-neutral-300 text-sm">Users</span>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        key="users-icon"
                                        onClick={onUsers}
                                        className={getButtonClasses(isActiveRoute('/admin/users'))}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <User size={18} className="text-neutral-400" />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Uploads Button */}
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.button
                                        key="uploads-full"
                                        onClick={AllUploads}
                                        className={getButtonClasses(isActiveRoute('/admin/uploads'))}
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Upload size={16} className="text-neutral-400" />
                                        <span className="text-neutral-300 text-sm">Uploads</span>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        key="uploads-icon"
                                        onClick={AllUploads}
                                        className={getButtonClasses(isActiveRoute('/admin/uploads'))}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Upload size={18} className="text-neutral-400" />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Activity Logs Button */}
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.button
                                        key="activity-full"
                                        onClick={onActivityLogs}
                                        className={getButtonClasses(isActiveRoute('/admin/activity-logs'))}
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Activity size={16} className="text-neutral-400" />
                                        <span className="text-neutral-300 text-sm">Activity Logs</span>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        key="activity-icon"
                                        onClick={onActivityLogs}
                                        className={getButtonClasses(isActiveRoute('/admin/activity-logs'))}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Activity size={18} className="text-neutral-400" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Settings Section - Bottom */}
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="settings-full"
                                className="border-t border-neutral-600 pt-4"
                                variants={itemVariants}
                            >
                                <motion.button
                                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-neutral-700/50 transition-colors duration-200 text-left"
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 180 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Settings size={20} className="text-neutral-400" />
                                    </motion.div>
                                    <span className="text-neutral-300">Settings</span>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="settings-icon"
                                className="border-t border-neutral-600 pt-4"
                                variants={itemVariants}
                            >
                                <motion.button
                                    className="flex items-center justify-center w-full p-3 rounded-lg hover:bg-neutral-700/50 transition-colors duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 180 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Settings size={20} className="text-neutral-400" />
                                    </motion.div>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}

export default AdminDashboardSidebar