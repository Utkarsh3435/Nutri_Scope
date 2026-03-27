FEATURE DEVELOPMENT TEMPLATE

This template defines how Antigravity must implement any new feature inside Nutri-Scope.

Follow this process strictly to avoid breaking existing functionality.

---

STEP 1 — UNDERSTAND THE FEATURE

Before writing any code:

• Understand the requested feature
• Identify which part of Nutri-Scope it affects
• Confirm how it fits into the existing architecture

Never immediately modify files without planning.

---

STEP 2 — IDENTIFY FILES THAT NEED CHANGES

Determine the minimal number of files required to implement the feature.

Typical Nutri-Scope feature locations:

foodApiService.js
→ extracting data from OpenFoodFacts

App.jsx
→ extending state or passing new data

ResultScreen.jsx
→ displaying new UI elements

IngredientReviewScreen.jsx
→ editing ingredients if required

Never modify scanner-related files unless explicitly instructed.

---

STEP 3 — EXPLAIN THE IMPLEMENTATION PLAN

Before editing code, explain:

• what the feature will do
• which files will be modified
• why the changes are safe
• how existing functionality will remain unaffected

Example explanation format:

"This feature will extract nutrition data from OpenFoodFacts inside foodApiService.js and display it in a new card inside ResultScreen.jsx. No existing scanner or AI logic will be modified."

---

STEP 4 — IMPLEMENT CHANGES

After explaining the plan:

• modify only the minimal required code
• never rewrite entire files
• extend existing structures instead of replacing them

Preferred pattern:

Extend productMeta object instead of creating new state.

Example:

productMeta = {
name,
brand,
barcode,
nutriments
}

---

STEP 5 — USE SAFE PROGRAMMING PRACTICES

All API data must be treated as optional.

Use safe access patterns:

optional chaining
fallback values

Example:

productMeta?.nutriments?.sugar ?? "N/A"

Never assume arrays or objects exist.

---

STEP 6 — VERIFY APPLICATION FLOW

After implementing changes confirm the main application flow remains intact.

LandingScreen
↓
ModeSelectionScreen
↓
ProfileSetupScreen
↓
ScannerScreen
↓
IngredientReviewScreen
↓
AI Analysis
↓
ResultScreen

No navigation logic should be broken.

---

STEP 7 — VERIFY CORE FEATURES

After modifications confirm the following features still work:

• barcode scanner
• camera permissions
• ingredient editing
• AI analysis
• result screen rendering
• navigation transitions

---

STEP 8 — PROVIDE CHANGE SUMMARY

After completing implementation provide a clear summary:

• files modified
• code added
• why the change is safe
• how it integrates with the Nutri-Scope architecture

---

FEATURE IMPLEMENTATION PRIORITY

Preferred feature expansion areas include:

nutrition breakdown
health score system
ingredient risk visualization
AI doctor explanation improvements
future health impact simulation
alternative safer products

---

DEVELOPMENT PRINCIPLE

The goal is to improve Nutri-Scope while maintaining stability.

Every feature should be implemented with minimal disruption to the existing codebase.