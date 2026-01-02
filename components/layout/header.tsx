"use client"

import * as React from "react"
import Image from "next/image"
import { Search, MoreHorizontal, Feather, Moon, Sun, X } from "lucide-react" // Using Feather as placeholder for the logo
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface HeaderProps {
    onViewChange?: (view: 'landing' | 'feed' | 'auth' | 'privacy' | 'terms' | 'subscription' | 'recording' | 'processing' | 'summary') => void
    onBack?: () => void
    currentView?: 'landing' | 'feed' | 'auth' | 'privacy' | 'terms' | 'subscription' | 'recording' | 'processing' | 'summary'
}

export function Header({ onViewChange, onBack, currentView }: HeaderProps) {
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-20 py-6" style={{ gap: '8px' }}>
            <div
                className="flex items-center justify-between w-full max-w-5xl h-[60px] pl-[32px] pr-[26px] py-[12px] rounded-[999px] backdrop-blur-md"
                style={{
                    border: currentView === 'subscription' ? '1px solid rgba(222, 168, 7, 0.3)' : '1px solid rgba(255, 201, 178, 0.5)',
                    boxShadow: currentView === 'subscription'
                        ? "inset 0px 4px 4px 0px #DEA80740, inset -2px 0px 4px 0px #DEA80740, inset 4px 0px 6px 0px #DEA80740"
                        : "inset 0px 4px 4px 0px #FFC9B280, inset -2px 0px 4px 0px #FFC9B280, inset 4px 0px 6px 0px #FFC9B280"
                }}
            >
                <div className="flex items-center cursor-pointer" onClick={() => onViewChange?.('landing')}>
                    {/* Logo - click to go home */}
                    <div className="w-8 h-8 text-foreground">
                        <Image
                            src="/Icon.svg"
                            alt="Gustify Logo"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="flex items-center relative">
                    {(currentView === 'privacy' || currentView === 'terms' || currentView === 'subscription') ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Close"
                            className="hover:bg-orange-100/50"
                            onClick={() => onBack ? onBack() : onViewChange?.('landing')}
                        >
                            <X className="w-5 h-5 text-foreground/80" />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Menu"
                            className="hover:bg-orange-100/50"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MoreHorizontal className="w-5 h-5 text-foreground/80" />
                        </Button>
                    )}

                    {isMenuOpen && (
                        <div
                            className="absolute top-full right-[-26px] mt-5 min-w-[200px] backdrop-blur-md flex flex-col items-end z-50 shadow-lg"
                            style={{
                                background: '#3731310A',
                                gap: '3px',
                                paddingTop: '6px',
                                paddingBottom: '6px',
                                borderRadius: '15px',
                                border: '1px solid #37313124'
                            }}
                        >
                            <button
                                onClick={() => {
                                    onViewChange?.('subscription')
                                    setIsMenuOpen(false)
                                }}
                                className="w-full text-left text-[#EBB305] transition-colors"
                                style={{
                                    paddingTop: '6px',
                                    paddingRight: '14px',
                                    paddingBottom: '6px',
                                    paddingLeft: '14px',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '150%'
                                }}
                            >
                                Subscription
                            </button>
                            <div className="w-full px-[14px]">
                                <div className="h-[1px] bg-[#000000]/10 w-full" />
                            </div>
                            <button
                                onClick={() => {
                                    onViewChange?.('privacy')
                                    setIsMenuOpen(false)
                                }}
                                className="w-full text-left text-[#373131] transition-colors"
                                style={{
                                    paddingTop: '6px',
                                    paddingRight: '14px',
                                    paddingBottom: '6px',
                                    paddingLeft: '14px',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '150%'
                                }}
                            >
                                Privacy Policy
                            </button>
                            <div className="w-full px-[14px]">
                                <div className="h-[1px] bg-[#000000]/10 w-full" />
                            </div>
                            <button
                                onClick={() => {
                                    onViewChange?.('terms')
                                    setIsMenuOpen(false)
                                }}
                                className="w-full text-left text-[#373131] hover:bg-black/5 transition-colors"
                                style={{
                                    paddingTop: '6px',
                                    paddingRight: '14px',
                                    paddingBottom: '6px',
                                    paddingLeft: '14px',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '150%'
                                }}
                            >
                                Terms & Conditions
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
