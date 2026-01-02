"use client"

import * as React from "react"
import Image from "next/image"
import { X, Pause, Check } from "lucide-react"

interface RecordingViewProps {
    onClose: () => void
    onDone: () => void
}

export function RecordingView({ onClose, onDone }: RecordingViewProps) {
    const [timer, setTimer] = React.useState(0)
    const [isPaused, setIsPaused] = React.useState(false)

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isPaused) {
            interval = setInterval(() => {
                setTimer(t => t + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isPaused])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <header className="fixed top-0 left-0 right-0 p-6 px-20 flex justify-between items-center">
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
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                </button>
            </header>

            <main className="flex flex-col items-center gap-12">
                {/* Waveform Visualization */}
                <div className="flex items-center gap-1 h-[140px]">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 rounded-full bg-[#E86630] ${!isPaused ? 'animate-waveform' : ''}`}
                            style={{
                                height: `${20 + Math.random() * 80}%`,
                                animationDelay: `${i * 0.05}s`
                            }}
                        />
                    ))}
                </div>

                <div className="text-[64px] font-bold text-[#373131] tabular-nums">
                    {formatTime(timer)}
                </div>

                <div className="flex gap-6">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 ${isPaused ? 'bg-orange-100 text-[#E86630]' : 'bg-[#EF44440D] text-[#EF4444]'}`}
                    >
                        <Pause className={`w-5 h-5 ${isPaused ? 'fill-current' : ''}`} />
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        onClick={onDone}
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#373131] text-white font-bold transition-all hover:scale-105 shadow-lg"
                    >
                        <Check className="w-5 h-5" />
                        Done
                    </button>
                </div>
            </main>

            <footer className="fixed bottom-12">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[12px] font-medium text-gray-500">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center text-white text-[10px]">i</div>
                    You can record audio for up to 20 minutes.
                </div>
            </footer>
        </div>
    )
}
