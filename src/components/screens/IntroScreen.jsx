import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';

/**
 * IntroScreen - Cinematic Brand Reveal
 * 
 * Sequence:
 * 1. Blank canvas
 * 2. Logo draws in
 * 3. Text fades in
 * 4. Tagline slides up
 * 5. Full exit transition
 */
const IntroScreen = ({ onComplete }) => {

    useEffect(() => {
        // Auto-advance after animation sequence
        const timer = setTimeout(() => {
            onComplete();
        }, 3800); // 3.8s total duration

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-slate-50 flex items-center justify-center flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
            <div className="scale-150 transform">
                <Logo animated={true} />
            </div>

            <motion.p
                className="absolute bottom-12 text-slate-400 text-xs font-mono tracking-widest opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                CLINICAL-GRADE FOOD INTELLIGENCE
            </motion.p>
        </motion.div>
    );
};

export default IntroScreen;
