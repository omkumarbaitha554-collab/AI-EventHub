# AI EventHub - Intelligent Event Management Platform

Transform your event ideas into reality with AI-powered planning and seamless organization.

## 🚀 Overview

**AI EventHub** is a modern, full-stack event management platform that leverages artificial intelligence to revolutionize how events are planned and organized. Built with Next.js 16 and powered by Google's Gemini AI, this platform enables users to create, manage, and discover events effortlessly.

## ✨ Key Features

- 🤖 **AI-Powered Event Creation** - Generate complete event details using natural language prompts
- 🔐 **Secure Authentication** - Integrated Clerk authentication with role-based access
- 💎 **Pro Tier System** - Premium features and enhanced capabilities for power users
- 📱 **Real-time Updates** - Powered by Convex for instant data synchronization
- 🎨 **Modern UI/UX** - Beautiful, responsive interface built with Tailwind CSS and Shadcn UI
- 🔍 **Event Discovery** - Explore and browse events with advanced filtering
- 📊 **QR Code Integration** - Generate and scan QR codes for seamless event check-ins
- 🌍 **Location Support** - Country, state, and city selection for accurate event locations

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Shadcn UI
- **Backend**: Convex (real-time database)
- **AI**: Google Gemini API
- **Authentication**: Clerk
- **Form Handling**: React Hook Form with Zod validation

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- A Convex account ([convex.dev](https://convex.dev))
- A Clerk account ([clerk.com](https://clerk.com))
- A Google Gemini API key ([ai.google.dev](https://ai.google.dev))
- An Unsplash API key (optional, for event images)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/omkumarbaitha554-collab/AI-EventHub.git
cd AI-EventHub
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_JWT_ISSUER_DOMAIN=

# APIs
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
GEMINI_API_KEY=
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-event-organiser/
├── app/                    # Next.js app directory
├── components/             # Reusable UI components
├── convex/                 # Convex backend functions
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── public/                 # Static assets
└── middleware.js           # Clerk authentication middleware
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run dev:network` - Start dev server accessible on local network
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Om Kumar Baitha**

- GitHub: [@omkumarbaitha554-collab](https://github.com/omkumarbaitha554-collab)

## 🙏 Acknowledgments

Built with modern web technologies and AI to make event management effortless.
