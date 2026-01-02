"use client"

import * as React from "react"
import { ArrowUp, X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthModalProps {
    onClose: () => void
    onSuccess?: () => void
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
    const [step, setStep] = React.useState<'email' | 'otp'>('email')
    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState(false)
    const [otp, setOtp] = React.useState(["", "", "", ""])
    const [otpError, setOtpError] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [isResent, setIsResent] = React.useState(false)

    const otpRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email)
    }

    const handleEmailNext = () => {
        if (!validateEmail(email)) {
            setError(true)
        } else {
            setError(false)
            setStep('otp')
        }
    }

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value[value.length - 1]

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (otpError) setOtpError(false)
        if (isResent) setIsResent(false)

        // Auto focus next input
        if (value !== "" && index < 3) {
            otpRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && otp[index] === "" && index > 0) {
            otpRefs.current[index - 1]?.focus()
        }
    }

    const handleVerification = () => {
        const fullOtp = otp.join("")
        if (fullOtp === "0000") {
            setOtpError(false)
            setIsSuccess(true)
            setTimeout(() => {
                onSuccess?.()
            }, 1500)
        } else {
            setOtpError(true)
            setIsResent(false)
        }
    }

    const handleResend = () => {
        setIsResent(true)
        setOtpError(false)
        setOtp(["", "", "", ""])
        otpRefs.current[0]?.focus()
    }

    return (
        <div
            className="w-full max-w-[440px] p-10 pt-12 text-center space-y-8 relative overflow-hidden backdrop-blur-[10px]"
            style={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(55, 49, 49, 0.15)',
                border: '2px solid #FFFFFF33',
                borderRadius: '40px',
            }}
        >
            <div className="space-y-4">
                <h2 className="text-[24px] font-extrabold text-[#FFFFFF] leading-[120%] tracking-[0.01em]">
                    Create an account to continue
                </h2>
                <p className="text-[14px] text-[#FFFFFF]/60 font-medium">
                    {step === 'email' ? 'Enter your email to get started.' : 'Check your email for the code.'}
                </p>
            </div>

            <div className="space-y-6">
                {step === 'email' ? (
                    <div className="space-y-3 text-left">
                        <label htmlFor="email" className="text-[16px] font-medium text-white/90 px-1">
                            Email
                        </label>
                        <div className="space-y-2">
                            <input
                                id="email"
                                placeholder="you@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (error) setError(false)
                                }}
                                className={`w-full h-[56px] px-6 rounded-[15px] bg-[#37313133] border transition-all focus:outline-none focus:ring-1 ${error
                                    ? 'border-[#EF4444] text-[#EF4444] focus:ring-[#EF4444]/50'
                                    : 'border-white/10 text-white focus:ring-[#E86630]/50'
                                    } placeholder:text-white/30`}
                            />
                            {error && (
                                <p className="text-[#EF4444] text-[12px] font-medium px-1">
                                    That doesn't look like a valid email.
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3 text-left">
                        <label className="text-[16px] font-medium text-white/90 px-1">
                            Code
                        </label>
                        <div className="flex justify-between gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { otpRefs.current[index] = el }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-[78px] h-[56px] text-center text-[20px] font-bold rounded-[15px] bg-[#37313133] border transition-all focus:outline-none focus:ring-1 ${otpError
                                        ? 'border-[#EF4444] text-[#EF4444] focus:ring-[#EF4444]/50'
                                        : 'border-white/10 text-white focus:ring-[#E86630]/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <Button
                    onClick={step === 'email' ? handleEmailNext : handleVerification}
                    className="w-full h-[60px] rounded-full text-white font-bold text-[18px] transition-all hover:scale-[1.02] border-none"
                    style={{
                        backgroundColor: '#E86630',
                        boxShadow: 'inset 0px 4px 4px 0px #FFFFFF40, inset -2px 0px 4px 0px #FFFFFF40, inset 4px 0px 6px 0px #FFFFFF40, inset 4px -4px 4px 0px #C03E08'
                    }}
                >
                    Next
                </Button>

                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={step === 'email' ? onClose : handleResend}
                        className="text-white font-semibold text-[16px] hover:text-white/80 transition-colors"
                    >
                        {step === 'email' ? 'Not now' : <span>Can’t find it? <span className="underline">Resend</span></span>}
                    </button>

                    {/* Success/Error/Resend Message Boxes */}
                    {isSuccess && (
                        <div className="w-full h-[52px] flex items-center gap-3 px-4 rounded-[15px] bg-[#22C55E1A] border border-[#22C55E4D] animate-in fade-in zoom-in duration-300">
                            <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 4.5L4 7.5L11 0.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-[#22C55E] text-[14px] font-semibold">
                                Signed in successfully — redirecting...
                            </p>
                        </div>
                    )}

                    {otpError && (
                        <div className="w-full h-[52px] flex items-center gap-3 px-4 rounded-[15px] bg-[#EF44441A] border border-[#EF4444] animate-in slide-in-from-top-2 duration-300">
                            <div className="w-5 h-5 rounded-full bg-[#EF4444] flex items-center justify-center">
                                <span className="text-white text-[12px] font-bold">!</span>
                            </div>
                            <p className="text-[#EF4444] text-[14px] font-semibold underline decoration-[#7C3AED]">
                                The code didn't match. Try again.
                            </p>
                        </div>
                    )}

                    {isResent && !isSuccess && (
                        <div className="w-full h-[64px] flex items-center gap-3 px-5 rounded-[15px] bg-[#FFFFFF1A] border border-[#FFFFFF33] animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <Mail className="w-5 h-5 text-white/80" />
                            <p className="text-white/80 text-[14px] font-medium text-left leading-snug">
                                We’ve sent a new code, check your inbox.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
