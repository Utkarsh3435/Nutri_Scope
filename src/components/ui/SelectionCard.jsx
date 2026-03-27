import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * SelectionCard Component
 * Big, tactile targets for main mode selection.
 * 
 * @param {string} title
 * @param {string} description
 * @param {React.ReactNode} icon
 * @param {function} onClick
 * @param {boolean} isSelected
 */
const SelectionCard = ({ title, description, icon, onClick, isSelected }) => {
    return (
        <motion.div
            onClick={onClick}
            className={clsx(
                "relative w-full p-6 rounded-[24px] cursor-pointer transition-colors duration-300 border overflow-hidden group",
                "bg-white",
                isSelected ? "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/10" : "border-slate-200 hover:border-slate-300"
            )}
            whileHover={{ y: -4, boxShadow: "0px 10px 20px -5px rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.98, backgroundColor: "#F8FAFC" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="flex items-center space-x-4">
                {/* Icon Container */}
                <div className={clsx(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    isSelected ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                )}>
                    {icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 text-left">
                    <h3 className={clsx("text-lg font-semibold", isSelected ? "text-emerald-900" : "text-slate-800")}>
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-snug mt-0.5">
                        {description}
                    </p>
                </div>

                {/* Affordance Arrow (Fade in on hover or selection) */}
                <div className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

export default SelectionCard;
