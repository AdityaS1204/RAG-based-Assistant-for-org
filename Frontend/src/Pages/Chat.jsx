import React, { useState, useRef } from 'react'
import Sidebar from '../Component/Sidebar'
import ChatInputBox from '../Component/ChatInputBox'
import { LogOut, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
 
const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [hasStartedChat, setHasStartedChat] = useState(false)
  
  
  const username = "Albert Rangari"

  const handleNewChat = () => {
    console.log('New chat requested')
    setMessages([])
    setHasStartedChat(false)
  }

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen)
  }

  const handleSendMessage = (message) => {
    console.log('Sending message:', message)
    if (!hasStartedChat) {
      setHasStartedChat(true)
    }
    
    // Add user message to chat
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    
    // Simulate AI response (you can replace this with actual API call)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: "This is a simulated AI response. In a real implementation, this would be the actual AI response from your backend.",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  const handleLogout = () => {
    console.log('Logging out...')
    // Add logout logic here
  }

  return (
    <div className="flex h-screen bg-neutral-800 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar onNewChat={handleNewChat} onSidebarToggle={handleSidebarToggle} />

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
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

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto bg-neutral-800">
          {!hasStartedChat ? (
            // Welcome screen with centered prompt
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-2xl px-4">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6"
                  >
                    <h2 className="text-3xl font-semibold mb-2 text-white">Welcome, {username}</h2>
                    <p className="text-neutral-300">Ask me anything about your university resources and information</p>
                  </motion.div>
                </div>
                
                {/* Centered Chat Input Box */}
                <ChatInputBox 
                  onSend={handleSendMessage}
                  placeholder="Ask me anything about your university..."
                />
              </div>
            </div>
          ) : (
            // Chat messages view
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <rect width="50" height="50" rx="10" ry="10" fill="#e4e892" />
                          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold" fill="#000">UR</text>
                        </svg>
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-neutral-800 text-white border border-neutral-600'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center flex-shrink-0 order-1">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Box at bottom when chat has started */}
        {hasStartedChat && (
          <div className="bg-neutral-800 border-t border-neutral-600 p-4">
            <div className="max-w-4xl mx-auto">
              <ChatInputBox 
                onSend={handleSendMessage}
                placeholder="Message UniRAG..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat 