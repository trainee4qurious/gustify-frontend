"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, MoreHorizontal, FileText, Circle, User, Info, Calendar, Pin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputArea } from "./input-area"

interface SummaryViewProps {
    onBack: () => void
    onViewChange?: (view: 'landing' | 'feed' | 'auth' | 'privacy' | 'terms' | 'subscription' | 'recording' | 'processing' | 'summary') => void
    showAudioPlayer?: boolean
    isLoggedIn?: boolean
    onLogout?: () => void
}

export function SummaryView({ onBack, onViewChange, showAudioPlayer = true, isLoggedIn, onLogout }: SummaryViewProps) {
    const [inputValue, setInputValue] = React.useState("")
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const [micError, setMicError] = React.useState(false)
    const menuRef = React.useRef<HTMLDivElement>(null)

    const handleMicClick = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicError(false);
            // In SummaryView, mic click might trigger a new recording or follow-up
            // For now, let's keep it consistent with the dashboard
        } catch (err) {
            setMicError(true);
        }
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            // Handle follow-up query
        }
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isMenuOpen])

    const menuItems = isLoggedIn ? [
        { label: 'Settings', onClick: () => { /* Handle Settings */ setIsMenuOpen(false) } },
        { label: 'Subscription', onClick: () => { onViewChange?.('subscription'); setIsMenuOpen(false) }, color: 'text-[#EBB305]' },
        { label: 'Feedback', onClick: () => { /* Handle Feedback */ setIsMenuOpen(false) } },
        { label: 'Privacy Policy', onClick: () => { onViewChange?.('privacy'); setIsMenuOpen(false) } },
        { label: 'Terms & Conditions', onClick: () => { onViewChange?.('terms'); setIsMenuOpen(false) } },
        { label: 'Log out', onClick: () => { onLogout?.(); setIsMenuOpen(false) }, color: 'text-[#EF4444]' },
    ] : [
        { label: 'Subscription', onClick: () => { onViewChange?.('subscription'); setIsMenuOpen(false) }, color: 'text-[#EBB305]' },
        { label: 'Privacy Policy', onClick: () => { onViewChange?.('privacy'); setIsMenuOpen(false) } },
        { label: 'Terms & Conditions', onClick: () => { onViewChange?.('terms'); setIsMenuOpen(false) } },
    ]

    return (
        <div className="min-h-screen pb-40">
            {/* Custom Pill Header */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-50">
                <div
                    className="flex items-center justify-between h-[60px] px-8 rounded-full border border-[#3731310D] bg-[#FEF1E94D] backdrop-blur-md relative"
                    style={{ boxShadow: 'inset 0px 4px 4px rgba(255, 201, 178, 0.5)' }}
                >
                    <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#373131]" />
                    </button>

                    <div className="w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => onViewChange?.(isLoggedIn ? 'feed' : 'landing')}>
                        <Image
                            src="/Icon.svg"
                            alt="Gustify Logo"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <MoreHorizontal className="w-5 h-5 text-[#373131]" />
                    </button>

                    {isMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute top-full right-0 mt-5 min-w-[220px] backdrop-blur-md flex flex-col z-50 shadow-lg text-right"
                            style={{
                                background: '#FEF1E9F2',
                                gap: '0px',
                                padding: '8px 0',
                                borderRadius: '15px',
                                border: '1px solid #3731311A'
                            }}
                        >
                            {menuItems.map((item, index) => (
                                <React.Fragment key={item.label}>
                                    <button
                                        onClick={item.onClick}
                                        className={`w-full text-left transition-colors px-[18px] py-[10px] hover:bg-black/5 ${item.color || 'text-[#373131]'}`}
                                        style={{
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '150%'
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                    {index < menuItems.length - 1 && (
                                        <div className="mx-[18px] h-[1px] bg-[#373131]/10" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <main className="max-w-[800px] mx-auto px-6 pt-10 pb-8 space-y-10">
                <div className="space-y-4">
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#373131] leading-[1.2]">
                        Proposal for Dark Mode Implementation in Dashboard
                    </h1>
                    <div className="flex justify-between items-center text-[#37313166] text-[14px] font-medium">
                        <span>Tuesday, October 7 · 11:20 PM</span>
                        <Button className="bg-[#373131] hover:bg-[#4a4444] text-white rounded-full px-6 h-10 gap-2 font-bold transition-all shadow-sm">
                            Share
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Tag icon={FileText} label="Mobile App Redesign" color="bg-[#FEF1E94D]" textColor="text-[#373131]" iconColor="bg-[#3731311A]" />
                    <Tag icon={Circle} label="In Progress" color="bg-[#FEF1E94D]" textColor="text-[#373131]" iconColor="bg-[#E86630]" isDot />
                    <Tag icon={User} label="Jane Smith" color="bg-[#FEF1E94D]" textColor="text-[#373131]" iconColor="bg-[#0EA5E9]" />
                    <Tag icon={Circle} label="Under Review" color="bg-[#FEF1E94D]" textColor="text-[#373131]" iconColor="bg-[#EBB305]" isDot />
                    <Tag icon={Calendar} label="March 15 - March 25" color="bg-[#FEF1E94D]" textColor="text-[#373131]" iconColor="bg-[#2463EB]" />
                    <Tag icon={Pin} label="Expected 5-10% increase in user retention" color="bg-[#FEF1E94D]" textColor="text-[#373131]" iconColor="bg-[#EF4444]" />
                </div>

                {showAudioPlayer && (
                    <div
                        className="w-full p-6 rounded-[30px] border border-[#FEF1E9] bg-white relative overflow-hidden"
                        style={{ boxShadow: '0px 4px 20px rgba(232, 102, 48, 0.05)' }}
                    >
                        <div className="flex items-center gap-6">
                            <span className="text-[12px] font-medium text-gray-400 tabular-nums">2:23</span>

                            <div className="flex-1 flex items-center gap-[3px] h-12">
                                {[...Array(60)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-[2px] rounded-full ${i < 35 ? 'bg-[#373131]' : 'bg-[#D1D5DB]'}`}
                                        style={{ height: `${20 + Math.random() * 60}%` }}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-[12px] font-medium text-gray-400 tabular-nums">15:37</span>
                                <button className="px-3 py-1 rounded-full bg-gray-100 text-[12px] font-bold text-[#373131] hover:bg-gray-200 transition-colors">
                                    1x
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    <h2 className="text-[20px] font-bold text-[#E86630]">Smart Summary</h2>
                    <div className="space-y-4 text-[16px] text-[#373131] leading-[1.6]">
                        <p>
                            A proposal has been submitted to introduce a dark mode feature in the internal dashboard. The feature aims to enhance the user experience by reducing eye strain and improving accessibility, particularly for users working during late hours. Early research suggests that adding a dark mode could improve user retention by 5-10%.
                        </p>
                        <p>
                            The design and development teams are currently assessing the feasibility of implementation, including UI adjustments and potential performance impacts. A final decision is expected by March 10, with development scheduled between March 15 - March 25 if approved.
                        </p>
                    </div>
                </div>
            </main>

            {/* Custom Input Area at bottom */}
            <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-[840px] px-6 z-50">
                <div
                    className="flex flex-col bg-white rounded-[25px] p-4 pb-3 shadow-lg"
                    style={{
                        background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(91.69deg, rgba(232, 102, 48, 0.5) 0%, rgba(192, 62, 8, 0.5) 100%) border-box',
                        border: '1px solid transparent',
                        boxShadow: '0px -2px 10px 3px rgba(231, 101, 47, 0.1)'
                    }}
                >
                    <textarea
                        ref={(el) => {
                            if (el) {
                                el.style.height = 'auto';
                                el.style.height = el.scrollHeight + 'px';
                            }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            if (!e.target.value) setIsFocused(false)
                        }}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                        }}
                        placeholder="Dig deeper into your summary..."
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[16px] py-1 px-2 resize-none flex-1 placeholder:text-[#3731314D] custom-scrollbar min-h-[40px] max-h-[150px]"
                    />

                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={handleMicClick}
                            className={`flex items-center justify-center w-[55px] h-[35px] rounded-full transition-all p-3 shadow-lg ${micError ? 'bg-red-500' : 'bg-[#373131] hover:bg-black'}`}
                        >
                            <img src={micError ? "/Vectormicoff.svg" : "/Mic.svg"} alt="Voice" className="w-7 h-7 object-contain " />
                        </button>

                        <button
                            onClick={handleSend}
                            className={`flex items-center justify-center w-[55px] h-[35px] rounded-full text-white transition-all shadow-lg ${isFocused ? 'bg-[#E86630] hover:bg-[#d15520]' : 'bg-[#373131] hover:bg-black'}`}
                            style={{ boxShadow: 'inset 0px 4px 4px 0px #FFFFFF40, inset -2px 0px 4px 0px #FFFFFF40, inset 4px 0px 6px 0px #FFFFFF40, inset 4px -4px 4px 0px #C03E08' }}
                        >
                            <ArrowUp className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
                {micError && (
                    <p className="text-[#37313199] text-[12px] font-medium text-center mt-2">
                        No microphone access. Enable it in your browser.
                    </p>
                )}
            </div>
        </div>
    )
}

function Tag({ icon: Icon, label, color, textColor, iconColor, isDot }: any) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${color} ${textColor} text-[13px] font-semibold border border-black/5`}>
            {isDot ? (
                <div className={`w-2 h-2 rounded-full ${iconColor}`} />
            ) : (
                <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center ${iconColor}`}>
                    <Icon className="w-2.5 h-2.5 text-white" />
                </div>
            )}
            {label}
        </div>
    )
}
