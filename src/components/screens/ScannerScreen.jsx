import { useScanner } from '../../hooks/useScanner';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';

/**
 * ScannerScreen - "FDA-Grade Medical Instrument"
 * 
 * Design: Deep Navy, Precision Grids, Scientific Data
 * Tone: Serious, Clinical, High-Tech
 */

const ScannerScreen = ({ onScanDetected, onBack }) => {
    const [isManualEntry, setIsManualEntry] = useState(false);
    const [manualCode, setManualCode] = useState('');
    const [isScanning, setIsScanning] = useState(true);
    const [scanMetric, setScanMetric] = useState({ fps: 60, confidence: 0, temp: 36.5 });
    const [scanPhase, setScanPhase] = useState(0);
    const [hasScanned, setHasScanned] = useState(false);

    const { start, stop } = useScanner((code) => {
        if (!hasScanned) {
            setHasScanned(true);
            onScanDetected(code);
        }
    });

    useEffect(() => {
        if (!isManualEntry) {
            setHasScanned(false);
        }
    }, [isManualEntry]);

    useEffect(() => {
        if (!isManualEntry && !hasScanned) {
            start();
        }

        return () => {
            stop();
        };
    }, [isManualEntry]);

    // Simulate clinical analysis sequence
    useEffect(() => {
        let metricInterval;
        let phaseInterval;
        let completeTimeout;

        if (isScanning && !isManualEntry) {
            // METRICS LOOP
            metricInterval = setInterval(() => {
                setScanMetric(prev => ({
                    fps: 59 + Math.random() * 2,
                    confidence: Math.min(99.9, prev.confidence + (Math.random() * 5)),
                    temp: 36.4 + Math.random() * 0.3
                }));
            }, 200);

            // PHASE TEXT LOOP
            phaseInterval = setInterval(() => {
                setScanPhase(prev => (prev + 1) % 4);
            }, 1200);
        }

        return () => {
            clearInterval(metricInterval);
            clearInterval(phaseInterval);
            clearTimeout(completeTimeout);
        };
    }, [isScanning, isManualEntry]);

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualCode.trim().length > 0 && !hasScanned) {
            setHasScanned(true);
            onScanDetected(manualCode);
        }
    };

    const scanMessages = [
        "INITIALIZING SENSOR ARRAY...",
        "ACQUIRING SPECTRAL SIGNATURE...",
        "CALIBRATING OPTICAL MATRIX...",
        "VERIFYING INGREDIENT DENSITY..."
    ];

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-between p-6 relative overflow-hidden font-mono text-slate-200 selection:bg-teal-500/30">

            {/* BACKGROUND: TACTICAL GRID */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-900/80" />
            </div>

            {/* HEADER: SYSTEM STATUS BAR */}
            <div className="z-20 w-full flex justify-between items-start pt-6 border-b border-slate-800/60 pb-4">
                <motion.button
                    onClick={onBack}
                    className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-md rounded-sm border border-slate-700 text-slate-400 hover:text-white hover:border-brand-mint/50 transition-all group"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-brand-mint transition-colors">Abort Sequence</span>
                </motion.button>

                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-brand-mint tracking-[0.2em]">SYSTEM ACTIVE</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono tracking-widest">V2.1.04-CLINICAL</span>
                </div>
            </div>


            {/* MAIN VIEWFINDER INTERFACE */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md relative z-10 w-full">
                <AnimatePresence mode="wait">
                    {!isManualEntry ? (
                        <motion.div
                            key="scanner"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative w-full aspect-[4/5] max-h-[500px] flex items-center justify-center"
                        >
                            {/* 1. CORNER BRACKETS (HUD) */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                {/* Top Left */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-mint/80 rounded-tl-sm shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
                                {/* Top Right */}
                                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-mint/80 rounded-tr-sm shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
                                {/* Bottom Left */}
                                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-brand-mint/80 rounded-bl-sm shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
                                {/* Bottom Right */}
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-mint/80 rounded-br-sm shadow-[0_0_10px_rgba(45,212,191,0.3)]" />

                                {/* Center Crosshair */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-40">
                                    <div className="w-full h-[1px] bg-brand-mint" />
                                    <div className="h-full w-[1px] bg-brand-mint absolute" />
                                </div>
                            </div>

                            {/* 2. CAMERA FRAME & SCAN REGION */}
                            <div className="absolute inset-4 bg-slate-950/50 rounded-lg border border-slate-700/50 backdrop-blur-sm overflow-hidden z-0">
                                <div id="barcode-reader" className="absolute inset-0 z-10" />
                                {/* Simulated Camera Noise / Grain */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                                {/* 3. LASER SWEEP ANIMATION */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-[2px] bg-brand-mint shadow-[0_0_20px_rgba(45,212,191,0.8)] z-10"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                                />
                            </div>

                            {/* 4. REAL-TIME METRICS (SIDEBAR) */}
                            <div className="absolute -right-8 top-1/4 flex flex-col gap-8 opacity-60">
                                <div className="rotate-90 origin-left translate-x-1">
                                    <span className="text-[9px] font-mono font-bold text-brand-mint tracking-widest">GAIN {scanMetric.confidence.toFixed(1)}%</span>
                                </div>
                                <div className="rotate-90 origin-left translate-x-1">
                                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest">TEMP {scanMetric.temp.toFixed(1)}°C</span>
                                </div>
                            </div>

                        </motion.div>
                    ) : (
                        // MANUAL ENTRY - TACTICAL KEYPAD STYLE
                        <motion.div
                            key="manual"
                            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg p-8 shadow-2xl relative overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-mint" />
                            <h3 className="text-white text-lg font-bold font-mono tracking-wider mb-6 text-center">MANUAL_OVERRIDE</h3>

                            <form onSubmit={handleManualSubmit} className="space-y-6">
                                <Input
                                    placeholder="0000-0000-0000"
                                    value={manualCode}
                                    onChange={(e) => setManualCode(e.target.value)}
                                    autoFocus
                                    className="bg-slate-900 border-slate-600 text-brand-mint placeholder:text-slate-500 font-mono text-center tracking-[0.15em] h-14 focus:ring-brand-mint/50 focus:border-brand-mint rounded-none caret-brand-mint"
                                />
                                <Button
                                    className="w-full h-14 bg-brand-mint hover:bg-teal-400 text-slate-900 font-bold tracking-widest rounded-sm text-xs"
                                    disabled={manualCode.length < 3}
                                    onClick={handleManualSubmit}
                                >
                                    INITIATE ANALYSIS
                                </Button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STATUS MESSAGE - TYPEWRITER EFFECT */}
                <div className="mt-8 h-12 flex items-center justify-center">
                    <div className="bg-slate-800/80 border border-slate-700 px-6 py-2 rounded-sm flex items-center gap-3">
                        <span className="w-2 h-2 bg-brand-mint animate-pulse" />
                        <span className="text-xs font-mono font-bold text-brand-mint tracking-widest uppercase">
                            {!isManualEntry ? scanMessages[scanPhase] : "AWAITING HUMAN INPUT..."}
                        </span>
                    </div>
                </div>
            </div>

            {/* FOOTER: CONTROLS */}
            <div className="z-10 w-full max-w-xs flex flex-col gap-3 mb-6">
                {!isManualEntry ? (
                    <button
                        onClick={() => setIsManualEntry(true)}
                        className="w-full py-4 border border-slate-700 bg-slate-800/40 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm"
                    >
                        Enter Code Manually
                    </button>
                ) : (
                    <button
                        onClick={() => setIsManualEntry(false)}
                        className="w-full py-4 text-slate-400 hover:text-brand-mint transition-colors text-[10px] font-bold tracking-[0.2em] uppercase"
                    >
                        Return to Optical Scan
                    </button>
                )}

                <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono pt-4 border-t border-slate-800/50 mt-2">
                    <span>SECURE CONNECTION</span>
                    <span>FDA-COMPLIANT PROTOCOL</span>
                </div>
            </div>

        </div>
    );
};

export default ScannerScreen;
