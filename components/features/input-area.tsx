"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InputAreaProps {
    onUnauthorizedAction?: () => void
    onAction?: (type: 'mic' | 'text') => void
    placeholder?: string
}

export function InputArea({ onUnauthorizedAction, onAction, placeholder }: InputAreaProps) {
    const [isFocused, setIsFocused] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
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
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">



            <div
                className="flex flex-col items-center w-full"
                style={{
                    gap: '20px',
                    padding: '18px',
                    borderRadius: '25px',
                    borderWidth: '1px',
                    borderColor: 'rgba(255, 255, 255, 0.1)', // Adding a subtle border color as none was specified but width was
                    borderStyle: 'solid'
                }}
            >
                {/* Voice Button */}
                {!isFocused && (
                    <>
                        <Button
                            onClick={handleMicClick}
                            className="hover:scale-105 transition-all"
                            style={{
                                width: '76px',
                                height: '52px',
                                gap: '10px',
                                paddingTop: '12px',
                                paddingRight: '24px',
                                paddingBottom: '12px',
                                paddingLeft: '24px',
                                borderRadius: '999px',
                                backgroundColor: '#E86630',
                                boxShadow: 'inset 0px 4px 4px 0px #FFFFFF40, inset -2px 0px 4px 0px #FFFFFF40, inset 4px 0px 6px 0px #FFFFFF40, inset 4px -4px 4px 0px #C03E08'
                            }}
                        >
                            <img
                                src={micError ? "/Vectormicoff.svg" : "/Mic.svg"}
                                alt="Voice Input"
                                className="w-7 h-7 object-contain relative "
                            />
                        </Button>
                        {micError && (
                            <p className="text-[#37313199] text-[14px] font-medium text-center mt-1">
                                No microphone access. Enable it in your browser to record.
                            </p>
                        )}
                        <div className="w-8 h-px bg-border/50"></div>
                    </>
                )}

                {/* Input Box */}
                <div className="relative w-full ">
                    <textarea
                        ref={(el) => {
                            if (el) {
                                el.style.height = '64px';
                                const scrollHeight = el.scrollHeight;
                                el.style.height = scrollHeight + 'px';
                            }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            if (!e.target.value) setIsFocused(false)
                        }}
                        value={inputValue}
                        placeholder={placeholder || "Start by writing or pasting your content..."}
                        className="w-full min-h-[64px] max-h-[330px] pl-6 pr-20 pt-[18px] pb-[18px] rounded-[25px] shadow-sm focus:outline-none focus:ring-0 transition-all placeholder:text-muted-foreground/50 resize-none overflow-y-auto custom-scrollbar"
                        style={{
                            background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(91.69deg, rgba(232, 102, 48, 0.5) 0%, rgba(192, 62, 8, 0.5) 100%) border-box',
                            border: '1px solid transparent',
                            borderRadius: '25px',
                            boxShadow: '0px -2px 10px 3px #E7652F4D'
                        }}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            e.target.style.height = '64px';
                            const scrollHeight = e.target.scrollHeight;
                            e.target.style.height = Math.min(scrollHeight, 330) + 'px';
                            if (e.target.value) setIsFocused(true);
                        }}
                    />
                    <Button
                        onClick={handleSend}
                        className="absolute right-2 bottom-[18px] hover:scale-105 transition-all text-white"
                        style={{
                            width: '62px',
                            height: '42px',
                            gap: '10px',
                            paddingTop: '10px',
                            paddingRight: '20px',
                            paddingBottom: '10px',
                            paddingLeft: '20px',
                            borderRadius: '999px',
                            backgroundColor: isFocused ? '#E86630' : '#373131',
                            boxShadow: isFocused
                                ? 'inset 0px 4px 4px 0px #FFFFFF40, inset -2px 0px 4px 0px #FFFFFF40, inset 4px 0px 6px 0px #FFFFFF40, inset 4px -4px 4px 0px #C03E08'
                                : 'inset 0px 4px 4px 0px #FFFFFF40, inset -2px 0px 4px 0px #FFFFFF40, inset 4px 0px 6px 0px #FFFFFF40, inset 4px -4px 4px 0px #000000'
                        }}
                    >
                        <ArrowUp className="w-5 h-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
