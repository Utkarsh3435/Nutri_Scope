import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

/**
 * Landing Screen - "The Halo Effect"
 * 
 * Signature Moment: "First Impression"
 * - Cinematic Intro: Logo floats, text fades in with stagger.
 * - Atmosphere: Living "Aurora" gradient + floating tranquil orbs.
 * - Mobile-First: Reachable CTA, breathable layout.
 */

const LandingScreen = ({ onGetStarted }) => {
    // --- Animation Variants ---

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            filter: "blur(10px)",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20
            }
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 10,
                duration: 1.5
            }
        },
        float: {
            y: [-15, 15, -15],
            rotate: [0, 3, -3, 0],
            filter: ["drop-shadow(0 15px 30px rgba(13, 148, 136, 0.2))", "drop-shadow(0 30px 60px rgba(13, 148, 136, 0.4))", "drop-shadow(0 15px 30px rgba(13, 148, 136, 0.2))"],
            transition: {
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between bg-brand-sand font-sans">

            {/* Living Background Aura */}
            <div className="absolute inset-0 z-0 bg-aurora" />

            {/* Ambient Floating Orbs - Subtle & Slower */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
                <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-brand-mint/20 rounded-full blur-[100px] animate-blob mix-blend-multiply" />
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-brand-cyan/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply" />
            </div>

            {/* BRAND HEADER - Top Left & Fixed */}
            <div className="z-30 w-full px-6 py-6 flex justify-start items-center">
                <Logo animated={true} />
            </div>

            {/* Content Container - Centered */}
            <motion.div
                className="z-10 flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto text-center relative -mt-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Main Text - Clean & Authoritative */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.05]">
                        <span className="block text-slate-900">Safety First.</span>
                        <span className="block text-brand-mint/90">Clinical Grade.</span>
                    </h1>

                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-[280px] mx-auto">
                        Intelligent AI screening for your personal health & safety.
                    </p>

                    {/* Authority Signal */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/50 backdrop-blur-md rounded-full border border-slate-200/50">
                        <div className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-pulse"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">AI Verified Results</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Action Area - Glass Panel */}
            <motion.div
                className="z-20 w-full max-w-sm pb-10 px-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 30 }}
            >
                <div className="flex flex-col gap-5">
                    <Button
                        onClick={onGetStarted}
                        variant="primary"
                        className="w-full h-16 text-lg font-bold shadow-lg shadow-brand-mint/20 tracking-wide rounded-2xl bg-slate-900 border-none"
                    >
                        Start Scanning
                    </Button>

                    <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-semibold opacity-70">
                        v2.1 • Privacy-First Analysis
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingScreen;
