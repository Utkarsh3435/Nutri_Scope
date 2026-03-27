import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const IngredientReviewScreen = ({ ingredients = [], productMeta, onAnalyze, onRetake }) => {

    const [editableIngredients, setEditableIngredients] = useState([]);
    const [productName, setProductName] = useState("");

    useEffect(() => {
        setEditableIngredients(ingredients.length ? ingredients : [""]);
        setProductName(productMeta?.name || "Unknown Product");
    }, [ingredients, productMeta]);

    const updateIngredient = (index, value) => {
        const updated = [...editableIngredients];
        updated[index] = value;
        setEditableIngredients(updated);
    };

    const addIngredient = () => {
        setEditableIngredients([...editableIngredients, ""]);
    };

    const removeIngredient = (index) => {
        const updated = editableIngredients.filter((_, i) => i !== index);
        setEditableIngredients(updated.length ? updated : [""]);
    };

    const handleAnalyzeClick = () => {
        const cleaned = editableIngredients
            .map(i => i.trim())
            .filter(Boolean);

        const finalProductName = productName.trim() || "Unknown Product";

        if (!cleaned.length) {
            alert("Please enter at least one ingredient.");
            return;
        }

        onAnalyze(cleaned, finalProductName);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">

            {/* Header */}
            <div className="px-6 pt-12 pb-6 bg-white border-b border-slate-100 shadow-sm z-10">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                    Confirm Data
                </span>

                <h2 className="text-3xl font-black text-slate-900 mt-2">
                    Verify Product & Ingredients
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                    Edit ingredients before AI clinical analysis.
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">

                {/* 📸 PRODUCT IMAGE (IF AVAILABLE) */}
                {productMeta?.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="flex justify-center mb-6"
                    >
                        <img
                            src={productMeta.image}
                            alt={productMeta.name}
                            className="w-40 h-40 object-contain rounded-2xl shadow-md border border-slate-200 bg-white p-2"
                        />
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6"
                >

                    {/* Product Name */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Product Name
                        </label>

                        <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-2 w-full p-3 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal"
                        />
                    </div>

                    {/* Ingredient List */}
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                            Ingredients
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {editableIngredients.map((ing, i) => (
                                <span
                                    key={`chip-${i}`}
                                    className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                                >
                                    {ing}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {editableIngredients.map((ing, i) => (
                                <div key={i} className="flex items-center gap-3">

                                    <input
                                        value={ing}
                                        onChange={(e) => updateIngredient(i, e.target.value)}
                                        placeholder="Enter ingredient..."
                                        className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                                    />

                                    <button
                                        onClick={() => removeIngredient(i)}
                                        className="text-red-500 font-bold hover:text-red-700 text-lg px-2"
                                    >
                                        ×
                                    </button>

                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addIngredient}
                            className="mt-4 text-xs font-bold text-brand-teal hover:underline"
                        >
                            + Add Ingredient
                        </button>
                    </div>

                </motion.div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t border-slate-100">
                <Button
                    onClick={handleAnalyzeClick}
                    className="w-full h-16 bg-brand-teal hover:bg-teal-600 text-white rounded-xl font-bold text-base"
                >
                    Run Clinical Analysis
                </Button>

                <button
                    onClick={onRetake}
                    className="w-full mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600"
                >
                    Retake Scan
                </button>
            </div>

        </div>
    );
};

export default IngredientReviewScreen;