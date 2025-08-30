Enrollment Multi-Step Form
A responsive 4-step enrollment form for students in India, built with Next.js (App Router), TypeScript, react-hook-form, zod, Tailwind CSS, and shadcn/ui. Includes bonus features like autosave drafts and PIN-based city/state auto-fill.

Features
4-step flow:
Student Details – name, email, mobile (+91), class, board, preferred language
Academic Details – subjects (dynamic per class), exam goal, weekly hours, optional scholarship fields
Address & Guardian – PIN, state/city (auto-fill), address, guardian info, payment plan/mode
Review & Submit – read-only summary with edit links, final validation, success state, JSON payload

Form & Validation:
Centralized zod schemas per step + merged schema for final submit
Conditional fields & cross-field validation (superRefine)
Inline errors, smooth scroll to first invalid field

State Management:
React Context for persistent form data across pages
Autosave drafts to localStorage every 2s (debounced)
UX / Accessibility:
Progress indicator, mobile-first responsive design
Keyboard-friendly navigation, focus rings, proper ARIA labels
Back/Next buttons preserve values, Next disabled until valid

Bonus Features:
Landing Page
PIN auto-fills city/state
Dynamic subject catalog per class
Full review & edit before submit


Notes
Only India-based students.
Subjects, boards, and classes are predefined options.
PIN-to-city/state mapping is mocked client-side.
All validation is centralized with zod; no duplicate client logic.
Routing guards prevent skipping steps.
