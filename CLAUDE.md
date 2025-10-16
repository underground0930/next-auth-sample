# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 authentication sample project using the App Router, TypeScript, and Tailwind CSS v4. The project uses Turbopack for faster builds and hot module replacement.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

Development server runs at http://localhost:3000 with hot module replacement enabled.

## Architecture

**Next.js App Router**: Uses the `app/` directory structure for routing and layouts.

**Path Aliases**: `@/*` resolves to root directory (configured in tsconfig.json:21-23).

**Styling**: Tailwind CSS v4 with PostCSS integration. Uses CSS variables for theming and Geist fonts (sans and mono).

**TypeScript**: Strict mode enabled with ES2017 target. Module resolution uses bundler strategy.

**Turbopack**: Enabled by default for both dev and build commands for improved performance.

## Project Structure

- `app/layout.tsx` - Root layout with font configuration and global styles
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles and Tailwind directives
- `next.config.ts` - Next.js configuration (TypeScript)
- `eslint.config.mjs` - ESLint flat config with Next.js presets
- `tsconfig.json` - TypeScript configuration with strict mode

## Key Configuration

**ESLint**: Uses flat config format with Next.js core-web-vitals and TypeScript presets. Ignores node_modules, .next, out, build directories, and next-env.d.ts.

**TypeScript**: Strict mode enabled, uses Next.js plugin for enhanced type checking, path aliases configured for cleaner imports.
