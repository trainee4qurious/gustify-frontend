"use client"

import * as React from "react"

interface ProcessingViewProps {
    onComplete: () => void
}

export function ProcessingView({ onComplete }: ProcessingViewProps) {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(timer)
                    setTimeout(onComplete, 500)
                    return 100
                }
                return p + 2
            })
        }, 50)
        return () => clearInterval(timer)
    }, [onComplete])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-[400px] p-8 rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-center space-y-6">
                <h2 className="text-[20px] font-bold text-gray-800">
                    Crafting your smart summary...
                </h2>

                <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gray-400 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="text-[14px] text-gray-500 font-medium">
                    This may take a few moments
                </p>
            </div>
        </div>
    )
}
