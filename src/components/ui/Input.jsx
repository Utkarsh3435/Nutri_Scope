import React from 'react';

/**
 * Input Component
 * Clinical, high-contrast input field.
 */
const Input = ({ label, placeholder, value, onChange, type = "text", className, labelClass, wrapperClass }) => {
    // Helper to join classes
    const cx = (...classes) => classes.filter(Boolean).join(' ');

    return (
        <div className={cx("flex flex-col space-y-2", wrapperClass)}>
            {label && (
                <label className={cx("text-xs font-bold uppercase tracking-widest text-slate-400 ml-1", labelClass)}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cx(
                    "w-full bg-[#f1f5f9] border border-transparent rounded-2xl px-5 py-4",
                    "text-slate-900 placeholder:text-slate-400 font-semibold text-[17px]",
                    "focus:outline-none focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/20",
                    "transition-all duration-300 shadow-sm",
                    className
                )}
            />
        </div>
    );
};

export default Input;
