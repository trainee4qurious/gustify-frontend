"use client"

import * as React from "react"

export function TermsConditions() {
    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen px-4 pb-6 mt-9 animate-in fade-in duration-500">

            {/* Content */}
            <div className="flex flex-col w-full max-w-2xl mx-auto space-y-8">
                <h1 className="text-[24px] font-semibold text-[#E86630] pb-4 border-b border-[#37313126]">
                    Terms & Conditions
                </h1>

                <div className="space-y-4 text-[#373131] text-[16px] leading-[160%] font-medium">
                    <p>
                        By using this app, you agree to the following terms:
                    </p>
                    <p>
                        This app helps you capture, convert, and organize your meeting notes or daily logs using voice or text. We provide tools that turn your input into smart summaries using on-device or secure AI processing. The accuracy of AI-generated summaries may vary and should be reviewed before sharing or relying on them.
                    </p>
                    <p>
                        You are responsible for the content you input and generate. Do not use the app to submit harmful, illegal, or offensive material. We reserve the right to restrict access in cases of misuse.
                    </p>
                    <p>
                        We strive to keep the app stable and secure, but we are not liable for any data loss, interruption, or inaccuracies in summaries. Your continued use means you accept these conditions.
                    </p>
                </div>
            </div>
        </div>
    )
}
