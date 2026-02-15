import React, { useState, useMemo } from 'react';
import { MODULES } from '../constants/modules';
import { GLOSSARY_TERMS } from '../constants/glossary';
import { DocumentTextIcon, WrenchScrewdriverIcon } from './Icons';

const CheatsheetPage: React.FC = () => {
    const [selectedModuleId, setSelectedModuleId] = useState(MODULES[0].id);

    const moduleData = useMemo(() => {
        const module = MODULES.find(m => m.id === selectedModuleId);
        if (!module) return null;

        const tcodes: any[] = [];
        module.chapters.forEach(c => {
            c.lessons.forEach(l => {
                if (l.details.tCode && l.details.tCode !== 'N/A') {
                    l.details.tCode.split(',').forEach(code => {
                        tcodes.push({ code: code.trim(), desc: l.title });
                    });
                }
            });
        });

        const terms = GLOSSARY_TERMS.filter(t => t.module === module.title);

        return { module, tcodes, terms };
    }, [selectedModuleId]);

    const handlePrint = () => {
        window.print();
    };

    if (!moduleData) return null;

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-12 print:max-w-none print:p-0">
            {/* No-Print Controls */}
            <div className="print:hidden mb-8 bg-surface dark:bg-dark-surface p-6 rounded-2xl border border-border-color dark:border-dark-border-color shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-text-primary dark:text-dark-text-primary">Cheatsheet Generator</h1>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Select a module to generate a printable summary.</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <select
                        value={selectedModuleId}
                        onChange={(e) => setSelectedModuleId(e.target.value)}
                        className="flex-1 sm:w-64 px-4 py-2 bg-surface-light dark:bg-dark-surface-light border border-transparent focus:border-primary dark:focus:border-dark-primary rounded-xl focus:outline-none"
                    >
                        {MODULES.map(m => (
                            <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                    </select>
                    <button
                        onClick={handlePrint}
                        className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:shadow-glow-sm transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" /></svg>
                        Print
                    </button>
                </div>
            </div>

            {/* Printable Content */}
            <div className="bg-white text-gray-900 p-5 sm:p-12 rounded-none sm:rounded-3xl shadow-none sm:shadow-card print:shadow-none print:p-0">

                {/* Header */}
                <div className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{moduleData.module.title}</h1>
                        <p className="text-xl font-medium text-gray-600">Quick Reference Guide</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">LedgerLearning</div>
                        <div className="text-xs text-gray-400">Master SAP with Confidence</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 print:grid-cols-2">

                    {/* T-Codes Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <WrenchScrewdriverIcon className="w-6 h-6 text-gray-900" />
                            <h2 className="text-2xl font-bold uppercase tracking-wide">Transaction Codes</h2>
                        </div>
                        {moduleData.tcodes.length > 0 ? (
                            <div className="space-y-0">
                                {moduleData.tcodes.map((t, i) => (
                                    <div key={i} className="flex items-baseline justify-between py-2 border-b border-gray-200 text-sm">
                                        <code className="font-bold font-mono text-gray-900 bg-gray-100 px-2 rounded min-w-[5rem]">{t.code}</code>
                                        <span className="text-gray-600 text-right ml-4">{t.desc}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No T-Codes found for this module.</p>
                        )}
                    </div>

                    {/* Glossary Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <DocumentTextIcon className="w-6 h-6 text-gray-900" />
                            <h2 className="text-2xl font-bold uppercase tracking-wide">Key Terminology</h2>
                        </div>
                        {moduleData.terms.length > 0 ? (
                            <div className="space-y-4">
                                {moduleData.terms.map((t, i) => (
                                    <div key={i} className="text-sm">
                                        <span className="font-bold text-gray-900 block mb-1">{t.term}</span>
                                        <span className="text-gray-600 leading-snug block">{t.definition}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No specific terms found for this module.</p>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400 print:fixed print:bottom-0 print:left-0 print:right-0 print:border-none">
                    Generated by LedgerLearning • SAP Training Platform
                </div>
            </div>

            <style>{`
                @media print {
                    @page { margin: 0.5in; }
                    body { background: white; -webkit-print-color-adjust: exact; }
                    .print\\:hidden { display: none !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:max-w-none { max-width: none !important; }
                    .print\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
                }
            `}</style>
        </div>
    );
};

export default CheatsheetPage;
