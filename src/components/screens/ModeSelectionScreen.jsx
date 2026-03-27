import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';

/**
 * Mode Selection Screen - "The Mission Choice"
 * 
 * Design: Apple Health × Stripe
 * Style: Premium mission cards, glassmorphism, high clarity.
 */

const ModeSelectionScreen = ({ onModeSelect }) => {
    const [selectedMode, setSelectedMode] = useState(null);

    const handleSelect = (mode) => {
        setSelectedMode(mode);
        // Delay to allow the "Hero Expand" animation to play out briefly
        setTimeout(() => onModeSelect(mode), 600);
    };

    
    // --- Animation Variants ---

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        },
        exit: {
            opacity: 0,
            x: -20,
            filter: "blur(10px)",
            transition: { duration: 0.4 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        },
        tap: { scale: 0.98 },
        hover: { scale: 1.02, y: -2, transition: { type: "spring", stiffness: 300, damping: 15 } }
    };

    // Render a premium selection card
    const renderCard = (mode, title, description, iconColor, iconPath) => {
        const isSelected = selectedMode === mode;
        const isOtherSelected = selectedMode && selectedMode !== mode;

        return (
            <motion.button
                layout
                onClick={() => handleSelect(mode)}
                disabled={selectedMode !== null}
                variants={cardVariants}
                whileHover={!selectedMode ? "hover" : {}}
                whileTap={!selectedMode ? "tap" : {}}
                animate={isSelected ? { scale: 1.05, borderColor: 'var(--brand-teal)', zIndex: 30 } : isOtherSelected ? { opacity: 0.6, scale: 0.98, filter: "blur(3px) grayscale(50%)" } : {}}
                className={`
                    relative w-full p-6 text-left rounded-[2rem] border transition-all duration-500 overflow-hidden group
                    ${isSelected
                        ? 'bg-white shadow-[0_4px_20px_rgba(13,148,136,0.25)] border-brand-teal ring-1 ring-brand-teal'
                        : 'bg-white/90 backdrop-blur-xl border-white/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:border-brand-teal/40'
                    }
                `}
            >
                {/* Subtle Gradient Overlay on Hover/Active */}
                <div className={`absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50 pointer-events-none transition-opacity duration-500 ${isSelected ? 'opacity-20' : 'group-hover:opacity-80'}`} />

                <div className="flex items-center gap-6 relative z-10">
                    {/* Icon Container - Frosted & Colored */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110 ${iconColor} bg-opacity-15`}>
                        <div className={`w-10 h-10 ${iconColor.replace('bg-', 'text-').replace('/20', '')} transition-colors`}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {iconPath}
                            </svg>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-brand-teal transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Selection Indicator Arrow */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-brand-teal text-white scale-100 opacity-100' : 'bg-slate-100 text-slate-300 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </motion.button>
        );
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden flex flex-col p-6 pt-12 md:justify-center md:pt-0 bg-brand-sand">
            {/* Background - Premium Soft Gradient */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-sand via-white to-brand-sand opacity-80" />
                {/* Orbs */}
                <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-brand-peach/20 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-brand-mint/20 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
            </div>

            {/* Header */}
            <motion.div
                className="z-10 mb-12 md:text-center px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Brand Header */}
                <div className="mb-2 md:flex md:justify-center">
                    <Logo variant="full" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-mint font-bold mb-8 opacity-90">Medical Safety Engine</p>

                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/60 mb-6 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Configuration</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[0.95] tracking-tight mb-4">
                    Select Protocol.
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xs md:mx-auto">
                    Calibrate the AI for your specific safety requirements.
                </p>
            </motion.div>

            {/* Cards Container */}
            <motion.div
                className="z-10 flex flex-col gap-4 w-full max-w-sm mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Allergy Card */}
                {renderCard(
                    'allergy',
                    'Allergy Defense',
                    'Strict detection for peanut, gluten, & dairy allergens.',
                    'bg-slate-100 text-slate-600',
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                )}

                {/* Health Card */}
                {renderCard(
                    'health',
                    'Metabolic Control',
                    'Analysis for sugar, BMI impact, and macronutrients.',
                    'bg-teal-50 text-teal-700',
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                )}

            </motion.div>
        </div>
    );
};

export default ModeSelectionScreen;
