import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

/**
 * CompareScreen - "Smart Food Comparison"
 * 
 * Design: Apple Health × Levels
 */
const CompareScreen = ({ currentScan, currentMeta, onBack }) => {

    const [lastScan, setLastScan] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("previousProduct");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.result && parsed?.productMeta) {
                    setLastScan(parsed);
                }
            }
        } catch (error) {
            console.error("Failed to parse previous product comparison data", error);
        }
    }, []);

    // --- Empty State ---
    if (!lastScan) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 text-center font-sans">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
                    No Previous Scan
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs leading-relaxed">
                    No previous scan available to compare.
                </p>
                <Button onClick={onBack} variant="primary" className="w-full max-w-xs h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 font-bold text-white shadow-lg">
                    Return to Result
                </Button>
            </div>
        );
    }

    // --- Data Rendering Helpers ---
    const calculateHealthScore = (nutriments) => {
        if (!nutriments) return 0;
        let score = 100;

        const parseNum = (val) => {
            const num = parseFloat(val);
            return isNaN(num) ? 0 : num;
        };

        const sugar = parseNum(nutriments?.sugars ?? nutriments?.sugar ?? 0);
        const calories = parseNum(nutriments?.["energy-kcal"] ?? nutriments?.calories ?? nutriments?.energy ?? 0);
        const carbs = parseNum(nutriments?.carbohydrates ?? nutriments?.carbs ?? 0);
        const fat = parseNum(nutriments?.fat ?? 0);
        const salt = parseNum(nutriments?.salt ?? nutriments?.sodium ?? 0);
        const protein = parseNum(nutriments?.proteins ?? nutriments?.protein ?? 0);

        score -= sugar * 2;
        score -= calories / 10;
        score -= carbs * 0.5;
        score -= fat * 1;
        score -= salt * 5;
        score += protein * 2;

        return Math.round(Math.max(0, Math.min(100, score)));
    };

    const getVal = (meta, key) => {
        const val = meta?.nutriments?.[key];
        if (val === "N/A" || val === null || val === undefined) return "N/A";
        const num = parseFloat(val);
        return isNaN(num) ? "N/A" : num.toFixed(1);
    };

    const n1 = currentScan;
    const m1 = currentMeta;
    const score1 = calculateHealthScore(m1?.nutriments);

    const n2 = lastScan.result;
    const m2 = lastScan.productMeta;
    const score2 = calculateHealthScore(m2?.nutriments);

    const renderVerdictPill = (verdict, riskLevel) => {
        let colorTheme = "bg-slate-100 text-slate-500 border-slate-200";
        if (verdict === "SAFE") colorTheme = "bg-emerald-50 text-emerald-700 border-emerald-200";
        if (verdict === "CAUTION") colorTheme = "bg-amber-50 text-amber-700 border-amber-200";
        if (verdict === "UNSAFE") colorTheme = "bg-rose-50 text-rose-700 border-rose-200";

        return (
            <div className="flex flex-col gap-1 items-center mt-3 mb-2">
                <span className={`px-3 py-1 text-[10px] uppercase font-black tracking-widest rounded-full border shadow-sm ${colorTheme}`}>
                    {verdict}
                </span>
                <span className="text-[10px] font-bold text-slate-400 capitalize">
                    Risk: {riskLevel}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-32 font-sans overflow-x-hidden">

            {/* Header */}
            <div className="bg-white px-6 pt-14 pb-6 border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Versus Mode</span>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Compare Products</h1>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", damping: 25 }}
                className="px-5 mt-6"
            >
                <div className="glass-card bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">

                    {/* Headers (Product Names + Verdicts) */}
                    <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/50">

                        {/* Current Product */}
                        <div className="p-5 text-center flex flex-col items-center">
                            {score1 > score2 ? (
                                <div className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-emerald-400 mb-3">
                                    Better Choice
                                </div>
                            ) : (
                                <div className="h-[28px] mb-3" aria-hidden="true" />
                            )}
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Scan</span>
                            {m1?.image && (
                                <img src={m1.image} alt={m1.name} className="w-16 h-16 object-contain rounded-xl border border-slate-200 bg-white p-1 mb-3" />
                            )}
                            <h3 className="text-sm font-black text-slate-900 line-clamp-2 leading-snug h-10">{m1?.name || "Unknown Product"}</h3>

                            <div className="mt-3 mb-1">
                                <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Health Score</span>
                                <span className={`text-xl font-black ${score1 >= 80 ? 'text-emerald-600' : score1 >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>{score1} <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/ 100</span></span>
                            </div>

                            {renderVerdictPill(n1?.verdict, n1?.riskLevel)}
                        </div>

                        {/* Last Product */}
                        <div className="p-5 text-center flex flex-col items-center">
                            {score2 > score1 ? (
                                <div className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-emerald-400 mb-3">
                                    Better Choice
                                </div>
                            ) : (
                                <div className="h-[28px] mb-3" aria-hidden="true" />
                            )}
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Previous</span>
                            {m2?.image && (
                                <img src={m2.image} alt={m2.name} className="w-16 h-16 object-contain rounded-xl border border-slate-200 bg-white p-1 mb-3" />
                            )}
                            <h3 className="text-sm font-black text-slate-900 line-clamp-2 leading-snug h-10">{m2?.name || "Unknown Product"}</h3>

                            <div className="mt-3 mb-1">
                                <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Health Score</span>
                                <span className={`text-xl font-black ${score2 >= 80 ? 'text-emerald-600' : score2 >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>{score2} <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/ 100</span></span>
                            </div>

                            {renderVerdictPill(n2?.verdict, n2?.riskLevel)}
                        </div>
                    </div>

                    {/* Compare Data Table */}
                    <div className="divide-y divide-slate-100">
                        {[
                            { label: "Calories", key: "calories", unit: "kcal" },
                            { label: "Sugar", key: "sugar", unit: "g" },
                            { label: "Carbs", key: "carbohydrates", unit: "g" },
                            { label: "Protein", key: "protein", unit: "g" },
                            { label: "Fat", key: "fat", unit: "g" },
                            { label: "Salt", key: "salt", unit: "g" },
                        ].map((row, i) => {
                            const val1 = getVal(m1, row.key);
                            const val2 = getVal(m2, row.key);

                            const num1 = val1 !== "N/A" ? parseFloat(val1) : 0;
                            const num2 = val2 !== "N/A" ? parseFloat(val2) : 0;
                            const maxVal = Math.max(num1, num2);

                            const w1 = maxVal > 0 ? (num1 / maxVal) * 100 : 0;
                            const w2 = maxVal > 0 ? (num2 / maxVal) * 100 : 0;

                            const colorMap = {
                                calories: "bg-orange-500",
                                sugar: "bg-red-500",
                                carbohydrates: "bg-amber-500",
                                protein: "bg-green-500",
                                fat: "bg-yellow-500",
                                salt: "bg-purple-500"
                            };

                            const barColor = colorMap[row.key] || "bg-blue-500";

                            return (
                                <div key={i} className="grid grid-cols-3 items-center hover:bg-slate-50 transition-colors">
                                    <div className="py-4 px-4 text-center border-r border-slate-100 flex flex-col items-center justify-center">
                                        <div className="mb-2">
                                            <span className="text-sm font-black text-slate-800">{val1}</span>
                                            {val1 !== "N/A" && <span className="text-[10px] font-bold text-slate-400 ml-0.5">{row.unit}</span>}
                                        </div>
                                        <div className="w-full max-w-[100px] h-2 bg-slate-200 rounded-full overflow-hidden flex justify-end shadow-inner">
                                            <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${w1}%` }} />
                                        </div>
                                    </div>
                                    <div className="py-4 px-2 text-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{row.label}</span>
                                    </div>
                                    <div className="py-4 px-4 text-center border-l border-slate-100 flex flex-col items-center justify-center">
                                        <div className="mb-2">
                                            <span className="text-sm font-black text-slate-800">{val2}</span>
                                            {val2 !== "N/A" && <span className="text-[10px] font-bold text-slate-400 ml-0.5">{row.unit}</span>}
                                        </div>
                                        <div className="w-full max-w-[100px] h-2 bg-slate-200 rounded-full overflow-hidden flex justify-start shadow-inner">
                                            <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${w2}%` }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default CompareScreen;
