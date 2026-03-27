import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Chip from '../ui/Chip';
import Input from '../ui/Input';
import Logo from '../ui/Logo';

/**
 * Profile Setup Screen - "Intake Form"
 * 
 * Design: Apple Health × Levels
 * Style: Clinical Trust, Soft Depth, Premium Inputs
 */

const ProfileSetupScreen = ({ isHealthMode = false, onComplete, initialData = {} }) => {
    // State
    const [allergies, setAllergies] = useState(initialData.allergies || []);
    const [customAllergy, setCustomAllergy] = useState("");
    const [bmiData, setBmiData] = useState(initialData.bmiData || { height: '', weight: '', age: '' });

    // Common Allergens Data
    const commonAllergens = [
        "Diabetes", "Peanuts", "Tree Nuts", "Dairy", "Gluten",
        "Soy", "Shellfish", "Eggs", "Fish"
    ];

    // Handlers
    const toggleAllergy = (allergen) => {
        if (allergies.includes(allergen)) {
            setAllergies(allergies.filter(a => a !== allergen));
        } else {
            setAllergies([...allergies, allergen]);
        }
    };

    const addCustomAllergy = (e) => {
        e.preventDefault();
        const trimmed = customAllergy.trim();
        // Check for duplicate (case-insensitive)
        const isDuplicate = allergies.some(a => a.toLowerCase() === trimmed.toLowerCase());

        if (trimmed && !isDuplicate) {
            setAllergies([...allergies, trimmed]);
            setCustomAllergy("");
        } else if (isDuplicate) {
            // Optional: visual feedback or just clear
            setCustomAllergy("");
        }
    };

    const handleBmiChange = (field, value) => {
        setBmiData({ ...bmiData, [field]: value });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col p-6 pt-12 pb-24 overflow-x-hidden font-sans">

            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-emerald-50/80 to-transparent pointer-events-none mix-blend-multiply" />

            {/* Header */}
            <motion.div
                className="z-10 w-full max-w-sm mx-auto mb-10 pl-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Brand Header */}
                <div className="mb-2">
                    <Logo variant="icon" className="scale-75 origin-left" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-mint font-bold mb-6 opacity-90 pl-1">Medical Safety Engine</p>

                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">Clinical Profile</h2>
                <div className="flex items-center gap-3 mb-2">
                    <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-xl px-3 py-1 rounded-md border border-slate-200/50">
                        <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Step 2</span>
                    </div>
                    <span className="text-slate-300 text-xs font-medium">/</span>
                    <span className="text-slate-400 text-xs font-medium">Safety Parameters</span>
                </div>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">Customize your safety parameters.</p>
            </motion.div>

            {/* Main Form Container */}
            <motion.div
                className="z-10 w-full max-w-sm mx-auto space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.08 } }
                }}
            >

                {/* Section 1: Allergies */}
                <motion.section
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-slate-100"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-brand-coral/5 flex items-center justify-center text-brand-coral">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">Safety Filters</h3>
                    </div>

                    {/* Combined Allergen Chips (Preset + Custom) */}
                    <div className="flex flex-wrap gap-2.5 mb-6">
                        {/* 1. Show PRESET Allergens */}
                        {commonAllergens.map(allergen => (
                            <Chip
                                key={allergen}
                                label={allergen}
                                isSelected={allergies.includes(allergen)}
                                onClick={() => toggleAllergy(allergen)}
                                className={allergies.includes(allergen) ?
                                    "bg-brand-coral text-white border-transparent shadow-[0_8px_16px_-4px_rgba(244,63,94,0.3)] ring-2 ring-brand-coral/20 px-4 py-2 text-sm" :
                                    "bg-slate-50 border-transparent text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all px-4 py-2 text-sm"}
                            />
                        ))}

                        {/* 2. Show CUSTOM Allergens (Items in 'allergies' not in 'commonAllergens') */}
                        {allergies.filter(a => !commonAllergens.includes(a)).map(custom => (
                            <Chip
                                key={custom}
                                label={custom}
                                isSelected={true}
                                onClick={() => toggleAllergy(custom)} // Allows removal
                                className="bg-brand-coral text-white border-transparent shadow-[0_8px_16px_-4px_rgba(244,63,94,0.3)] ring-2 ring-brand-coral/20 px-4 py-2 text-sm pl-3 pr-2 flex items-center gap-2"
                            />
                        ))}
                    </div>

                    {/* Custom Allergy Input */}
                    <form onSubmit={addCustomAllergy} className="relative mt-2 mb-2">
                        <Input
                            placeholder="Add other (e.g. Strawberries)..."
                            value={customAllergy}
                            onChange={(e) => setCustomAllergy(e.target.value)}
                            className="pr-20 bg-slate-50 border-none focus:ring-2 focus:ring-brand-teal/20 h-14 rounded-2xl text-slate-900 placeholder-slate-400 font-medium text-sm transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!customAllergy.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-white text-slate-800 border border-slate-200 shadow-sm px-3 py-1.5 rounded-xl disabled:opacity-40 disabled:shadow-none transition-all active:scale-95 hover:border-brand-teal hover:text-brand-teal"
                        >
                            ADD +
                        </button>
                    </form>

                    {allergies.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 flex items-start gap-3 bg-slate-50/80 p-4 rounded-2xl"
                        >
                            <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">No allergies selected? We'll focus purely on nutritional quality and ingredients.</p>
                        </motion.div>
                    )}
                </motion.section>

                {/* Section 2: Health/BMI (Conditional) */}
                <AnimatePresence>
                    {isHealthMode && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-slate-100"
                        >
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-brand-teal/5 flex items-center justify-center text-brand-teal">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">Health Metrics</h3>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Optional parameters for better analysis.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Height (cm)"
                                        labelClass="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1"
                                        placeholder="175"
                                        type="number"
                                        value={bmiData.height}
                                        onChange={(e) => handleBmiChange('height', e.target.value)}
                                        className="bg-slate-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-brand-teal/20 text-slate-900 font-semibold shadow-inner"
                                    />
                                    <Input
                                        label="Weight (kg)"
                                        labelClass="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1"
                                        placeholder="70"
                                        type="number"
                                        value={bmiData.weight}
                                        onChange={(e) => handleBmiChange('weight', e.target.value)}
                                        className="bg-slate-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-brand-teal/20 text-slate-900 font-semibold shadow-inner"
                                    />
                                </div>
                                <Input
                                    label="Age (Years)"
                                    labelClass="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1"
                                    placeholder="25"
                                    type="number"
                                    value={bmiData.age}
                                    onChange={(e) => handleBmiChange('age', e.target.value)}
                                    className="bg-slate-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-brand-teal/20 text-slate-900 font-semibold shadow-inner"
                                />
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Action Area */}
                <motion.div
                    className="pt-6 pb-8"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                    <Button
                        className="w-full text-lg h-16 shadow-[0_12px_36px_-6px_rgba(13,148,136,0.25)] bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold tracking-wide transition-all active:scale-[0.98]"
                        disabled={isHealthMode && (!bmiData.height || !bmiData.weight)}
                        onClick={() => onComplete({ allergies, bmiData })}
                    >
                        Confirm Profile
                    </Button>
                    <div className="mt-5 flex justify-center items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-80">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Local Design • Secure</span>
                    </div>
                </motion.div>

            </motion.div>
        </div >
    );
};

export default ProfileSetupScreen;
