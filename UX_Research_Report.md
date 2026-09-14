# Jan Sahayak: Apuni Sarkar UI/UX Redesign
## Comprehensive User-Study & Validation Report

**Team:** Manit Sharma (Solo) | **Problem:** P-013 (ITDA)

---

### 1. Executive Summary
The current Apuni Sarkar portal (eservices.uk.gov.in) suffers from heavy cognitive load, poor mobile responsiveness, and technical jargon that alienates users with limited digital literacy. **Jan Sahayak** is a citizen-first, mobile-optimized redesign driven by actual usability testing.

### 2. Baseline User Study (Existing Portal)
We conducted task-based usability testing with 5 users (mixed demographics: ages 22 to 55, rural/urban mix) on the existing live portal.

**Tasks Assigned:**
1. Find the Income Certificate service.
2. Identify required documents.
3. Check the status of a previous application.

**Key Findings & Frictions:**
- **Friction 1 (Navigation):** 80% of users could not find specific certificates without using the search bar, which required exact technical spelling.
- **Friction 2 (Language):** Users struggled with administrative Hindi/English. The lack of a seamless bilingual toggle caused drop-offs.
- **Friction 3 (Mobile Layout):** Zooming and panning were required on mobile devices. Tables overflowed the screen.
- **Friction 4 (Transparency):** Users did not know what documents were required until they had already started the application and reached step 3.

### 3. The "Jan Sahayak" Redesign Principles
Based on the baseline study, we designed the Jan Sahayak prototype with the following principles:
1. **Action-Oriented Architecture:** Services are grouped by intent (Apply, Track, Grievance) rather than government department.
2. **Mobile-First & WCAG 2.2 AA Compliant:** Large tap targets (min 44x44px), high contrast (green/white), and ARIA labels for screen readers.
3. **Frictionless Bilingual Context:** One-tap toggle between simple Hindi and English without losing form state.
4. **Transparent Prerequisites:** A dedicated "Guide" and "Documents" section tells citizens exactly what they need *before* they apply.

### 4. Usability Validation (The Redesign)
The same 5 users were asked to complete the identical tasks on the Jan Sahayak prototype.

**Validation Results:**
- **Time on Task:** Reduced by an average of 65%.
- **Task Success Rate:** Increased from 40% (live portal) to 100% (Jan Sahayak).
- **User Quote:** *"ismein saaf dikh raha hai kahan dabana hai, aur hindi bilkul aam bolchal wali hai." (It's clear where to tap, and the Hindi is conversational).*

### 5. Future Roadmap: Conversational AI
The next iteration of Jan Sahayak will introduce a Voice-to-Action AI. Instead of navigating menus, citizens can simply hold a microphone button and say: *"Mujhe aay pramaan patra banwana hai,"* and the AI will automatically route them to the correct, pre-filled form.
