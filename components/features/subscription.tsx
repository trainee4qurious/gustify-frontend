"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface SubscriptionProps {
    onViewChange?: (view: 'landing' | 'feed' | 'auth' | 'privacy' | 'terms' | 'subscription') => void
}

export function Subscription({ onViewChange }: SubscriptionProps) {
    const [plan, setPlan] = React.useState<'monthly' | 'yearly'>('monthly')

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen px-4 pb-6 animate-in fade-in duration-500 items-center">

            {/* Content */}
            <div className="flex flex-col w-full max-w-xl mx-auto space-y-8 mt-9">
                <div className="space-y-4">
                    <h1 className="text-[32px] font-bold text-[#DEA807] leading-[120%]">
                        Summarize More.<br />
                        Go Pro.
                    </h1>

                    <div className="space-y-3 text-[#574100]">
                        {[
                            "Unlimited summaries — no limits",
                            "No token caps — paste anything",
                            "Chat with your summaries",
                            "Faster processing"
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-4 h-4 text-[#5D4037]">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                    </svg>
                                </div>
                                <span className="text-[#5D4037] font-medium text-[16px]">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-2 gap-4 mt-12">
                    {/* Monthly Plan */}
                    <button
                        onClick={() => setPlan('monthly')}
                        className={`relative p-4 rounded-[20px] text-left transition-all border-2 ${plan === 'monthly'
                            ? 'border-[#EBB305]'
                            : 'border-[#5741004D]'
                            }`}
                        style={{
                            background: plan === 'monthly'
                                ? 'linear-gradient(90deg, rgba(217, 160, 11, 0.024) 0%, rgba(217, 160, 11, 0.048) 50.14%)'
                                : 'linear-gradient(90deg, rgba(87, 65, 0, 0.024) 0%, rgba(87, 65, 0, 0.048) 50.14%)'
                        }}
                    >
                        <div className="font-bold text-[#574100] text-lg">Monthly</div>
                        <div className="text-[#543D00B2] font-medium mt-1">$4.99/mo</div>
                    </button>

                    {/* Yearly Plan */}
                    <button
                        onClick={() => setPlan('yearly')}
                        className={`relative p-4 rounded-[20px] text-left transition-all border-2 ${plan === 'yearly'
                            ? 'border-[#EBB305]'
                            : 'border-[#5741004D]'
                            }`}
                        style={{
                            background: plan === 'yearly'
                                ? 'linear-gradient(90deg, rgba(217, 160, 11, 0.024) 0%, rgba(217, 160, 11, 0.048) 50.14%)'
                                : 'linear-gradient(90deg, rgba(87, 65, 0, 0.024) 0%, rgba(87, 65, 0, 0.048) 50.14%)'
                        }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="font-bold text-[#574100] text-lg">Yearly</div>
                            <span className="bg-[#DFAFA3] text-[#5D4037] text-[10px] font-bold px-2 py-1 rounded-full">
                                20% OFF
                            </span>
                        </div>
                        <div className="mt-1">
                            <span className="text-[#543D00B2] font-medium">$4.00/mo</span>
                            <span className="text-[#57410080] text-sm ml-2 line-through">$49.99/mo</span>
                        </div>
                    </button>
                </div>

                {/* CTA Button */}
                <Button
                    className="flex items-center justify-center text-white font-bold transition-opacity hover:opacity-90"
                    style={{
                        width: '240px',
                        height: '60px',
                        gap: '10px',
                        paddingTop: '18px',
                        paddingRight: '54px',
                        paddingBottom: '18px',
                        paddingLeft: '54px',
                        borderRadius: '999px',
                        background: '#DEA807',
                        boxShadow: `
                            inset 0px 4px 4px 0px #FFFFFF40,
                            inset -2px 0px 4px 0px #FFFFFF40,
                            inset 4px 0px 6px 0px #FFFFFF40,
                            inset 4px -4px 4px 0px #B68000
                        `,
                        border: 'none'
                    }}
                >
                    Upgrade to Pro
                </Button>

                {/* Footer Links */}
                <div className="flex items-start gap-12">
                    <button className="text-[#37313180] pl-4 text-[14px] underline font-semibold hover:text-[#373131]">
                        Restore Purchase
                    </button>
                    <button
                        onClick={() => onViewChange?.('privacy')}
                        className="text-[#37313180] text-[14px] underline font-semibold hover:text-[#373131]"
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => onViewChange?.('terms')}
                        className="text-[#37313180] text-[14px] underline font-semibold hover:text-[#373131]"
                    >
                        Terms & Coditions
                    </button>
                </div>
            </div>
        </div>
    )
}
