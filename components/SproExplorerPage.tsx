import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../constants/modules';
import { WrenchScrewdriverIcon, FolderIcon, FolderOpenIcon, AcademicCapIcon } from './Icons';

interface SproNodeData {
    label: string;
    children: { [key: string]: SproNodeData };
    lessons: {
        title: string;
        link: string;
        path: string;
    }[];
    fullPath: string;
}

const SproNode: React.FC<{ node: SproNodeData; level: number; isLast: boolean }> = ({ node, level, isLast }) => {
    const [isOpen, setIsOpen] = useState(level < 1);
    const hasChildren = node.children && Object.keys(node.children).length > 0;
    const hasLessons = node.lessons && node.lessons.length > 0;
    const isRoot = level === -1;
    const isLeafLink = !hasChildren && hasLessons && node.lessons.length === 1;

    const toggle = () => {
        if (hasChildren || (hasLessons && !isLeafLink)) {
            setIsOpen(!isOpen);
        }
    };

    const handleCopyPath = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(node.fullPath);
        // Could add a toast here
    };

    if (isRoot) {
        return (
            <div className="relative">
                {Object.values(node.children).sort((a: SproNodeData, b: SproNodeData) => a.label.localeCompare(b.label)).map((child, index, arr) => (
                    <SproNode key={index} node={child} level={level + 1} isLast={index === arr.length - 1} />
                ))}
            </div>
        );
    }

    const NodeContent = () => (
        <div className="flex items-center py-2 group relative">
            {/* Hover Copy Button */}
            <button
                onClick={handleCopyPath}
                className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 text-xs text-text-secondary hover:text-primary bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color rounded shadow-sm transition-all"
                title="Copy Path"
            >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" /></svg>
            </button>

            <div className="w-6 flex-shrink-0 mr-2 flex justify-center">
                {hasChildren ? (
                    isOpen ?
                        <FolderOpenIcon className="h-5 w-5 text-accent dark:text-accent" /> :
                        <FolderIcon className="h-5 w-5 text-accent/70 dark:text-accent/70" />
                ) : (isLeafLink ? <AcademicCapIcon className="h-5 w-5 text-primary dark:text-dark-primary" /> : <div className="w-5 h-5" />)}
            </div>
            <span className={`text-sm truncate pr-8 ${isLeafLink ? 'text-primary dark:text-dark-primary font-semibold' : 'text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary font-medium'}`}>{node.label}</span>
            {hasChildren && (
                <svg className={`w-3.5 h-3.5 ml-auto mr-8 text-text-secondary/40 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            )}
        </div>
    );

    return (
        <div className="relative">
            {/* Vertical connector line from parent */}
            {level > 0 && (
                <div
                    className="absolute top-0 bottom-0 border-l border-border-color dark:border-dark-border-color"
                    style={{ left: '-13px', height: isLast ? '24px' : '100%' }}
                />
            )}
            {/* Horizontal connector to node */}
            {level > 0 && (
                <div className="absolute top-[24px] w-3 border-t border-border-color dark:border-dark-border-color" style={{ left: '-13px' }} />
            )}

            <div style={{ marginLeft: level > 0 ? '1rem' : '0' }}>
                {isLeafLink ? (
                    <Link to={node.lessons[0].link} className="block rounded-lg hover:bg-surface-light dark:hover:bg-dark-surface-light px-2 py-1 transition-colors">
                        <NodeContent />
                    </Link>
                ) : (
                    <div className="cursor-pointer rounded-lg hover:bg-surface-light dark:hover:bg-dark-surface-light px-2 py-1 transition-colors select-none" onClick={toggle}>
                        <NodeContent />
                    </div>
                )}

                {isOpen && (
                    <div className="ml-4 border-l border-border-color/30 dark:border-dark-border-color/30 pl-2 relative">
                        {hasLessons && node.lessons.map((lesson, index) => (
                            <div key={index} className="relative">
                                {/* Connector for lesson */}
                                <div className="absolute top-[20px] -left-[9px] w-3 border-t border-border-color dark:border-dark-border-color" />

                                <Link
                                    to={lesson.link}
                                    className="flex items-center py-2.5 cursor-pointer rounded-lg hover:bg-primary/5 dark:hover:bg-dark-primary/5 group px-3 ml-2"
                                >
                                    <AcademicCapIcon className="h-4 w-4 text-primary/70 dark:text-dark-primary/70 group-hover:text-primary dark:group-hover:text-dark-primary flex-shrink-0 mr-2 transition-colors" />
                                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">{lesson.title}</span>
                                </Link>
                            </div>
                        ))}
                        {hasChildren && Object.values(node.children).sort((a: SproNodeData, b: SproNodeData) => a.label.localeCompare(b.label)).map((child, index, arr) => (
                            <SproNode key={index} node={child} level={level + 1} isLast={index === arr.length - 1} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const SproExplorerPage: React.FC = () => {
    const [selectedModuleId, setSelectedModuleId] = useState(MODULES[0].id);
    const selectedModule = MODULES.find(m => m.id === selectedModuleId);

    const sproTree = useMemo(() => {
        if (!selectedModule) return { label: "root", children: {}, lessons: [], fullPath: "" };
        const tree: SproNodeData = { label: "SAP Customizing Implementation Guide", children: {}, lessons: [], fullPath: "SAP Customizing Implementation Guide" };
        selectedModule.chapters.forEach(chapter => {
            chapter.lessons.forEach(lesson => {
                if (lesson.details.sproPath && lesson.details.sproPath !== 'N/A') {
                    const pathParts = lesson.details.sproPath.split(' > ');
                    let currentNode = tree;
                    let currentPath = "SAP Customizing Implementation Guide";

                    pathParts.forEach(part => {
                        const trimmedPart = part.trim();
                        currentPath += ` > ${trimmedPart}`;
                        if (!currentNode.children[trimmedPart]) {
                            currentNode.children[trimmedPart] = { label: trimmedPart, children: {}, lessons: [], fullPath: currentPath };
                        }
                        currentNode = currentNode.children[trimmedPart];
                    });
                    currentNode.lessons.push({
                        title: lesson.title,
                        link: `/modules/${selectedModule.id}/chapters/${chapter.id}/lessons/${lesson.id}`,
                        path: lesson.details.sproPath
                    });
                }
            });
        });
        return tree;
    }, [selectedModule]);

    const nodeCount = useMemo(() => {
        let count = 0;
        const countNodes = (node: SproNodeData) => {
            count += Object.keys(node.children).length;
            count += node.lessons.length;
            Object.values(node.children).forEach(countNodes);
        };
        countNodes(sproTree);
        return count;
    }, [sproTree]);

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="text-center mb-10 pt-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/10 shadow-glow-sm mb-6">
                    <WrenchScrewdriverIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black font-heading text-text-primary dark:text-dark-text-primary tracking-tight">
                    SPRO <span className="gradient-text">Explorer</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    Navigate the SAP Implementation Guide (IMG) with our interactive tree viewer.
                </p>
            </div>

            {/* Controls */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface dark:bg-dark-surface p-4 rounded-2xl border border-border-color dark:border-dark-border-color shadow-sm">
                <div className="w-full sm:w-auto">
                    <label htmlFor="module-select" className="block text-xs font-bold text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-2">Select Module</label>
                    <div className="relative">
                        <select
                            id="module-select"
                            value={selectedModuleId}
                            onChange={(e) => setSelectedModuleId(e.target.value)}
                            className="w-full sm:w-64 pl-4 pr-10 py-3 text-sm font-medium bg-surface-light dark:bg-dark-surface-light border border-transparent focus:border-primary dark:focus:border-dark-primary rounded-xl focus:ring-2 focus:ring-primary/30 dark:focus:ring-dark-primary/30 outline-none appearance-none cursor-pointer transition-all"
                        >
                            {MODULES.map(module => (
                                <option key={module.id} value={module.id}>{module.title}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary px-3 py-1.5 rounded-full bg-surface-light dark:bg-dark-surface-light border border-border-color dark:border-dark-border-color">
                        {nodeCount} Nodes
                    </span>
                    <button
                        className="p-2 rounded-xl text-text-secondary hover:bg-surface-light dark:hover:bg-dark-surface-light transition-colors"
                        title="Collapse All (Coming Soon)"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" /></svg>
                    </button>
                </div>
            </div>

            {/* Tree View */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-white/5 shadow-card dark:shadow-dark-card min-h-[500px]">
                {Object.values(sproTree.children).length > 0 ? (
                    <SproNode node={sproTree} level={-1} isLast={false} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                        <div className="w-16 h-16 bg-surface-light dark:bg-dark-surface-light rounded-2xl flex items-center justify-center mb-4">
                            <FolderIcon className="w-8 h-8 text-text-secondary/30" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary">No Configuration Paths</h3>
                        <p className="text-text-secondary dark:text-dark-text-secondary max-w-xs mx-auto mt-2">
                            This module doesn't have any SPRO paths mapped yet. Try selecting another module.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SproExplorerPage;