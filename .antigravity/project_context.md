PROJECT CONTEXT

Project Name: Nutri-Scope

Nutri-Scope is an AI-powered food safety analysis web application.

It scans packaged food products using a barcode and evaluates health safety based on user profile data and ingredient analysis.

---

MAIN FEATURES

Nutri-Scope currently provides the following capabilities:

• barcode scanning using device camera
• ingredient extraction from OpenFoodFacts API
• manual ingredient editing before analysis
• AI-based ingredient safety analysis
• allergy detection
• BMI-based health risk evaluation
• doctor-style AI explanation
• future health impact simulation
• safer alternative product suggestions
• nutritional breakdown using OpenFoodFacts nutriments

---

VERDICT SYSTEM

Nutri-Scope produces one of three verdicts.

SAFE
CAUTION
UNSAFE

Verdict priority rules:

1. Allergy match → UNSAFE

If any ingredient matches the user's declared allergies, the product must be marked UNSAFE.

2. BMI risk → CAUTION

If no allergy risk exists but BMI category is:

Overweight or Obese

then the verdict becomes CAUTION.

3. No risk → SAFE

If no allergies and no BMI risk exist, the product is SAFE.

---

BMI LOGIC

BMI is calculated during profile setup.

BMI formula:

BMI = weight / (height²)

Categories:

BMI < 18.5 → Underweight
BMI 18.5 – 24.9 → Normal
BMI 25 – 29.9 → Overweight
BMI ≥ 30 → Obese

BMI risk applies only when BMI is:

Overweight or Obese.

---

ALLERGY SYSTEM

Users can declare allergies during profile setup.

Example allergies:

peanut
dairy
gluten
soy
shellfish

The AI analysis checks ingredients against these allergies.

If a matching ingredient is found:

triggeredIngredients array will contain the ingredient and reason.

Example:

{
ingredient: "Peanut Oil",
reason: "Allergy"
}

---

AI ANALYSIS SYSTEM

Gemini AI performs ingredient analysis.

The AI receives:

• ingredient list
• user allergies
• BMI information

The AI returns JSON:

{
verdict,
riskLevel,
triggeredIngredients,
doctorNote,
explanation
}

The system then applies its own verdict logic to ensure accuracy.

---

FUTURE HEALTH IMPACT SIMULATION

Nutri-Scope predicts possible health effects if the product is consumed frequently.

Examples:

allergic reactions
metabolic strain
weight gain risk
inflammation from ultra-processed foods

---

ALTERNATIVE PRODUCT SUGGESTION

If a product is UNSAFE, Gemini AI suggests safer alternatives.

Rules:

• alternatives must not contain user allergens
• alternatives should belong to similar product category
• alternatives should be commonly available grocery products

---

NUTRITION BREAKDOWN

Nutri-Scope extracts nutritional data from OpenFoodFacts.

Data extracted:

calories
sugar
carbohydrates
fat
protein
salt

This data is displayed inside ResultScreen.

---

CRITICAL SYSTEM COMPONENTS

The following components are essential to application stability.

ScannerScreen.jsx
scannerService.js
useScanner.js

These manage the camera and barcode scanning.

The following function is critical:

handleAnalysisConfirmed()

This function manages AI analysis and verdict logic.

---

SAFE DEVELOPMENT AREAS

Antigravity may safely extend:

ResultScreen.jsx
IngredientReviewScreen.jsx
foodApiService.js
geminiService.js

Most new features should appear inside ResultScreen.

---

DESIGN STYLE

Nutri-Scope follows an Apple Health inspired interface.

Design principles:

minimal UI
clean typography
glass style cards
mobile-first layout

---

LONG TERM FEATURE ROADMAP

Future improvements may include:

health score system
daily intake comparison
nutritional risk indicators
AI diet recommendations
personalized health insights

---

PROJECT GOAL

Nutri-Scope aims to provide a clinical-grade food safety assistant that helps users understand whether a product is safe for their health profile.

The system should remain stable, clear, and easy to understand for users.