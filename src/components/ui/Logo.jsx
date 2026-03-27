import React from 'react';
import { motion } from 'framer-motion';

/**
 * NutriScope "Ultra-Premium" Halo Logo
 * 
 * Concept:
 * - Halo Ring: Thinner, elegant perfection (Gradient)
 * - AI Dot: Subtle, breathing intelligence (Mint/White)
 * - Scan Arc: Minimal, slow rotation
 * 
 * Style: Stripe / Linear / Apple quality.
 */
const Logo = ({ className = "", animated = false, variant = 'full' }) => {

    // Animation Variants - Slower, softer, more "expensive" feeling
    const haloVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1] // Ultra smooth easing
            }
        }
    };

    const dotVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: 0.8,
                duration: 1.2,
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        },
        pulse: {
            scale: [1, 1.15, 1],
            opacity: [1, 0.85, 1],
            transition: {
                duration: 4, // Very slow breath
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const arcVariants = {
        hidden: { pathLength: 0, opacity: 0, rotate: -45 },
        visible: {
            pathLength: 1,
            opacity: 0.8,
            rotate: 0,
            transition: {
                duration: 2.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
            }
        },
        scan: {
            rotate: 360,
            transition: {
                duration: 15, // Extremely slow rotation
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    return (
        <div className={`flex items-center gap-3.5 ${className}`}>
            <div className="relative w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Main Halo Ring - Thinner & Elegant */}
                    <motion.circle
                        cx="20" cy="20" r="15"
                        stroke="url(#haloGradient)"
                        strokeWidth="1.5"
                        initial={animated ? "hidden" : "visible"}
                        animate={animated ? "visible" : "visible"}
                        variants={haloVariants}
                    />

                    {/* AI Pulse Dot - Smaller & Centered */}
                    <motion.circle
                        cx="20" cy="20" r="2.5"
                        fill="#2dd4bf"
                        initial={animated ? "hidden" : "visible"}
                        animate={animated ? ["visible", "pulse"] : "visible"}
                        variants={dotVariants}
                        className="drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]"
                    />

                    {/* Active Scan Arc - Very Thin */}
                    <motion.path
                        d="M20 3 A17 17 0 0 1 37 20"
                        stroke="#0f172a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        style={{ originX: "20px", originY: "20px" }}
                        initial={animated ? "hidden" : "visible"}
                        animate={animated ? ["visible", "scan"] : "visible"}
                        variants={arcVariants}
                        className="opacity-30"
                    />

                    {/* Defs */}
                    <defs>
                        <linearGradient id="haloGradient" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#10b981" stopOpacity="0.9" />
                            <stop offset="1" stopColor="#0ea5e9" stopOpacity="0.9" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Premium Wordmark */}
            {variant === 'full' && (
                <div className="flex flex-col justify-center translate-y-[1px]">
                    <motion.h1
                        className="text-[17px] font-bold text-slate-900 leading-none tracking-tight font-sans"
                        initial={animated ? { opacity: 0, x: -8 } : {}}
                        animate={animated ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6, duration: 1 }}
                    >
                        NutriScope
                    </motion.h1>
                    <motion.span
                        className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5"
                        initial={animated ? { opacity: 0 } : {}}
                        animate={animated ? { opacity: 1 } : {}}
                        transition={{ delay: 1.0, duration: 1 }}
                    >
                        Clinical Food Intelligence
                    </motion.span>
                </div>
            )}
        </div>
    );
};

export default Logo;
