/** @type {import('tailwindcss').Config} */
// Force reload: 2026-01-22
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#0f172a',
                    teal: '#0d9488',   // Primary Premium
                    mint: '#5eead4',   // Fresh Accent
                    cyan: '#22d3ee',   // Tech/Airy
                    sky: '#e0f2fe',    // Soft Backgrounds
                    coral: '#fb7185',  // Soft Alert
                    peach: '#fdba74',  // Warning/Warmth
                    sand: '#f8fafc',   // Off-white base
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'blob': 'blob 7s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            },
            boxShadow: {
                'glow': '0 0 20px rgba(94, 234, 212, 0.5)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
            }
        },
    },
    plugins: [],
}
