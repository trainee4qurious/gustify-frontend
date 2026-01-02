"use client"

import * as React from "react"
import { Calendar, User, FileText, ArrowUp, Circle } from "lucide-react"

function Tag({ icon: Icon, label, color, textColor, iconColor, isDot }: any) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${color} ${textColor} text-[12px] font-semibold border border-[#3731310D]`}>
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

function FeedItem({ date, title, tags }: { date: string, title: string, tags: any[] }) {
    return (
        <div
            className="mb-4  p-6 rounded-[30px] border border-[#3731310D] bg-[#FEF1E94D] transition-transform hover:scale-[1.01] cursor-pointer"
            style={{ boxShadow: '0px 2px 8px rgba(232, 102, 48, 0.05)' }}
        >
            <div className="text-[12px] text-[#37313166] font-medium mb-1">{date}</div>
            <h3 className="text-[18px] font-bold text-[#373131] leading-tight mb-4">{title}</h3>
            <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag, i) => (
                    <Tag key={i} {...tag} />
                ))}
            </div>
        </div>
    )
}

export function Feed({ onAction }: { onAction?: (type: 'mic' | 'text') => void }) {
    const [inputValue, setInputValue] = React.useState("")
    const [isFocused, setIsFocused] = React.useState(false)
    const [micError, setMicError] = React.useState(false)

    const handleMicClick = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicError(false);
            onAction?.('mic');
        } catch (err) {
            setMicError(true);
        }
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            onAction?.('text');
        }
    };

    return (
        <div className="w-full max-w-[800px] mx-auto pb-40 mt-5 animate-in fade-in duration-500">
            <div className="flex justify-center mb-12">
                <h2
                    className="text-[48px] font-extrabold"
                    style={{
                        color: '#E86630',
                        fontFamily: 'Plus Jakarta Sans',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Oct 13th
                </h2>
            </div>

            <div className="space-y-4">
                <FeedItem
                    date="Tuesday, October 7"
                    title="Proposal for Dark mode implementation in Dashboard"
                    tags={[
                        { icon: FileText, label: "InternalDashboardRevamp", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#3731311A]" },
                        { icon: Circle, label: "Pending", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#E86630]", isDot: true },
                        { icon: User, label: "John M.", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#3731311A]" },
                        { icon: Calendar, label: "Oct 15 - Dec 12", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#3731311A]" }
                    ]}
                />

                <FeedItem
                    date="Friday, September 12"
                    title="API integration delayed due to UI dependency and backend fixes"
                    tags={[
                        { icon: FileText, label: "Mobile App Redesign", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#3731311A]" },
                        { icon: User, label: "John M.", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#3731311A]" },
                        { icon: Calendar, label: "Oct 15 - Dec 12", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#3731311A]" }
                    ]}
                />

                <FeedItem
                    date="Sunday, August 3"
                    title="Tried out dark mode on the dashboard; looks pretty cool"
                    tags={[
                        { icon: FileText, label: "Dashboard Experiments", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#3731311A]" },
                        { icon: Circle, label: "Underreview", color: "bg-[#FEF1E94D]", textColor: "text-[#373131]", iconColor: "bg-[#EBB305]", isDot: true }
                    ]}
                />
            </div>

            {/* Fixed Input Area for Feed View matches Summary view design */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[840px] px-6 z-50">
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
                        placeholder="Start by writing or pasting your content..."
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
