# Supabase Realtime Chat

A modern real-time chat application built with React, TypeScript, and Supabase. This application demonstrates real-time messaging capabilities using Supabase's real-time subscriptions.

## Features

- Real-time messaging using Supabase
- Modern UI with Tailwind CSS and Radix UI components
- Type-safe development with TypeScript
- Fast development with Vite
- Responsive design

## Tech Stack

- React 19
- TypeScript
- Vite
- Supabase
- Tailwind CSS
- Radix UI
- React Router DOM

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your Supabase project:
   - Create a new project at [Supabase](https://supabase.com)
   - Copy your project URL and keys
   - Create a `.env` file in the root directory with:
     ```
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     VITE_PUBLIC_URL=http://localhost:5173
     ```

4. Start the development server:
   ```bash
   bun run dev
   ```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

## Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components
  - `lib/` - Utility functions and configurations
  - `pages/` - Application pages/routes
  - `types/` - TypeScript type definitions

## Contributing

Feel free to open issues and pull requests!

## License

MIT