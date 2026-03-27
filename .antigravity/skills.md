PROJECT NAME

Nutri-Scope

PROJECT DESCRIPTION

Nutri-Scope is an AI-powered food safety analyzer that scans packaged food products using a barcode scanner and evaluates health safety using:

• ingredient analysis
• user allergy profile
• BMI health data
• nutritional composition
• AI reasoning

The system produces a verdict:

SAFE
CAUTION
UNSAFE

---

CRITICAL FILES — DO NOT MODIFY

The following files are extremely sensitive and control the camera, barcode scanning, and navigation flow.

These files must never be rewritten unless explicitly instructed.

ScannerScreen.jsx
scannerService.js
useScanner.js

These files manage:

• camera access
• barcode detection
• scanner initialization

Modifying them incorrectly will break the camera.

---

AI ANALYSIS LOGIC

The AI analysis system is located in:

App.jsx
function handleAnalysisConfirmed()

This function performs:

• allergy detection
• BMI classification
• Gemini AI prompt creation
• AI response parsing
• verdict determination
• future health impact simulation
• alternative product suggestions

This function must not be rewritten unless the user explicitly asks.

---

APPLICATION STATE VARIABLES

The following state variables exist in App.jsx and must never be renamed or removed.

userProfile
scannedIngredients
productMeta
scanResult
currentScreen
isAnalyzing
isFetchingIngredients

These variables control application navigation and data flow.

---

APPLICATION DATA FLOW

The Nutri-Scope system follows this architecture.

Barcode Scan
↓
ScannerScreen
↓
handleScanDetected()
↓
fetchFoodByBarcode()
↓
IngredientReviewScreen
↓
handleAnalysisConfirmed()
↓
Gemini AI analysis
↓
ResultScreen

This flow must remain unchanged.

---

SAFE FILES FOR FEATURE DEVELOPMENT

The following files are safe for modifications and feature expansion.

components/screens/ResultScreen.jsx

Used for displaying:

• verdict
• triggered ingredients
• doctor explanation
• future health impact
• alternative products
• nutrition breakdown

components/screens/IngredientReviewScreen.jsx

Used for:

• editing ingredients
• confirming ingredient list before analysis

components/ui/

Reusable UI components.

services/foodApiService.js

Responsible for:

• fetching OpenFoodFacts data
• extracting ingredients
• extracting nutrition data

services/geminiService.js

Responsible for:

• calling Gemini AI
• returning AI responses

---

ADDING NEW DATA STRUCTURES

When introducing new data fields, extend existing objects instead of creating unnecessary new global state.

Preferred approach:

productMeta = {
name,
brand,
barcode,
nutriments
}

Do not introduce redundant states.

---

DEFENSIVE PROGRAMMING RULES

All external API data must be treated as potentially missing.

Always implement safe access.

Example:

productMeta?.nutriments?.sugar ?? "N/A"

Never assume arrays exist.

Always verify:

Array.isArray(data)

---

UI DEVELOPMENT GUIDELINES

Nutri-Scope uses a clean Apple-Health-style interface.

Design principles:

minimal layout
soft shadows
glass card components
clean typography
mobile-first design

Use this standard card style for new UI components:

className="glass-card p-6 border border-slate-100 bg-white"

---

PERFORMANCE RULES

Avoid the following:

• heavy loops inside React render
• unnecessary useEffect hooks
• repeated API calls

All new features must be lightweight and efficient.

---

ALLOWED FEATURE EXPANSIONS

Antigravity may assist with implementing:

nutrition breakdown
health score calculation
ingredient risk visualization
AI explanation improvements
alternative product suggestions
future health impact simulation

These features should be implemented mainly inside:

ResultScreen.jsx

---

TESTING REQUIREMENTS

After any modification verify:

barcode scanning still works
camera permissions still work
ingredient editing works
AI analysis executes correctly
ResultScreen renders without crashing

---

DEVELOPMENT GOAL

Nutri-Scope must remain stable while gradually adding intelligent health analysis features.

Focus on:

safe feature additions
clean architecture
stable UI rendering
robust AI integration