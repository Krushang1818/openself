# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: This is a Resume Builder Application

**This is an AI-powered resume builder application built with Tambo AI.** The app allows users to create professional resumes through interactive chat and generate PDF exports.

### Key Features:

- AI-powered resume creation via chat interface
- Real-time PDF generation with React PDF
- Interactive resume components controlled by AI
- Data persistence with Zustand store
- Modern UI with Tailwind CSS v4

Before writing any new code:

1. **Check the package** - Read `node_modules/@tambo-ai/react` to understand the latest available hooks, components, and features
2. **Review resume schemas** - Check `src/lib/resume.ts` for data structure definitions
3. **Understand the store** - Review `src/store/resume-store.ts` for state management

Always check the `@tambo-ai/react` package exports for the most up-to-date functionality.

## Essential Commands

```bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix


## Architecture Overview

This is a Next.js 15 app with Tambo AI integration for building generative UI/UX applications. The architecture enables AI to dynamically generate and control React components.

### Core Technologies
- **Next.js 15.4.1** with App Router
- **React 19.1.0** with TypeScript
- **Tambo AI SDK**
- **Tailwind CSS v4** with dark mode support
- **Zod** for schema validation

### Key Architecture Patterns

1. **Component Registration System**
   - Components are registered in `src/lib/tambo.ts` with Zod schemas
   - AI can dynamically render these components based on user input
   - Each component has a name, description, component reference, and propsSchema

2. **Tool System**
   - External functions registered as "tools" in `src/lib/tambo.ts`
   - AI can invoke these tools to fetch data or perform actions
   - Tools have schemas defining their inputs and outputs

3. **Provider Pattern**
   - `TamboProvider` wraps the app in `src/app/layout.tsx`
   - Provides API key, registered components, and tools to the entire app

4. **Streaming Architecture**
   - Real-time streaming of AI-generated content via `useTamboStreaming` hook
   - Support for progressive UI updates during generation

### File Structure

```

src/
├── app/ # Next.js App Router pages
│ ├── chat/ # Chat interface with resume builder
│ ├── layout.tsx # Root layout with TamboProvider
│ └── page.tsx # Landing page
├── components/
│ ├── resume/ # Resume-specific components
│ │ ├── full-resume.tsx # Main resume display
│ │ ├── header.tsx # Resume header with contacts
│ │ ├── work-experience.tsx # Work experience section
│ │ ├── education.tsx # Education section
│ │ ├── projects.tsx # Projects section
│ │ ├── skills.tsx # Skills section
│ │ ├── summary.tsx # Professional summary
│ │ └── resume-pdf.tsx # PDF generation component
│ ├── tambo/ # AI chat components
│ │ ├── message-thread-full.tsx # Chat interface
│ │ ├── message-input.tsx # Chat input
│ │ └── message.tsx # Individual messages
│ ├── ui/ # Reusable UI components
│ │ ├── button.tsx # Button component
│ │ ├── section.tsx # Section wrapper
│ │ └── avatar.tsx # Avatar component
│ ├── resume-action-bar.tsx # PDF download bar
│ └── navbar.tsx # Navigation component
├── lib/
│ ├── tambo.ts # CENTRAL CONFIG: AI components & tools
│ ├── resume.ts # Resume data schemas & validation
│ └── utils.ts # Utility functions
├── store/
│ └── resume-store.ts # Resume data state management
└── styles/ # Global styles and Tailwind config

```

## Key Tambo Hooks

- **`useTamboRegistry`**: Component and tool registration
- **`useTamboThread`**: Thread state and message management
- **`useTamboThreadInput`**: Input handling for chat
- **`useTamboStreaming`**: Real-time content streaming
- **`useTamboSuggestions`**: AI suggestion management
- **`withInteractable`**: Interactable component wrapper

## When Working on This Codebase

### 1. **Adding New Resume Sections**
   - Define schema in `src/lib/resume.ts` (extend `ResumeDataSchema`)
   - Create component in `src/components/resume/`
   - Add to `FullResume` component in `src/components/resume/full-resume.tsx`
   - Update PDF component in `src/components/resume/resume-pdf.tsx`

### 2. **Adding New AI Components**
   - Define component in `src/components/tambo/`
   - Create Zod schema for props validation
   - Register in `src/lib/tambo.ts` components array
   - Use `withInteractable` wrapper for AI control

### 3. **Adding New Tools**
   - Implement tool function in `src/lib/tambo.ts`
   - Use `saveResumeData` utility for resume persistence
   - Tools can be called directly by AI without complex registration

### 4. **Styling Guidelines**
   - Use Tailwind CSS v4 classes
   - Follow existing design patterns
   - Components should support responsive design
   - Use CSS variables for theming

### 5. **TypeScript Requirements**
   - Strict mode is enabled
   - All components must be fully typed
   - Use Zod schemas for runtime validation
   - Leverage `ResumeDataSchemaType` for type safety

### 6. **Resume Data Management**
   - Use `useResumeStore` for state management
   - Data persists automatically to localStorage
   - Call `saveResumeData()` to update resume data
   - PDF generation uses `ResumePDF` component

### 7. **Development Workflow**
   - Run `npm run dev` for development
   - Use `npm run lint` for code quality
   - Test PDF generation with various data sets
   - Verify AI can properly control components
```
