'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useUser } from './UserContext'

interface EditProfileModalProps {
  isOpen: boolean
  onBack: () => void
}

export default function EditProfileModal({ isOpen, onBack }: EditProfileModalProps) {
  const { profile, updateProfile, isLoading } = useUser()
  const modalRef = useRef<HTMLDivElement>(null)
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen && profile?.username) {
      setUsername(profile.username)
      setError('')
    }
  }, [isOpen, profile?.username])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onBack()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onBack])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onBack()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onBack])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim().length > 0) {
      try {
        setError('')
        await updateProfile({ username: username.trim() })
        onBack()
              } catch {
          setError('Не удалось обновить профиль. Попробуйте еще раз.')
        }
    }
  }

  const handleEditAvatar = () => {
    console.log('Edit avatar clicked')
  }

  if (typeof window === 'undefined' || !isOpen) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-md mx-auto rounded-[24px] shadow-2xl max-h-[80vh] overflow-hidden"
            style={{ boxShadow: '0 0 32px 0 #794DFD55, 0 8px 32px 0 #0008' }}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32, duration: 0.35 }}
          >
            <div className="bg-[#131420] rounded-[24px] p-6 flex flex-col relative max-h-[80vh] overflow-y-auto">
              <button
                className="absolute top-6 left-6 text-gray-400 hover:text-white text-xl focus:outline-none transition-colors"
                onClick={onBack}
                aria-label="Back"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <motion.div
                className="flex flex-col items-center mt-8 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#794DFD]">
                    <Image
                      src={profile?.avatar as string || "/images/profile.png"}
                      alt="Profile"
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleEditAvatar}
                  className="w-full bg-[#794DFD] text-white text-sm font-medium py-3 px-4 rounded-xl hover:bg-[#6B42F0] transition-colors mb-6"
                >
                  Edit avatar
                </button>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="w-full space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">User name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#3A3F58] border border-[#4A5068] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#794DFD] transition-colors"
                    placeholder="Enter your username"
                    required
                  />
                  <p className="text-gray-400 text-xs mt-2">
                    Please do not use special punctuation marks or your account may not be found!
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#794DFD] text-white text-sm font-medium py-3 px-4 rounded-xl hover:bg-[#6B42F0] transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!username.trim() || isLoading}
                >
                  {isLoading ? 'Сохранение...' : 'Save changes'}
                </button>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
} 