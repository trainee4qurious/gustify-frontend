"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, MoreHorizontal, FileText, Circle, User, Info, Calendar, Pin, Mic, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputArea } from "./input-area"

interface SummaryViewProps {
    onBack: () => void
    showAudioPlayer?: boolean
}

export function SummaryView({ onBack, showAudioPlayer = true }: SummaryViewProps) {
    const [inputValue, setInputValue] = React.useState("")

    return (
        <div className="min-h-screen pb-40">
            {/* Custom Pill Header */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-50">
                <div
                    className="flex items-center justify-between h-[60px] px-8 rounded-full border border-[#3731310D] bg-[#FEF1E94D] backdrop-blur-md"
                    style={{ boxShadow: 'inset 0px 4px 4px rgba(255, 201, 178, 0.5)' }}
                >
                    <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#373131]" />
                    </button>

                    <div className="w-8 h-8 flex items-center justify-center">
                        <Image
                            src="/Icon.svg"
                            alt="Gustify Logo"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>

                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-[#373131]" />
                    </button>
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
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[840px] px-6 z-50">
                <div
                    className="relative flex items-center bg-white rounded-[25px] border border-[#3731311A] p-2 pr-3 shadow-lg"
                    style={{ boxShadow: '0px -2px 10px 3px rgba(231, 101, 47, 0.1)' }}
                >
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#373131] text-white hover:bg-black transition-colors ml-1">
                        <Mic className="w-5 h-5" />
                    </button>

                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Dig deeper into your summary..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] py-3 px-4 resize-none h-[52px] placeholder:text-[#3731314D] custom-scrollbar"
                    />

                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E86630] text-white hover:bg-[#d15520] transition-colors shadow-inner-white">
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
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
