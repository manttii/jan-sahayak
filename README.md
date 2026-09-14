# Jan Sahayak — Apuni Sarkar Redesign

![Jan Sahayak](https://img.shields.io/badge/Status-Prototype-success) ![Next.js](https://img.shields.io/badge/Framework-Next.js_14-black) ![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38B2AC)

**Jan Sahayak** is a citizen-first UI/UX redesign of Uttarakhand's Apuni Sarkar e-services portal, built for the UKIS Hackathon 2026 (Problem P-013).

## 🚀 Live Demo
*(Insert your Vercel Link Here)*

## 📑 The Challenge (P-013)
The ITDA challenge requires a complete rethinking of the e-services portal to address mobile usability, digital literacy barriers, and navigation challenges. The goal is not just a visual makeover, but a deeply researched, validated UI/UX overhaul.

## 🧠 Our Approach & Methodology
We did not just build a UI; we conducted **real user research** to identify exactly where citizens struggle on the current portal.

Please read our full **[UX Research & Validation Report](UX_Research_Report.md)** for our methodology, testing results, and before/after metrics.

### Key Redesign Features
1. **True Mobile-First Design:** No more pinch-to-zoom. Large touch targets, bottom navigation for thumb-reachability, and native-app feel.
2. **Frictionless Bilingual Experience:** 1-click toggle between conversational Hindi and English that persists across the entire application.
3. **Transparent Prerequisites:** Users see exactly what documents they need *before* starting an application.
4. **Action-Oriented Architecture:** We abandoned the "Department-first" structure of the old portal for a "Citizen-intent" structure (Apply, Track, Grievance).
5. **Accessibility (WCAG):** Fully tested for color contrast and screen-reader compatibility (ARIA labels on all interactive elements).

## 💻 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** React Context API (Language State)
- **Deployment:** Vercel

## 🛠️ How to run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---
*Built by Manit Sharma for UKIS Hackathon 2026.*
