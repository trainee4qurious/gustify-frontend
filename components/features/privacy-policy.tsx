"use client"

import * as React from "react"

export function PrivacyPolicy() {
    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen px-4 pb-6 pt-9 animate-in fade-in duration-500">

            {/* Content */}
            <div className="flex flex-col w-full max-w-2xl mx-auto space-y-8">
                <h1 className="text-[24px] font-semibold text-[#E86630] pb-4 border-b border-[#37313126]">
                    Privacy Policy
                </h1>

                <div className="space-y-4 text-[#373131] text-[16px] leading-[160%] font-medium">
                    <p>
                        Your privacy is important to us.
                    </p>
                    <p>
                        We do not collect or store your voice recordings, audio files, summaries, or personal notes. All data processing happens on your device, ensuring your content remains private and secure. We don't use your inputs for training any AI models, nor do we sell or share your data with third parties.
                    </p>
                    <p>
                        The app only asks for permissions that are essential—like microphone access for audio input or file access for uploaded recordings. Notification permissions are used solely to inform you when your summary is ready or if your attention is needed.
                    </p>
                    <p>
                        You stay in full control of your data. You can delete summaries anytime. No hidden tracking. No spam.
                    </p>
                </div>
            </div>
        </div>
    )
}
