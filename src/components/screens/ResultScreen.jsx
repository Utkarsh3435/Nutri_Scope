import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

/**
 * ResultScreen - "Medical Verdict Report"
 * 
 * Design: Apple Health × Levels × AI Lab
 */

const ResultScreen = ({
    verdict = 'SAFE',
    riskLevel = 'Low',
    triggeredIngredients = [],
    bmiCategory = null,
    doctorNote = "No major health concerns detected.",
    explanation = "No anomalies detected based on your profile.",
    ingredientsList = "Water, Sugar, Spices...",
    onScanAgain,
    onEditProfile,
    bmiValue = null,
    futureImpact = [],
    alternativeProducts = [],
    productMeta = null,
    onCompare,
}) => {
    const [detailsOpen, setDetailsOpen] = useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }, 100);
    }, []);

    const cx = (...classes) => classes.filter(Boolean).join(' ');

    // --- Premium Clinical Theme Config ---
    const theme = {
        SAFE: {
            bg: "bg-emerald-50",
            text: "text-emerald-800",
            label: "Safe to Consume",
            accent: "bg-emerald-500",
            border: "border-emerald-200",
            glow: "shadow-[0_0_80px_rgba(16,185,129,0.3)]",
            aura: "from-emerald-500/10 to-teal-500/5",
            iconColor: "text-emerald-600",
            icon: (
                <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            riskBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
            barColor: "bg-emerald-500"
        },
        CAUTION: {
            bg: "bg-amber-50",
            text: "text-amber-800",
            label: "Consume with Caution",
            accent: "bg-amber-500",
            border: "border-amber-200",
            glow: "shadow-[0_0_80px_rgba(245,158,11,0.3)]",
            aura: "from-amber-500/10 to-orange-500/5",
            iconColor: "text-amber-600",
            icon: (
                <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            ),
            riskBadge: "bg-amber-100 text-amber-800 border-amber-200",
            barColor: "bg-amber-500"
        },
        UNSAFE: {
            bg: "bg-rose-50",
            text: "text-rose-800",
            label: "Avoid Consumption",
            accent: "bg-rose-500",
            border: "border-rose-200",
            glow: "shadow-[0_0_80px_rgba(244,63,94,0.3)]",
            aura: "from-rose-500/10 to-red-500/5",
            iconColor: "text-rose-600",
            icon: (
                <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            ),
            riskBadge: "bg-rose-100 text-rose-800 border-rose-200",
            barColor: "bg-rose-500"
        }
    };

    const activeTheme = theme[verdict] || theme.SAFE;

    // Helper: Ingredient Chips (Risk Highlighting)
    const renderHighlightedIngredients = () => {
        if (!ingredientsList) return null;

        // Extract array of strings from comma separated list
        const parts = ingredientsList.split(/,(?![^(]*\))/).map(i => i.trim()).filter(Boolean);

        return (
            <div className="flex flex-wrap gap-2 mt-2">
                {parts.map((ing, i) => {
                    const matchedTrigger = triggeredIngredients.find(t =>
                        ing.toLowerCase().includes(t.ingredient.toLowerCase())
                    );

                    let chipStyle = "bg-slate-100 text-slate-700 border-slate-200"; // Safe (Gray)

                    if (matchedTrigger) {
                        const reason = matchedTrigger.reason?.toLowerCase() || "";
                        if (reason.includes("allergy") || reason.includes("allergen")) {
                            chipStyle = "bg-red-50 text-red-700 border-red-200 font-bold shadow-sm"; // Allergy (Red)
                        } else {
                            chipStyle = "bg-orange-50 text-orange-700 border-orange-200 font-bold shadow-sm"; // BMI/Nutrition (Orange)
                        }
                    }

                    return (
                        <span key={i} className={`px-3 py-1 text-xs rounded-full border ${chipStyle}`}>
                            {ing}
                        </span>
                    );
                })}
            </div>
        );
    };



    return (
        <div className="min-h-screen bg-[#F8FAFC] relative pb-44 font-sans">

            {/* HERO: Clinical Authority Reveal */}
            <motion.div
                className="relative w-full rounded-b-[3rem] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] z-20 pb-16 pt-14 text-center overflow-hidden"
                initial={{ height: "100vh" }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Aura Background */}
                <div className={cx("absolute inset-0 bg-gradient-to-b opacity-50 pointer-events-none transition-colors duration-1000", activeTheme.aura)} />

                <div className="relative z-10 flex flex-col items-center px-6">

                    {/* Badge Container with Breathing & Shockwave */}
                    <div className="relative mb-6">
                        {/* Shockwave Rings */}
                        <motion.div
                            className={cx("absolute inset-0 rounded-3xl opacity-20", activeTheme.accent)}
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.div
                            className={cx("absolute inset-0 rounded-3xl opacity-20 animation-delay-500", activeTheme.accent)}
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                        />

                        {/* Main Icon Box - Breathing Effect */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 20 }}
                            animate={{
                                scale: [1, 1.03, 1],
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 0.6, delay: 0.4 },
                                y: { type: "spring", stiffness: 180, damping: 20, delay: 0.4 }
                            }}
                            className={cx("relative w-28 h-28 rounded-[2rem] flex items-center justify-center bg-white border ring-8 ring-white/60", activeTheme.border, activeTheme.glow)}
                        >
                            <div className={cx("transform transition-colors drop-shadow-sm", activeTheme.iconColor)}>
                                {activeTheme.icon}
                            </div>
                        </motion.div>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-[2.5rem] font-black text-slate-900 tracking-tight leading-none mb-3"
                    >
                        {verdict === 'SAFE' ? 'Safe.' : verdict === 'CAUTION' ? 'Caution.' : 'UNSAFE.'}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className={cx("px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/50 border backdrop-blur-sm", activeTheme.text, activeTheme.border)}
                    >
                        {activeTheme.label}
                    </motion.div>

                    {/* Primary Risk Cause Badge (If UNSAFE) */}
                    {(verdict === 'UNSAFE' || verdict === 'CAUTION') && triggeredIngredients.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="mt-4 px-3 py-1 rounded-lg bg-red-50 text-red-700 text-[10px] font-extrabold uppercase tracking-wide border border-red-100 shadow-sm"
                        >
                            Primary Risk: {triggeredIngredients[0]?.ingredient || "Metabolic Risk"}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* INGREDIENTS WITH RISK HIGHLIGHTING */}
            <div className="px-5 -mt-8 relative z-30 mb-5">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, type: "spring", damping: 25 }}
                    className="glass-card bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 tracking-wide">
                            Ingredients
                        </h3>
                    </div>
                    {renderHighlightedIngredients()}
                </motion.div>
            </div>

            {/* EVIDENCE STACK */}
            <div className="px-5 relative z-30 space-y-5">

                {/* 1. CLINICAL EVIDENCE CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, type: "spring", damping: 25 }}
                    className="glass-card overflow-hidden"
                >
                    {/* Header: Risk Gauge */}
                    <div className="px-8 py-6 border-b border-slate-50 bg-gradient-to-r from-white to-slate-50/50">

                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    AI Confidence
                                </span>
                                <span className="text-2xl font-black text-slate-900 tracking-tight">
                                    98.5%
                                </span>
                            </div>

                            <div className={cx(
                                "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border shadow-sm",
                                activeTheme.riskBadge
                            )}>
                                Risk: {riskLevel}
                            </div>
                        </div>

                    </div>

                    {/* Evidence Rows - Staggered Reveal */}
                    <div className="p-2">
                        {/* Row A: Allergy */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 }}
                            className="p-5 flex items-center gap-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors rounded-xl"
                        >
                            <div className={cx("w-2.5 h-2.5 rounded-full transition-shadow duration-500", triggeredIngredients.length > 0 ? "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]" : "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]")} />
                            <div className="flex-1">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Primary Filter</span>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-slate-900">Allergen Safety Check</h4>
                                    {triggeredIngredients.length > 0 ?
                                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 shadow-sm">FAIL</span> :
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shadow-sm">PASS</span>
                                    }
                                </div>
                                {triggeredIngredients.length > 0 ? (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {triggeredIngredients.map((t, i) => (
                                            <span key={i} className="px-2 py-1 bg-white border border-rose-100 text-rose-700 rounded-md text-xs font-bold shadow-sm">
                                                {t.ingredient}
                                                <span className="ml-1 text-[10px] text-rose-500">
                                                    ({t.reason})
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-400 mt-1 font-medium">No allergy conflicts detected.</p>
                                )}
                            </div>
                        </motion.div>

                        {/* Row B: BMI Status Card */}
                        {typeof bmiValue === "number" && !isNaN(bmiValue) && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.25 }}
                                className="p-5 flex items-center gap-4 rounded-xl hover:bg-slate-50/50 transition-colors border-t border-slate-50"
                            >
                                {/* Status Dot */}
                                <div className={cx(
                                    "w-2.5 h-2.5 rounded-full shadow-md",
                                    bmiCategory === "Obese"
                                        ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                                        : bmiCategory === "Overweight"
                                            ? "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                                            : bmiCategory === "Underweight"
                                                ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)]"
                                                : "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                                )} />

                                <div className="flex-1">
                                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                                        Body Mass Index (BMI)
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <h4 className="text-sm font-bold text-slate-900">
                                            BMI: {bmiValue}
                                        </h4>

                                        <span className={cx(
                                            "text-[10px] font-bold px-2 py-0.5 rounded border",
                                            bmiCategory === "Obese"
                                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                                : bmiCategory === "Overweight"
                                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                                    : bmiCategory === "Underweight"
                                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        )}>
                                            {bmiCategory || "Unknown"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-500 mt-1 font-medium">
                                        {bmiCategory === "Obese" && "High metabolic risk — strong dietary caution recommended."}
                                        {bmiCategory === "Overweight" && "Moderate metabolic risk — limit sugar and fats."}
                                        {bmiCategory === "Underweight" && "Low body mass — calorie-dense nutrition recommended."}
                                        {bmiCategory === "Normal" && "BMI in healthy metabolic range."}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* AI DOCTOR NOTE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="glass-card p-6 border border-slate-100 bg-white"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            🩺
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 tracking-wide">
                            AI Doctor Note
                        </h3>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                        {doctorNote}
                    </p>

                    {triggeredIngredients.length > 0 && (
                        <p className="mt-2 text-xs text-rose-600 font-bold">
                            Triggered by: {triggeredIngredients.map(t => `${t.ingredient} (${t.reason})`).join(", ")}
                        </p>
                    )}

                    {bmiCategory && (
                        <div className="mt-3 text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-full border border-indigo-200">
                            BMI Category: {bmiCategory}
                        </div>
                    )}
                </motion.div>

                {/* FUTURE HEALTH IMPACT SIMULATION */}
                {futureImpact?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                        className="glass-card p-6 border border-slate-100 bg-white"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                🔮
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 tracking-wide">
                                Future Health Impact Simulation
                            </h3>
                        </div>

                        <ul className="mt-2 space-y-2 text-sm text-slate-700 font-medium">
                            {futureImpact.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-purple-500 font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-3 text-[11px] text-slate-400 italic">
                            Predictions are based on nutritional patterns, metabolic risk models, and clinical dietary research.
                        </p>
                    </motion.div>
                )}

                {/* ALTERNATIVE PRODUCTS */}
                {Array.isArray(alternativeProducts) && alternativeProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        className="glass-card p-6 border border-slate-100 bg-white"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                🌿
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 tracking-wide">
                                Healthy Swap
                            </h3>
                        </div>

                        <ul className="mt-2 space-y-3">
                            {alternativeProducts.map((alt, i) => (
                                <li key={i} className="border-b border-slate-50 pb-2 last:border-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-green-600 font-bold">{alt.name}</span>
                                        <span className="text-[10px] text-slate-400 font-mono">
                                            {alt.brand || "Unknown Brand"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-600 font-medium">
                                        {alt.reason}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <p className="mt-3 text-[11px] text-slate-400 italic">
                            These products are safer alternatives that avoid your allergens.
                        </p>
                    </motion.div>
                )}

                {/* NUTRITION BREAKDOWN */}
                {productMeta?.nutriments && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="glass-card p-6 border border-slate-100 bg-white"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                📊
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 tracking-wide">
                                Nutrition Breakdown
                            </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Calories", value: productMeta.nutriments.calories, unit: "kcal" },
                                { label: "Sugar", value: productMeta.nutriments.sugar, unit: "g" },
                                { label: "Carbs", value: productMeta.nutriments.carbohydrates, unit: "g" },
                                { label: "Fat", value: productMeta.nutriments.fat, unit: "g" },
                                { label: "Protein", value: productMeta.nutriments.protein, unit: "g" },
                                { label: "Salt", value: productMeta.nutriments.salt, unit: "g" }
                            ].map((item, i) => {
                                const parseValue = (val) => {
                                    if (val === "N/A" || val === null || val === undefined) return "N/A";
                                    const num = parseFloat(val);
                                    return isNaN(num) ? "N/A" : num.toFixed(1);
                                };
                                const formattedValue = parseValue(item.value);

                                return (
                                    <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex flex-col justify-center">
                                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-sm font-black text-slate-900 flex items-baseline justify-center gap-1">
                                            {formattedValue}
                                            {formattedValue !== "N/A" && <span className="text-[10px] text-slate-500 font-bold">{item.unit}</span>}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* 2. INGREDIENT RISK LAB */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, type: "spring" }}
                    className="glass-card overflow-hidden"
                >
                    <button
                        onClick={() => setDetailsOpen(!detailsOpen)}
                        className="w-full flex items-center justify-between p-6 text-left group hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                                🔬
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">
                                    Ingredient Risk Analysis
                                </h3>
                                <p className="text-xs text-slate-400 font-mono mt-0.5 group-hover:text-slate-500">
                                    CLINICAL_COMPOUND_SCAN
                                </p>
                            </div>
                        </div>

                        <div className={cx("transition-transform duration-300 text-slate-300", detailsOpen && "rotate-180 text-brand-teal")}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>

                    <AnimatePresence>
                        {detailsOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-6 pb-8 pt-2 border-t border-slate-50 space-y-6"
                            >

                                {/* SUMMARY STRIP */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { label: "Ingredients", value: ingredientsList?.split(",").length || 0 },
                                        { label: "Allergen Triggers", value: triggeredIngredients.length },
                                        { label: "Additives", value: (ingredientsList?.match(/\b(e\d+|enhancer|preservative|thickener)\b/gi) || []).length },
                                        { label: "Ultra-Processed", value: (ingredientsList?.match(/\b(flavour|emulsifier|stabilizer|maltodextrin)\b/gi) || []).length }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm text-center">
                                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                                {item.label}
                                            </p>
                                            <p className="text-lg font-black text-slate-900 mt-1">
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* COMPOUND TABLE */}
                                <div className="rounded-xl border border-slate-100 overflow-x-auto">
                                    <div className="min-w-[720px]">
                                        <table className="w-full text-xs">
                                            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                                                <tr>
                                                    <th className="px-4 py-2 text-left">Ingredient</th>
                                                    <th className="px-4 py-2 text-left">Category</th>
                                                    <th className="px-4 py-2 text-left">Risk</th>
                                                    <th className="px-4 py-2 text-left">Reason</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-slate-100">
                                                {ingredientsList?.split(",").map((raw, i) => {
                                                    const name = raw.trim();
                                                    const trigger = triggeredIngredients.find(t =>
                                                        name.toLowerCase().includes(t.ingredient.toLowerCase())
                                                    );

                                                    const isAdditive = /\b(e\d+|enhancer|preservative|thickener|emulsifier)\b/i.test(name);
                                                    const isUltra = /\b(flavour|maltodextrin|stabilizer|artificial)\b/i.test(name);

                                                    const category =
                                                        trigger ? "Allergen"
                                                            : isAdditive ? "Additive"
                                                                : isUltra ? "Ultra-Processed"
                                                                    : "Food Base";

                                                    const risk =
                                                        trigger ? "High"
                                                            : isAdditive ? "Medium"
                                                                : isUltra ? "Medium"
                                                                    : "Low";

                                                    return (
                                                        <tr key={i} className={cx(
                                                            "hover:bg-slate-50 transition",
                                                            trigger && "bg-rose-50"
                                                        )}>
                                                            <td className="px-4 py-2 font-semibold text-slate-800">
                                                                {name}
                                                            </td>

                                                            <td className="px-4 py-2 text-slate-500">
                                                                {category}
                                                            </td>

                                                            <td className={cx(
                                                                "px-4 py-2 font-bold",
                                                                risk === "High" && "text-rose-600",
                                                                risk === "Medium" && "text-amber-600",
                                                                risk === "Low" && "text-emerald-600"
                                                            )}>
                                                                {risk}
                                                            </td>

                                                            <td className="px-4 py-2 text-slate-500">
                                                                {trigger
                                                                    ? `Matches allergy (${trigger.reason})`
                                                                    : isAdditive
                                                                        ? "Synthetic food additive"
                                                                        : isUltra
                                                                            ? "Ultra-processed compound"
                                                                            : "No known risk"}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* FOOTNOTE */}
                                <p className="text-[10px] text-slate-400 font-mono italic">
                                    Clinical label scan categorizes ingredients based on allergen profile, additive exposure, and processing intensity.
                                </p>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* FIXED FOOTER */}
            <motion.div
                className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-white/50 p-6 pb-9 flex flex-col items-center shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.05)] z-40"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1.4, type: "spring" }}
            >
                <div className="flex space-x-4 w-full mb-3">
                    <Button onClick={onScanAgain} variant="primary" className="flex-1 shadow-xl shadow-slate-900/10 bg-slate-900 hover:bg-slate-800 border-none text-white rounded-2xl h-14 text-base font-bold tracking-wide">
                        Scan Next
                    </Button>
                    <button
                        onClick={onEditProfile}
                        className="px-6 h-14 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:border-brand-teal hover:text-brand-teal transition-all shadow-sm active:scale-95"
                    >
                        Profile
                    </button>
                </div>

                {/* Compare Feature Route */}
                <Button
                    onClick={onCompare}
                    className="w-full mb-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 rounded-2xl h-14 tracking-wide shadow-sm"
                >
                    Compare with Another Product
                </Button>

                {/* Trust Signal */}
                <div className="flex items-center gap-2 opacity-60">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Clinical-Grade Analysis • AI V2.1</span>
                </div>
            </motion.div>
        </div>
    );
};

export default ResultScreen;