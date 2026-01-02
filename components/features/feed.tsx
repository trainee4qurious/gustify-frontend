"use client"

import * as React from "react"
import { Calendar, User, FileText, ArrowUp, Mic } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function StatusBadge({ status }: { status: "pending" | "review" | "done" }) {
    const styles = {
        pending: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    }

    const labels = {
        pending: "Pending",
        review: "Under review",
        done: "Oct 15 - Dec 12"
    }

    // Custom mapping for the design screenshots
    // In design: "Pending" is Orange dot + Text. "Under review" is Yellow dot.

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${styles[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'pending' ? 'bg-orange-500' : status === 'review' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
            {labels[status]}
        </span>
    )
}

function FeedItem({ date, title, project, author, status }: any) {
    return (
        <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow dark:bg-card/50">
            <CardContent className="p-5">
                <div className="text-xs text-muted-foreground mb-1">{date}</div>
                <h3 className="font-medium text-lg leading-snug mb-4">{title}</h3>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">
                        <FileText className="w-3 h-3 mr-1" />
                        {project}
                    </div>
                    {status && <StatusBadge status={status} />}
                    {author && (
                        <div className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">
                            <User className="w-3 h-3 mr-1" />
                            {author}
                        </div>
                    )}
                    {/* Hardcoded date badge for some items as per design */}
                    <div className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        Oct 15 - Dec 12
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function Feed() {
    return (
        <div className="w-full max-w-2xl mx-auto pb-24 animate-in fade-in duration-500">
            <div className="flex justify-center mb-8">
                <h2 className="text-4xl font-bold text-primary/80">Oct 13th</h2>
            </div>

            <FeedItem
                date="Tuesday, October 7"
                title="Proposal for Dark mode implementation in Dashboard"
                project="Internal Dashboard Revamp"
                status="pending"
                author="John M."
            />

            <FeedItem
                date="Friday, September 12"
                title="API integration delayed due to UI dependency and backend fixes"
                project="Mobile App Redesign"
                status="review" // Just to vary colors, design said "John M" and date
                author="John M."
            />

            <FeedItem
                date="Sunday, August 3"
                title="Tried out dark mode on the dashboard; looks pretty cool"
                project="Dashboard Experiments"
                status="review"
            />

            {/* Sticky Input Area for Feed View */}
            <div className="mt-8 relative">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Start by writing or pasting your content..."
                        className="w-full h-14 pl-12 pr-12 rounded-2xl border border-border/50 bg-white dark:bg-zinc-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                    />
                    <div className="absolute left-3 top-3 p-1.5 bg-black/80 dark:bg-white/20 rounded-full">
                        <Mic className="w-4 h-4 text-white" />
                    </div>
                    <Button
                        size="icon"
                        className="absolute right-2 top-2 h-10 w-10 rounded-full bg-primary text-white hover:bg-primary/90"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
