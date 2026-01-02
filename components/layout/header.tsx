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
    isLoggedIn?: boolean
    onLogout?: () => void
}

export function Header({ onViewChange, onBack, currentView, isLoggedIn, onLogout }: HeaderProps) {
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const menuRef = React.useRef<HTMLDivElement>(null)

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
                <div className="flex items-center cursor-pointer" onClick={() => onViewChange?.(isLoggedIn ? 'feed' : 'landing')}>
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

                <div className="flex items-center relative gap-2">
                    <Button
                        hidden={currentView === 'subscription' || currentView === 'privacy' || currentView === 'terms' || currentView === 'auth' || currentView === 'landing'}
                        variant="ghost"
                        size="icon"
                        aria-label="Search"
                        className="hover:bg-black/5 rounded-full"
                    >
                        <Search className="w-5 h-5 text-[#373131]" />
                    </Button>

                    {(currentView === 'privacy' || currentView === 'terms' || currentView === 'subscription') ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Close"
                            className="hover:bg-black/5 rounded-full"
                            onClick={() => onBack ? onBack() : onViewChange?.('landing')}
                        >
                            <X className="w-5 h-5 text-[#373131]" />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Menu"
                            className="hover:bg-black/5 rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MoreHorizontal className="w-5 h-5 text-[#373131]" />
                        </Button>
                    )}

                    {isMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute top-full right-[-26px] mt-5 min-w-[220px] backdrop-blur-md flex flex-col z-50 shadow-lg"
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
        </header>
    )
}
