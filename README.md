# Gustify Frontend

This is the Next.js frontend implementation for the Gustify application, built with a focus on modern aesthetics, responsiveness, and performance.

## Project Overview

Gustify is a web application designed to help users summarize content quickly via text or voice. This frontend implementation accurately reflects the provided Figma designs, featuring dark/light mode support, glassmorphism UI elements, and a decoupled architecture ready for API integration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Language**: TypeScript
- **Theming**: `next-themes` (Dark/Light mode)
- **Utilities**: `clsx`, `tailwind-merge`

## Folder Structure

```
gustify-frontend/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout with ThemeProvider and Font setup
│   ├── page.tsx          # Main page with view switching logic (Landing/Feed/Auth)
│   └── globals.css       # Global styles and Tailwind v4 theme configuration
├── components/           # Reusable UI components
│   ├── ui/               # Primitive components (Button, Input, Card) - Shadcn-like
│   ├── layout/           # Layout components (Header)
│   └── features/         # Feature-specific components (AuthModal, Feed, InputArea)
├── lib/                  # Utilities (cn helper)
└── public/               # Static assets
```

## Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd gustify-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

- **Colors**: The application uses CSS variables in `app/globals.css` for theming. The primary color corresponds to the Gustify Orange (`hsl(18 89% 58%)`). All colors are mapped to CSS variables to support runtime theme switching.
- **Typography**: The project uses **Outfit** from Google Fonts, configured in `app/layout.tsx`.

## Features Implemented

-   **Landing Page**: "Get to the point, faster" input area with voice and upload actions.
-   **Dashboard Feed**: A feed of recent activities with status badges and date grouping.
-   **Auth Modal**: A clean, accessible modal for user login.
-   **Theme Toggle**: Fully functional Dark/Light mode toggle in the header.
-   **Responsive Design**: Mobile-first approach ensuring layout adapts to all screen sizes.

## Challenges & Solutions

-   **Tailwind v4 Configuration**: The project was initialized with the latest Next.js which uses Tailwind v4 alpha/beta. I adapted the configuration to use the new `@import "tailwindcss";` syntax and mapped CSS variables in the `@theme` block to ensure compatibility with standard class names like `bg-primary` and opacity modifiers.
-   **Glassmorphism**: Implemented a reusable `.glass-card` utility class to consistently apply backdrop-blur and semi-transparent backgrounds across components.
