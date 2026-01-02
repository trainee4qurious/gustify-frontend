"use client"

import * as React from "react"
import { Header } from "@/components/layout/header"
import { InputArea } from "@/components/features/input-area"
import { Feed } from "@/components/features/feed"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/features/auth-modal"
import { PrivacyPolicy } from "@/components/features/privacy-policy"
import { TermsConditions } from "@/components/features/terms-conditions"
import { Subscription } from "@/components/features/subscription"

import { RecordingView } from "@/components/features/recording-view"
import { ProcessingView } from "@/components/features/processing-view"
import { SummaryView } from "@/components/features/summary-view"

export default function Home() {
  type View = 'landing' | 'feed' | 'auth' | 'privacy' | 'terms' | 'subscription' | 'recording' | 'processing' | 'summary'
  const [view, setView] = React.useState<View>('landing')
  const [history, setHistory] = React.useState<View[]>([])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [pendingAction, setPendingAction] = React.useState<'mic' | 'text' | null>(null)

  const handleViewChange = (newView: View) => {
    // Prevent adding same view sequentially to history
    if (newView !== view) {
      setHistory(prev => [...prev, view])
      setView(newView)
    }
  }

  const handleAction = (type: 'mic' | 'text') => {
    if (!isLoggedIn) {
      setPendingAction(type)
      handleViewChange('auth')
    } else {
      if (type === 'mic') {
        handleViewChange('recording')
      } else {
        handleViewChange('processing')
      }
    }
  }

  const handleBack = () => {
    setPendingAction(null)
    if (history.length > 0) {
      const newHistory = [...history]
      const previousView = newHistory.pop()
      setHistory(newHistory)
      if (previousView) setView(previousView)
    } else {
      setView('landing')
    }
  }

  const currentActiveView = view === 'auth' ? (history[history.length - 1] || 'landing') : view;

  return (
    <main className="min-h-screen relative">
      <div
        className={`fixed inset-0 -z-10 bg-white bg-no-repeat transition-colors duration-500 ${currentActiveView === 'subscription'
          ? 'bg-[radial-gradient(ellipse_95%_65%_at_top,#FFEBA3_0%,#FFF8D6_45%,#FFFFFF_80%)]'
          : 'bg-[radial-gradient(ellipse_95%_65%_at_top,hsl(var(--bg-gradient-start))_0%,hsl(var(--bg-gradient-end))_45%,#FFFFFF_80%)]'
          }`}
      />
      {!['summary', 'processing', 'recording'].includes(view) && (
        <Header onViewChange={handleViewChange} onBack={handleBack} currentView={view} />
      )}

      <div className="container px-4 mx-auto pt-32 md:pt-34 pb-10">

        {currentActiveView === 'landing' && (
          <div className="flex flex-col items-center">
            <div className="text-center pt-15 space-y-2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1
                className="bg-clip-text text-transparent"
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontWeight: 800,
                  fontSize: '32px',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  backgroundImage: 'linear-gradient(277.71deg, #E86630 6.81%, rgba(232, 102, 48, 0.3) 97.18%)'
                }}
              >
                Get to the point, faster.
              </h1>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '150%',
                  textAlign: 'center',
                  color: '#37313199'
                }}
              >
                Summarize anything with text or voice. Smart, simple, and always private.
              </p>
            </div>
            <InputArea
              onUnauthorizedAction={() => handleAction('mic')}
              onAction={handleAction}
            />
            <div className="mt-12 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewChange('feed')}
                className="text-muted-foreground/50 hover:text-primary text-xs"
              >
                (Demo: View Dashboard)
              </Button>
            </div>
          </div>
        )}

        {currentActiveView === 'feed' && <Feed />}

        {currentActiveView === 'privacy' && <PrivacyPolicy />}

        {currentActiveView === 'terms' && <TermsConditions />}

        {currentActiveView === 'subscription' && <Subscription onViewChange={handleViewChange} />}

        {currentActiveView === 'recording' && (
          <RecordingView
            onClose={() => setView('landing')}
            onDone={() => setView('processing')}
          />
        )}

        {currentActiveView === 'processing' && (
          <ProcessingView onComplete={() => setView('summary')} />
        )}

        {currentActiveView === 'summary' && (
          <SummaryView
            onBack={() => {
              setPendingAction(null)
              setView('feed')
            }}
            showAudioPlayer={pendingAction === 'mic'}
          />
        )}

        {/* Auth Modal Overlay */}
        {view === 'auth' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#373131]/80 backdrop-blur-[0.5px] p-4 animate-in fade-in duration-300">
            <div onClick={handleBack} className="absolute inset-0" />
            <AuthModal
              onClose={handleBack}
              onSuccess={() => {
                setIsLoggedIn(true)
                if (pendingAction === 'mic') {
                  setView('recording')
                } else if (pendingAction === 'text') {
                  setView('processing')
                } else {
                  handleViewChange('feed')
                  setPendingAction(null)
                }
              }}
            />
          </div>
        )}

      </div>
    </main>
  );
}

