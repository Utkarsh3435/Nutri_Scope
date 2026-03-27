import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className, disabled = false }) => {
    // Premium Motion Config - "Quiet Luxury"
    const springTransition = { type: "spring", mass: 1, stiffness: 90, damping: 20 };
    const cx = (...classes) => classes.filter(Boolean).join(' ');

    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900";

    const variants = {
        primary: "bg-slate-900 text-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.15)] hover:bg-slate-800 hover:shadow-[0_12px_30px_-8px_rgba(15,23,42,0.2)] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none",
        secondary: "bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:bg-slate-50 disabled:text-slate-300",
        ghost: "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100"
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={cx(baseStyles, variants[variant], className)}
            whileHover={!disabled ? { y: -2, scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
            transition={springTransition}
        >
            {children}
        </motion.button>
    );
};

export default Button;
