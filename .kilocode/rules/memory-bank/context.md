# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The template is ready. Next steps depend on user requirements:

1. What type of application to build
2. What features are needed
3. Design/branding preferences

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-02-24 | Built Heritage Trail Flutter app + Next.js CMS with municipality map filter |

## Recently Completed

- [x] Flutter mobile app (`heritage_app/`) with bilingual EN/NE support
- [x] Google Maps integration with historic place markers by category
- [x] Municipality/Rural Municipality map filter (Province → District → Municipality)
- [x] Place detail screen: text, audio guide, video tour, photo gallery
- [x] GPS navigation with shortest path and turn-by-turn directions
- [x] Next.js CMS at `/cms/` with sidebar navigation
- [x] CMS Dashboard with stats, budget overview, progress charts
- [x] CMS Historic Places management table
- [x] CMS Municipality Map Filter page (all 7 provinces, 20+ districts, 100+ units)
- [x] CMS Projects management with physical & financial progress bars
- [x] CMS Ping Location with GPS + Province/District/Municipality selector
- [x] CMS Progress Tracking with milestones and ping history
- [x] Nepal administrative data: 7 provinces, municipalities & rural municipalities

## Current Structure (Added)

| File/Directory | Purpose |
|----------------|---------|
| `heritage_app/` | Flutter mobile app |
| `heritage_app/lib/main.dart` | App entry point, routing |
| `heritage_app/lib/l10n/` | EN/NE ARB localization files |
| `heritage_app/lib/models/` | HistoricPlace, Municipality models |
| `heritage_app/lib/screens/` | Home, Map, PlaceDetail, Navigation, Settings |
| `heritage_app/lib/providers/` | Riverpod state providers |
| `heritage_app/lib/services/` | LocationService (GPS, routing) |
| `heritage_app/lib/widgets/` | PlaceCard, CategoryChip, SearchBar |
| `src/app/cms/` | CMS admin panel |
| `src/app/cms/dashboard/` | Stats dashboard |
| `src/app/cms/places/` | Historic places CRUD |
| `src/app/cms/map/` | Municipality map filter |
| `src/app/cms/projects/` | Projects management |
| `src/app/cms/projects/ping/` | GPS ping with municipality selector |
| `src/app/cms/progress/` | Progress tracking |
| `src/lib/data.ts` | Sample data (places, projects) |
| `src/lib/nepal-municipalities.ts` | Nepal admin divisions data |
| `src/types/index.ts` | TypeScript interfaces |
