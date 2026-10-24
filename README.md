# Jan Sahayak (जन सहायक) — Apuni Sarkar 2.0
> **Citizen-First UI/UX Redesign of Uttarakhand's Apuni Sarkar e-Services**  
> *Developed for the Uttarakhand Innovation & Solution Hackathon (UKIS 2026) — Problem Statement P-013 (ITDA)*

![Status](https://img.shields.io/badge/Status-Production_Ready_Prototype-success) ![Next.js](https://img.shields.io/badge/Framework-Next.js_16_Turbopack-black) ![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38B2AC) ![WCAG](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA-blue) ![RTS](https://img.shields.io/badge/Compliance-Uttarakhand_RTS_Act_2011-orange)

---

## 🌟 Live Portal
- **Live Deployment:** [jan-sahayak-neon.vercel.app](https://jan-sahayak-neon.vercel.app)
- **Repository:** [github.com/manttii/jan-sahayak](https://github.com/manttii/jan-sahayak)

---

## 🏔️ The Problem: Apuni Sarkar P-013 (ITDA)
The existing Apuni Sarkar portal (`eservices.uk.gov.in`) suffers from heavy cognitive load, department-first bureaucratic navigation, zero mobile optimization (forcing rural citizens to pinch, zoom, and scroll horizontally), administrative jargon, and lack of transparency regarding prerequisite documents.

**Jan Sahayak** completely overhauls the citizen experience into a modern, fast, accessible, and bilingual public service platform designed specifically for the unique terrain and demographics of Uttarakhand.

---

## 🚀 Key Innovations & Winning Features

### 1. 📱 Dual-Screen Responsive Architecture (Phone + PC)
- **Mobile Experience:** Native app feel, thumb-friendly 44px+ tap targets, bottom navigation bar, and accessible pull interactions.
- **Desktop/PC Experience:** Expansive state portal layout with official Uttarakhand emblem, announcements ticker, live RTS SLA metrics ribbon, 4-column filterable services grid, and government footer.

### 2. ⚡ 1-Click DigiLocker Integration Simulator
- Eliminates manual scanning friction for rural citizens.
- Auto-fetches Aadhaar, Ration Card, and Class 10th Marksheets in 1 click with verified cryptographic badges.

### 3. 📝 Universal Dynamic Application Engine (`/apply/:id`)
- Fully functional multi-step wizards for all core Uttarakhand certificates:
  - 📄 **Income Certificate (आय प्रमाण पत्र)** — 7 Days SLA
  - 🏠 **Permanent Domicile (स्थायी/मूल निवास)** — 15 Days SLA
  - 📋 **Caste Certificate (जाति प्रमाण पत्र - SC/ST/OBC/EWS)** — 14 Days SLA
  - 👶 **Birth Certificate (जन्म प्रमाण पत्र)** — 7 Days SLA
  - ✅ **Character Certificate (चरित्र प्रमाण पत्र - Police Kotwali)** — 10 Days SLA
  - 💍 **Marriage Certificate (विवाह पंजीकरण)** — 15 Days SLA
  - ⛰️ **Hilly Area Certificate (पर्वतीय क्षेत्र प्रमाण - Army/Police Concession)** — 7 Days SLA
  - 👨‍👩‍👧‍👦 **Pariwar Register Copy (परिवार रजिस्टर नकल)** — 3 Days SLA
  - ♿ **Disability Certificate (दिव्यांगता प्रमाण पत्र)** — 20 Days SLA
  - 🕊️ **Death Certificate (मृत्यु प्रमाण पत्र)** — 7 Days SLA
  - 🌾 **Ration Card Services (नया राशन कार्ड)** — 30 Days SLA
- Instant **e-District Acknowledgement Receipt (पावती रसीद)** generation with QR code and Barcode.

### 4. 🔍 Live RTS Tracking & Digital Certificate Issuance (`/track`)
- Search by **Application ID** or **10-Digit Mobile Number**.
- Transparent 5-stage administrative workflow (CSC Submission → Lekhpal Field Inquiry → Nayab Tehsildar Scrutiny → SDM Approval → Digital Signature).
- **Interactive Certificate Download Modal:** Official Government of Uttarakhand digital certificate with QR code, seal, and digital signature.
- **SMS Simulation:** Real-time toast alert preview of citizen milestone notifications.

### 5. 🤖 Conversational AI Assistant ("Jan Sahayak Sathi / साथी")
- Voice-enabled intelligent assistant modal answering queries in conversational Hindi & English.
- Instant guidance on eligibility, required documents, and RTS timelines.
- 1-click **"Pre-fill & Apply"** direct action routing.

### 6. ⏱️ Right to Public Services (RTS 2011) Citizen Charter (`/timeline`)
- Comprehensive statutory timeline schedule covering designated officers, 1st appellate authorities, 2nd appellate authorities, and statutory delay penalty clauses (₹250/day).

### 7. 🛡️ Public Certificate Verification Portal (`/verify`)
- Third-party authenticity verification tool for colleges, employers, and banks to verify issued certificates using QR codes.

### 8. 👤 Citizen Account Dashboard (`/account`)
- Seamless login via Aadhaar OTP or Mobile OTP (with demo autofill `123456`).
- Centralized hub for active applications, linked DigiLocker documents vault, and active grievances.

### 9. 📢 Grievance Redressal with Voice Recording (`/grievance`)
- 3-step complaint filing with department routing (Revenue, Police, Social Welfare, ITDA).
- Simulated **Voice Note Recording** for citizens who find typing difficult.
- Generates a trackable Grievance Reference ID with guaranteed 7-day CM Helpline 1905 resolution window.

### 10. ♿ Inclusive Accessibility (WCAG 2.2 AA+)
- **Audio Text-to-Speech:** Click `🔊` to listen to any service description or document requirement in conversational Hindi/English.
- **Font Scaler:** `A- / A / A+` toggle for visually impaired or elderly citizens.
- **High-Contrast Mode:** One-tap toggle for outdoor sunlight readability.
- **Instant Language Switcher:** Persistent toggle between simple conversational Hindi and English.

---

## 💻 Tech Stack
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **State & Storage:** React Context API + LocalStorage persistence
- **Speech API:** Web Speech Synthesis API
- **Deployment:** Vercel

---

## 🛠️ How to Run Locally
```bash
# Clone the repository
git clone https://github.com/manttii/jan-sahayak.git
cd jan-sahayak

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Verification & Tests
```bash
# Test production build
npm run build

# Run linter
npm run lint
```

---
*Built with passion by **Manit Sharma** for the Uttarakhand Innovation & Solution Hackathon (UKIS 2026).*
