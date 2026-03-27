import React from 'react';
import { motion } from 'framer-motion';

/**
 * Chip Component
 * Used for toggling allergies.
 */
const Chip = ({ label, isSelected, onClick }) => {
    const cx = (...classes) => classes.filter(Boolean).join(' ');

    return (
        <motion.button
            onClick={onClick}
            className={cx(
                "px-4 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all border",
                isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.04 }}
            layout
        >
            {label}
            {isSelected && <span className="ml-2 text-white/60 font-normal">×</span>}
        </motion.button>
    );
};

export default Chip;
