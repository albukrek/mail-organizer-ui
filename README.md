# Mail Organizer UI Prototype

A React + Vite application that demonstrates a UI for organizing Gmail emails. This is a presentation/prototype app that visualizes email categorization concepts without actual Gmail API integration.

## Project Overview

This UI prototype implements an 8-point plan for an intelligent email organizer:

1. **Gmail Logo** - Integrated official Gmail branding
2. **"My Mail Organizer" Title** - Prominent heading with subtitle
3. **"Open Gmail ↗" Link** - External link to Gmail
4. **"Load Data" Toggle** - Button to load email data
5. **Stats Row** - Display of total emails, matched, unmatched, and label groups
6. **Email Management Toolbar** - Horizontal toolbar with filter dropdown, select all checkbox, and action buttons (Delete Selected, Approve Selected, Approve All, Apply)
7. **Matched Emails Panel** - Displays emails categorized into label groups (FAMILY, BILLS AND INVOICE, WORK, INSURANCE, FRIENDS, GENERAL) with sender, subject, confidence level, and date
8. **Unmatched Emails Panel** - Displays emails not found in known database with options to delete all or selected emails

## Key Features

- Dark theme UI with modern styling
- Responsive layout with clear visual hierarchy
- Color-coded confidence levels (High ≥80%, Medium 50-79%, Low <50%)
- Complete email management workflow with selection and batch operations
- Clean separation between matched and unmatched emails

## Technical Stack

- React 19 with Vite
- Tailwind CSS v4 for styling
- ShadCN/ui components for UI elements
- TypeScript for type safety
- Oxlint for code quality

## Usage

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open in browser: http://localhost:5173

## Note

This is a UI prototype only. It uses static mock data and does not connect to the Gmail API. For real email processing, integration with Gmail API would be required in a production implementation.

## Documentation

For complete planning details, see the Obsidian vault:
`/Users/arikalbukrek/Library/Mobile Documents/iCloud~md~obsidian/Documents/AI Knowledge Graph/My Mail Organizer/UI mail organized under signal.md`

---
*Built with React + Vite | August 8, 2026*