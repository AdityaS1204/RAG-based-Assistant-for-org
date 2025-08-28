import React from 'react'
import AdminDashboardSidebar from '../../components/custom/AdminDashboardSidebar'
import UsersTable from '../../components/custom/UsersTable'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const UsersList = () => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    console.log('Logging out...')
    navigate('/login')
  }
  
  return (
    <section className="flex h-screen bg-neutral-800 text-white overflow-hidden">
      <AdminDashboardSidebar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-20' : 'ml-64'}`}>
        <header className="flex items-center justify-end p-4 bg-neutral-900">
          {/* Avatar and Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
              className="w-8 h-8 rounded-full bg-neutral-600 hover:bg-neutral-500 transition-colors duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={16} className="text-white" />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isAvatarDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-neutral-600 rounded-lg shadow-xl z-50"
                >
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-neutral-700 transition-colors duration-200 text-left"
                    >
                      <LogOut size={16} className="text-red-400" />
                      <span className="text-red-400">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">          
            {/* Users Table */}
            <UsersTable />
          </div>
        </div>
      </div>
    </section>
  )
}

export default UsersList