import React, { useState, useRef } from 'react'
import { Paperclip, Globe, Mic, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

const ChatInputBox = ({ onSend, placeholder = "Type your message here..." }) => {
  const [message, setMessage] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log('File selected:', file.name)
    }
  }

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
  }

  const iconVariants = {
    hover: {
      scale: 1.1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Background gradient container */}
      <div className="bg-gradient-to-r from-pink-500/20 via-orange-500/20 to-pink-500/20 rounded-3xl p-1 backdrop-blur-sm">
        {/* Main input container */}
        <div className="flex items-end gap-3 px-4 py-6 bg-neutral-800 rounded-2xl shadow-lg border border-neutral-600">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-neutral-400 text-lg leading-relaxed"
              rows={7}
              style={{ minHeight: '80px', maxHeight: '80px' }}
            />
          </div>

          {/* Icon group: Globe, Image */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleSearchToggle}
              className={`p-2 rounded-2xl transition-all duration-200 ${
                isSearchActive 
                  ? 'bg-neutral-600/50 text-white' 
                  : 'text-neutral-400 hover:text-neutral-300'
              }`}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <AnimatePresence mode="wait">
                {isSearchActive ? (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1"
                  >
                    <Globe size={16} />
                    <span className="text-xs">Search</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="globe"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Globe size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={handleFileUpload}
              className="p-2 text-neutral-400 hover:text-neutral-300 transition-colors duration-200"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Paperclip size={18} />
            </motion.button>

            {/* Glowing separator line */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-neutral-500 to-transparent mx-1 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
            </div>

            {/* Microphone/Send icon */}
            <motion.button
              onClick={message.trim() ? handleSend : undefined}
              disabled={!message.trim()}
              className={`p-2 rounded-lg transition-all duration-200 ${
                message.trim() 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'text-neutral-400 hover:text-neutral-300'
              }`}
              variants={iconVariants}
              whileHover={message.trim() ? "hover" : "hover"}
              whileTap="tap"
            >
              <AnimatePresence mode="wait">
                {message.trim() ? (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mic size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
      />
    </div>
  )
}

export default ChatInputBox 