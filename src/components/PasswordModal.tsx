'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useUser } from './UserContext'

interface PasswordModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
}

export default function PasswordModal({ isOpen, onBack }: PasswordModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const { updatePassword, isLoading, error } = useUser();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
    setFormError(null);
    setSuccess(false);
    if (
      currentPassword.length > 0 &&
      password === confirmPassword &&
      password.length > 0
    ) {
      try {
        await updatePassword(currentPassword, password);
        setSuccess(true);
        onBack();
      } catch (err: unknown) {
        const message = typeof err === 'object' && err && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'Failed to update password';
        setFormError(message);
      }
    } else {
      setFormError('Passwords do not match or fields are empty');
    }
  }

  if (typeof window === 'undefined' || !isOpen) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
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
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 11V8C18 5.79086 16.2091 4 14 4H10C7.79086 4 6 5.79086 6 8V11C5.44772 11 5 11.4477 5 12V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V12C19 11.4477 18.5523 11 18 11ZM8 8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V11H8V8Z" fill="#131420"/>
                  </svg>
                </div>
                
                <h2 className="text-white text-xl font-medium mb-8">Create a New Password</h2>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="w-full space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Current password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#3A3F58] border border-[#4A5068] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#794DFD] transition-colors"
                    placeholder="••••••••••••••••••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#3A3F58] border border-[#4A5068] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#794DFD] transition-colors"
                    placeholder="••••••••••••••••••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#3A3F58] border border-[#4A5068] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#794DFD] transition-colors"
                    placeholder="••••••••••••••••••••••••"
                    required
                  />
                </div>
                {formError && (
                  <div className="text-red-500 text-sm">{formError}</div>
                )}
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
                {success && (
                  <div className="text-green-500 text-sm">Password updated successfully!</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#794DFD] text-white text-sm font-medium py-3 px-4 rounded-xl hover:bg-[#6B42F0] transition-colors mt-8"
                  disabled={
                    !currentPassword ||
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword ||
                    isLoading
                  }
                >
                  {isLoading ? 'Saving...' : 'Save changes'}
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