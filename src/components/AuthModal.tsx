"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "./UserContext";
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { SVGProps } from 'react';

export const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
    <path d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z" fill="currentColor" />
  </svg>
);

export const LockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
    <path d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z" fill="currentColor" />
    <path d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z" fill="currentColor" />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "login" | "register";
  switchMode: () => void;
}

export default function AuthModal({ isOpen, onOpenChange, mode, switchMode }: AuthModalProps) {
  const { login, register, isLoading, error } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const casinoGradient = 'bg-gradient-to-br from-[#794DFD] via-[#B09DFF] to-[#1B1C2D]';

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onOpenChange]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError(null);
    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          setFormError("Passwords do not match");
          return;
        }
        await register({ email, password });
      } else {
        await login({ email, password });
      }
      onOpenChange(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message || "Authentication failed");
      } else {
        setFormError("Authentication failed");
      }
    }
  };

  if (typeof window === 'undefined' || !isOpen) return null;

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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-md mx-auto rounded-[28px] p-[2px] shadow-2xl"
            style={{ boxShadow: '0 0 32px 0 #794DFD55, 0 8px 32px 0 #0008' }}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32, duration: 0.35 }}
          >
            <div className={`${casinoGradient} rounded-[26px] p-1`}>
              <div className="relative bg-[#131420] rounded-[24px] px-8 py-8 md:px-10 md:py-10 flex flex-col items-center">
                <motion.div
                  className="mb-4 flex justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
                >
                  <Image src="/images/logo.png" alt="Casino Logo" width={48} height={48} className="rounded-full shadow-lg border-2 border-[#794DFD] bg-[#18181b]" />
                </motion.div>
                <button
                  className="absolute top-5 right-5 text-neutral-400 hover:text-[#794DFD] text-2xl focus:outline-none transition-colors group"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close"
                  style={{ filter: 'drop-shadow(0 2px 8px #794DFD44)' }}
                >
                  <span className="inline-flex items-center justify-center rounded-full transition-all duration-200 group-hover:bg-[#23233A] group-hover:scale-110 group-hover:shadow-[0_0_8px_2px_#794DFD55]">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14" cy="14" r="14" fill="#23233A"/>
                      <path d="M18 10L10 18" stroke="#B09DFF" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M10 10L18 18" stroke="#B09DFF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <motion.h2
                  className="text-2xl font-extrabold mb-6 text-white text-center tracking-tight drop-shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.4, type: 'spring', stiffness: 200 }}
                >
                  {mode === "login" ? "Welcome Back!" : "Create Your Account"}
                </motion.h2>
                <motion.form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } }
                  }}
                >
                  {mode === "register" && (
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    >
                      <label className="block text-sm font-semibold text-[#B09DFF] mb-1">Confirm Password</label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-2 rounded-xl bg-[#23233A] border border-[#35374F] text-white focus:outline-none focus:ring-2 focus:ring-[#794DFD] placeholder:text-[#7E7E7E] font-medium pr-10 shadow-sm transition-all duration-200 hover:border-[#794DFD] focus:border-[#794DFD]"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B09DFF]">
                          <LockIcon />
                        </span>
                      </div>
                    </motion.div>
                  )}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <label className="block text-sm font-semibold text-[#B09DFF] mb-1">Email</label>
                    <div className="relative">
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-[#23233A] border border-[#35374F] text-white focus:outline-none focus:ring-2 focus:ring-[#794DFD] placeholder:text-[#7E7E7E] font-medium pr-10 shadow-sm transition-all duration-200 hover:border-[#794DFD] focus:border-[#794DFD]"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B09DFF]">
                        <MailIcon />
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <label className="block text-sm font-semibold text-[#B09DFF] mb-1">Password</label>
                    <div className="relative">
                      <input
                        className="w-full px-4 py-2 rounded-xl bg-[#23233A] border border-[#35374F] text-white focus:outline-none focus:ring-2 focus:ring-[#794DFD] placeholder:text-[#7E7E7E] font-medium pr-10 shadow-sm transition-all duration-200 hover:border-[#794DFD] focus:border-[#794DFD]"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B09DFF]">
                        <LockIcon />
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-between py-2 px-1 mb-2"
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <label className="flex items-center gap-2 text-[#B09DFF] text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                        className="accent-[#794DFD] rounded transition-all duration-200 hover:accent-[#B09DFF]"
                      />
                      Remember me
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        className="text-[#794DFD] text-sm hover:underline font-medium transition-colors duration-200 hover:text-[#B09DFF]"
                        tabIndex={-1}
                      >
                        Forgot password?
                      </button>
                    )}
                  </motion.div>
                  {(formError || error) && (
                    <motion.div
                      className="text-red-500 text-sm mb-2 text-center font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >{formError || error}</motion.div>
                  )}
                  <motion.div
                    className="flex flex-col gap-3 mt-4"
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <div className="flex gap-2 justify-end items-stretch">
                      <motion.button
                        type="button"
                        className="px-4 py-2 rounded-xl bg-[#23233A] text-[#B09DFF] font-semibold hover:bg-[#35374F] transition-colors border border-[#35374F] shadow-sm focus:ring-2 focus:ring-[#794DFD] focus:outline-none text-sm h-full"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#794DFD] to-[#B09DFF] text-white font-bold shadow-lg hover:from-[#6B42F0] hover:to-[#B09DFF] transition-all duration-200 disabled:opacity-60 focus:ring-2 focus:ring-[#794DFD] focus:outline-none text-base border-0"
                        disabled={isLoading}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 16px #794DFD88' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {mode === "login" ? "Sign in" : "Sign up"}
                      </motion.button>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#35374F] to-transparent my-2" />
                  </motion.div>
                </motion.form>
                <motion.div
                  className="text-center pt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, type: 'spring', stiffness: 200 }}
                >
                  {mode === "login" ? (
                    <span className="text-[#B09DFF] text-sm font-medium">
                      Don&apos;t have an account?{' '}
                      <button className="text-[#794DFD] underline font-bold transition-colors duration-200 hover:text-[#B09DFF]" onClick={switchMode} type="button">
                        Sign up
                      </button>
                    </span>
                  ) : (
                    <span className="text-[#B09DFF] text-sm font-medium">
                      Already have an account?{' '}
                      <button className="text-[#794DFD] underline font-bold transition-colors duration-200 hover:text-[#B09DFF]" onClick={switchMode} type="button">
                        Log in
                      </button>
                    </span>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
} 