'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useUser } from './UserContext'
import PasswordModal from './PasswordModal'
import EditProfileModal from './EditProfileModal'

interface ProfileModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProfileModal({ isOpen, onOpenChange }: ProfileModalProps) {
  const { profile } = useUser()
  const modalRef = useRef<HTMLDivElement>(null)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isPasswordModalOpen && !isEditProfileModalOpen) onOpenChange(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onOpenChange, isPasswordModalOpen, isEditProfileModalOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isPasswordModalOpen && !isEditProfileModalOpen) {
        onOpenChange(false)
      }
    }
    if (isOpen && !isPasswordModalOpen && !isEditProfileModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onOpenChange, isPasswordModalOpen, isEditProfileModalOpen])

  if (typeof window === 'undefined' || !isOpen) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
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
            <div className="bg-[#131420] rounded-[24px] p-6 flex flex-col items-center relative max-h-[80vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl focus:outline-none transition-colors"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <motion.div
                className="flex flex-col items-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="relative mb-4">
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
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h2 className="text-white text-lg font-bold uppercase tracking-wide">
                      {profile?.username || 'ДМИТРИЙ УТКИН'}
                    </h2>
                    <button
                      onClick={() => setIsEditProfileModalOpen(true)}
                      className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                      aria-label="Edit profile"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    ID: {profile?.id || '5765554'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="w-full space-y-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="bg-[#3C415A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src="/images/statistics-diagram.png"
                      alt="Statistics"
                      width={18}
                      height={18}
                    />
                    <span className="text-white font-medium">Statistics</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-[#4A5068] rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Image
                          src="/images/totalwins-stars.png"
                          alt="Total wins"
                          width={16}
                          height={16}
                        />
                        <span className="text-gray-300 text-sm">Total wins</span>
                      </div>
                      <p className="text-white font-bold text-xl">0</p>
                    </div>
                    <div className="bg-[#4A5068] rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Image
                          src="/images/totalbets-coin.png"
                          alt="Total bets"
                          width={16}
                          height={16}
                        />
                        <span className="text-gray-300 text-sm">Total bets</span>
                      </div>
                      <p className="text-white font-bold text-xl">0</p>
                    </div>
                  </div>

                  <div className="bg-[#4A5068] rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Image
                        src="/images/amountofbets-coins.png"
                        alt="Amount of bets"
                        width={16}
                        height={16}
                      />
                      <span className="text-gray-300 text-sm">Amount of bets</span>
                    </div>
                    <p className="text-white font-bold text-xl">0.00 P</p>
                  </div>
                </div>

                <div className="bg-[#3C415A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="white"/>
                    </svg>
                    <span className="text-white font-medium">Security</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#4A5068] rounded-xl p-4">
                      <div className="flex flex-col items-start text-left">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
                          <path d="M18 11V8C18 5.79086 16.2091 4 14 4H10C7.79086 4 6 5.79086 6 8V11C5.44772 11 5 11.4477 5 12V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V12C19 11.4477 18.5523 11 18 11ZM8 8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V11H8V8Z" fill="white"/>
                        </svg>
                        <div className="w-full">
                          <h3 className="text-white text-lg font-medium mb-1">Set a Password</h3>
                          <p className="text-gray-400 text-sm mb-4">Create a new password for your account</p>
                          <button 
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="w-full bg-[#794DFD] text-white text-sm font-medium py-3 px-4 rounded-xl hover:bg-[#6B42F0] transition-colors"
                          >
                            Create a New Password
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#4A5068] rounded-xl p-4 relative">
                      <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center absolute top-4 right-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="white"/>
                          <polyline points="22,6 12,13 2,6" stroke="#4A5068" strokeWidth="2"/>
                        </svg>
                        <div className="w-full">
                          <h3 className="text-white text-lg font-medium mb-1">Email Address Confirmation</h3>
                          <p className="text-gray-400 text-sm">If you want to change your email address, please contact our support team.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {createPortal(modalContent, document.body)}
      <PasswordModal 
        isOpen={isPasswordModalOpen} 
        onOpenChange={setIsPasswordModalOpen}
        onBack={() => setIsPasswordModalOpen(false)}
      />
      <EditProfileModal 
        isOpen={isEditProfileModalOpen} 
        onBack={() => setIsEditProfileModalOpen(false)}
      />
    </>
  )
} 