import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from './components/screens/LandingScreen';
import ModeSelectionScreen from './components/screens/ModeSelectionScreen';
import ProfileSetupScreen from './components/screens/ProfileSetupScreen';
import ScannerScreen from './components/screens/ScannerScreen';
import ResultScreen from './components/screens/ResultScreen';
import IntroScreen from './components/screens/IntroScreen'; // NEW
import IngredientReviewScreen from './components/screens/IngredientReviewScreen'; // NEW
import CompareScreen from './components/screens/CompareScreen'; // NEW
import { fetchFoodByBarcode } from './services/foodApiService';
import { callGemini } from './services/geminiService';


function App() {
    const [showIntro, setShowIntro] = useState(true); // Intro Logic
    const [currentScreen, setCurrentScreen] = useState('LANDING');
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('nutriscope_profile');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Do not persist BMI data across website refreshes per user request
            parsed.bmiData = null;
            return parsed;
        }
        return {
            mode: null, // 'allergy' | 'health'
            allergies: [],
            bmiData: null
        };
    });
    const [scanResult, setScanResult] = useState(null);
    const [scannedIngredients, setScannedIngredients] = useState([]); // NEW
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const isAnalyzingRef = React.useRef(false);
    const [isFetchingIngredients, setIsFetchingIngredients] = useState(false);
    const [productMeta, setProductMeta] = useState(null);
    const geminiCache = React.useRef({});

    // --- Persistence ---
    React.useEffect(() => {
        localStorage.setItem('nutriscope_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    // Screen persistence removed to ensure flow always starts at Landing

    // --- Handlers ---

    const handleGetStarted = () => {
        setCurrentScreen('MODE_SELECTION');
    };

    const handleModeSelect = (mode) => {
        setUserProfile(prev => ({ ...prev, mode }));
        setCurrentScreen('PROFILE_SETUP');
    };

    const handleProfileComplete = ({ allergies, bmiData }) => {
        let fixedBmiData = null;

        const height = Number(bmiData?.height);
        const weight = Number(bmiData?.weight);

        if (!isNaN(height) && !isNaN(weight) && height > 0) {
            const bmi = +(weight / ((height / 100) ** 2)).toFixed(1);

            fixedBmiData = {
                height,
                weight,
                bmi
            };
        }

        setUserProfile(prev => ({
            ...prev,
            allergies,
            bmiData: fixedBmiData
        }));

        console.log("SAVED BMI PROFILE:", fixedBmiData);

        setCurrentScreen('SCANNER');
    };

    const handleScanDetected = async (barcode) => {
        if (isFetchingIngredients) return;
        setProductMeta(null); // prevents old product showing if scan fails
        console.log("Scanned:", barcode);

        setIsFetchingIngredients(true);

        try {
            const product = await fetchFoodByBarcode(barcode);

            // OpenFoodFacts success
            if (product && product.ingredientsText) {
                setProductMeta({
                    name: product.name || product.product_name || "Unknown Product",
                    brand: product.brand || product.brands || "Unknown",
                    barcode,
                    nutriments: product.nutriments || null,
                    image: product.image || null
                });

                const ingredients = product.ingredientsText
                    .replace(/\(|\)|\./g, "")
                    .split(",")
                    .map(i => i.trim())
                    .filter(i => i.length > 1);

                setScannedIngredients(
                    ingredients.length ? ingredients : ["Unknown Ingredients"]
                );

                setCurrentScreen("INGREDIENT_REVIEW");
                return;
            }

            // Gemini fallback
            const prompt = `
Return comma-separated ingredient list for this barcode: ${barcode}.
Only list ingredients. No extra text.
`;

            const aiText = await callGemini(prompt);

            if (aiText) {

                setProductMeta({
                    name: `Product (${barcode})`,
                    brand: "Unknown",
                    barcode,
                    nutriments: null,
                    image: null
                });

                const ingredients = aiText
                    .split(",")
                    .map(i => i.trim())
                    .filter(Boolean);

                setScannedIngredients(
                    ingredients.length ? ingredients : ["Unknown Ingredients"]
                );

                setCurrentScreen("INGREDIENT_REVIEW");
                return;
            }

            throw new Error("No ingredient data found");

        } catch (error) {
            console.error("Ingredient fetch failed:", error);

            setProductMeta({
                name: "Unknown Product",
                brand: "Unknown Brand",
                barcode,
                nutriments: null,
                image: null
            });

            setScannedIngredients([
                "Ingredients unavailable — manual verification required"
            ]);

            setCurrentScreen("INGREDIENT_REVIEW");

        } finally {
            setIsFetchingIngredients(false);
        }
    };

    const handleAnalysisConfirmed = async (ingredientsOverride, productNameOverride) => {
        if (isAnalyzingRef.current) return;
        isAnalyzingRef.current = true;
        setIsAnalyzing(true);

        let bmiValue = userProfile?.bmiData?.bmi ?? null;
        let computedBmiCategory = null;

        try {
            const ingredientsArray = ingredientsOverride?.length
                ? ingredientsOverride
                : scannedIngredients;

            if (!ingredientsArray.length) throw new Error("No ingredients");

            const ingredientsText = ingredientsArray.join(", ");

            if (ingredientsOverride?.length) setScannedIngredients(ingredientsOverride);
            if (productNameOverride) {
                setProductMeta(prev => ({ ...prev, name: productNameOverride }));
            }

            // ===============================
            // AI MASTER PROMPT — OLD PROJECT STYLE
            // ===============================

            if (typeof bmiValue === "number") {
                if (bmiValue < 18.5) computedBmiCategory = "Underweight";
                else if (bmiValue < 25) computedBmiCategory = "Normal";
                else if (bmiValue < 30) computedBmiCategory = "Overweight";
                else computedBmiCategory = "Obese";
            }

            const prompt = `
You are a clinical-grade food safety decision system.

PRIMARY RULE (STRICT):
Only treat ingredients as ALLERGY violations if they MATCH the USER'S DECLARED ALLERGIES EXACTLY.
DO NOT flag allergens outside the user's allergy list.

SECONDARY RULE:
BMI can ONLY downgrade SAFE → CAUTION.
BMI must NEVER override allergy safety.

USER PROFILE (SYSTEM VERIFIED — DO NOT OVERRIDE):
Declared Allergies: ${userProfile.allergies?.join(", ") || "None"}

BMI STATUS:
${bmiValue !== null
                    ? `BMI Value = ${bmiValue} (${computedBmiCategory})`
                    : `BMI Value = null (NOT PROVIDED)`
                }

BMI INTERPRETATION RULE:
- If BMI < 18.5 → Underweight
- If BMI 18.5–24.9 → Normal
- If BMI 25–29.9 → Overweight
- If BMI ≥ 30 → Obese
- If BMI is null → bmiCategory MUST be null

PRODUCT INGREDIENTS:
${ingredientsText}

TASK:
1. Match ONLY ingredients related to USER allergies.
2. If no ingredient matches user allergies → NO allergy risk.
3. Detect BMI risk ONLY if BMI is Overweight or Obese.
+4. If user has "Diabetes" in their profile, treat it as an allergy.
+5. Diabetes risk should produce UNSAFE verdict.
4. Verdict priority:
   - Allergy match → UNSAFE
   - BMI risk only → CAUTION
   - No risk → SAFE
5. DO NOT assume allergies beyond user profile.

OUTPUT STRICT JSON ONLY:
{
  "verdict": "SAFE | CAUTION | UNSAFE",
  "riskLevel": "Low | Medium | High",

  "triggeredIngredients": [
    { "ingredient": "Exact ingredient", "reason": "Allergy | BMI | Nutrition" }
  ],

  "bmiCategory": "Underweight | Normal | Overweight | Obese | null",
  "bmiValue": Number | null,

  "doctorNote": "Write like a real friendly doctor talking to the user. Be calm, supportive, non-judgmental. Mention allergy or BMI risk if present. Give practical advice.",
  "explanation": "Explain the medical logic in simple human language. Avoid robotic tone."
}
`;

            const aiText = await callGemini(prompt);

            if (!aiText || typeof aiText !== "string") {
                throw new Error("Empty AI response");
            }

            const clean = aiText.replace(/```json|```/gi, "").trim();
            const match = clean.match(/\{[\s\S]*\}/);

            if (!match) throw new Error("AI returned invalid JSON");

            let result;
            try {
                result = JSON.parse(match[0]);
            } catch {
                throw new Error("AI JSON parse failed");
            }

            if (!result || typeof result !== "object") {
                throw new Error("Bad AI JSON structure");
            }

            if (!result.verdict) throw new Error("AI missing verdict");
            if (!result.riskLevel) throw new Error("AI missing riskLevel");

            const allergyTriggers = Array.isArray(result.triggeredIngredients)
                ? result.triggeredIngredients.filter(t =>
                    t.reason?.toLowerCase().includes("allergy")
                )
                : [];

            const hasAllergyRisk = allergyTriggers.length > 0;

            const hasBmiRisk = computedBmiCategory === "Overweight" || computedBmiCategory === "Obese";

            // SYSTEM-CONTROLLED FINAL VERDICT
            let finalVerdict = "SAFE";
            let finalRiskLevel = "Low";

            if (hasAllergyRisk) {
                finalVerdict = "UNSAFE";
                finalRiskLevel = "High";
            }
            else if (hasBmiRisk) {
                finalVerdict = "CAUTION";
                finalRiskLevel = "Medium";
            }


            let alternativeProducts = [];

            if (finalVerdict === "UNSAFE") {
                try {
                    const altPrompt = `
You are a food safety assistant.

User allergies: ${userProfile.allergies?.join(", ") || "None"}

Unsafe product: ${productMeta?.name || "Unknown"}

Ingredients:
${ingredientsText}

Suggest 3 safer real-world alternative products.
Rules:
- Must NOT contain user allergens
- Same category if possible
- Common grocery products

Output STRICT JSON ONLY:
{
  "alternatives": [
    { "name": "Product Name", "brand": "Brand", "reason": "Why safer" }
  ]
}
`;

                    const altAI = await callGemini(altPrompt);

                    if (altAI) {
                        const cleanAlt = altAI.replace(/```json|```/gi, "").trim();
                        const matchAlt = cleanAlt.match(/\{[\s\S]*\}/);

                        if (matchAlt) {
                            const parsedAlt = JSON.parse(matchAlt[0]);
                            alternativeProducts = Array.isArray(parsedAlt.alternatives)
                                ? parsedAlt.alternatives
                                : [];
                        }
                    }

                } catch (err) {
                    console.warn("Alternative product AI failed safely:", err);

                    // Safe fallback if AI fails
                    alternativeProducts = [
                        {
                            name: "Allergen-Free Variant",
                            brand: "Safe Choice",
                            reason: "Does not contain your allergens"
                        },
                        {
                            name: "Low-Additive Option",
                            brand: "Healthier Pick",
                            reason: "Cleaner ingredient profile"
                        }
                    ];
                }
            }

            // ===============================
            // FUTURE HEALTH IMPACT SIMULATION ENGINE
            // ===============================

            let futureImpact = [];

            const hasUltraProcessed = /flavour|maltodextrin|emulsifier|preservative|stabilizer/i.test(ingredientsText);

            // Allergy impact
            if (hasAllergyRisk) {
                futureImpact.push("May trigger allergic reactions or immune complications if consumed.");
            }

            // BMI impact
            if (computedBmiCategory === "Overweight") {
                futureImpact.push("Regular consumption may contribute to gradual weight gain and metabolic strain.");
            }

            if (computedBmiCategory === "Obese") {
                futureImpact.push("High risk of worsening obesity, insulin resistance, and cardiovascular strain if consumed frequently.");
            }

            // Processing impact
            if (hasUltraProcessed) {
                futureImpact.push("Frequent intake may increase long-term inflammation and digestive health risk.");
            }

            // Safe case
            if (!futureImpact.length) {
                futureImpact.push("No major long-term health risks predicted with moderate consumption.");
            }

            let humanDoctorNote = result.doctorNote || "";

            if (!humanDoctorNote || humanDoctorNote.length < 20) {
                if (hasAllergyRisk) {
                    humanDoctorNote = "I would strongly recommend avoiding this product, as it contains ingredients that could trigger your allergy. Your safety should always come first.";
                }
                else if (hasBmiRisk) {
                    humanDoctorNote = "This product may not be ideal for frequent consumption given your BMI. Moderation and healthier alternatives could help support your long-term health.";
                }
                else {
                    humanDoctorNote = "This product appears safe when consumed in moderation. Maintaining a balanced diet is always a smart choice.";
                }
            }


            const finalResult = {
                verdict: finalVerdict,
                riskLevel: finalRiskLevel,

                triggeredIngredients: Array.isArray(result.triggeredIngredients)
                    ? result.triggeredIngredients
                    : [],

                doctorNote: humanDoctorNote,
                explanation: result.explanation || "No explanation provided.",
                ingredientsList: ingredientsText,

                bmiValue,
                bmiCategory: computedBmiCategory,
                futureImpact,
                alternativeProducts,
            };

            setScanResult(finalResult);

            // [NEW] Persist for comparison functionality
            try {
                const existing = localStorage.getItem("lastProduct");

                if (existing) {
                    localStorage.setItem("previousProduct", existing);
                }

                const storedProduct = {
                    result: finalResult,
                    productMeta
                };
                localStorage.setItem("lastProduct", JSON.stringify(storedProduct));
            } catch (storageError) {
                console.warn("Storage warning: Could not persist lastProduct to localStorage.", storageError);
            }

            setCurrentScreen("RESULT");

        } catch (err) {
            console.error("AI Analysis failed:", err);

            setScanResult({
                verdict: userProfile.allergies?.length ? "UNSAFE" : "CAUTION",
                riskLevel: userProfile.allergies?.length ? "High" : "Low",
                triggeredIngredients: [],
                explanation: "AI analysis failed — manual verification recommended.",
                doctorNote: "Safety could not be confirmed.",
                ingredientsList: scannedIngredients.join(", "),
                bmiCategory: computedBmiCategory || null,
                bmiValue: bmiValue || null,

                // ✅ ADD THIS FIX
                alternativeProducts: [],
                futureImpact: []
            });

            setCurrentScreen("RESULT");

        } finally {
            isAnalyzingRef.current = false;
            setIsAnalyzing(false);
        }
    };

    const handleScanBack = () => {
        setCurrentScreen("PROFILE_SETUP");
    };

    const handleScanAgain = () => {
        setScanResult(null);
        setScannedIngredients([]);
        setProductMeta(null); // ✅ ADD THIS LINE
        setCurrentScreen("SCANNER");
    };

    const handleEditProfile = () => {
        setCurrentScreen("PROFILE_SETUP");
    };

    // --- Render ---

    return (
        <>
            {isFetchingIngredients && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 text-white font-bold text-lg">
                    Fetching Ingredients...
                </div>
            )}

            {isAnalyzing && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur text-white">
                    <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mb-4"></div>
                    <p className="font-bold tracking-wide">Analyzing with Gemini AI...</p>
                </div>
            )}

            <AnimatePresence mode="wait">
                {showIntro && (
                    <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />
                )}
            </AnimatePresence>

            {!showIntro && (
                <>
                    {currentScreen === 'LANDING' && (
                        <LandingScreen onGetStarted={handleGetStarted} />
                    )}

                    {currentScreen === 'MODE_SELECTION' && (
                        <ModeSelectionScreen onModeSelect={handleModeSelect} />
                    )}

                    {currentScreen === 'PROFILE_SETUP' && (
                        <ProfileSetupScreen
                            isHealthMode={userProfile.mode === 'health'}
                            onComplete={handleProfileComplete}
                            initialData={userProfile}
                        />
                    )}

                    {currentScreen === 'SCANNER' && (
                        <ScannerScreen
                            onScanDetected={handleScanDetected}
                            onBack={handleScanBack}
                        />
                    )}

                    {currentScreen === 'INGREDIENT_REVIEW' && (
                        <IngredientReviewScreen
                            ingredients={scannedIngredients}
                            userAllergens={userProfile.allergies}
                            productMeta={productMeta}
                            onAnalyze={handleAnalysisConfirmed}
                            onRetake={handleScanAgain}
                        />
                    )}

                    {currentScreen === 'RESULT' && scanResult && (
                        <ResultScreen
                            {...scanResult}
                            productMeta={productMeta}
                            onScanAgain={handleScanAgain}
                            onEditProfile={handleEditProfile}
                            onCompare={() => setCurrentScreen('COMPARE')}
                        />
                    )}

                    {currentScreen === 'COMPARE' && scanResult && (
                        <CompareScreen
                            currentScan={scanResult}
                            currentMeta={productMeta}
                            onBack={() => setCurrentScreen('RESULT')}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default App;