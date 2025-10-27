import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../constants/modules';
import type { Module } from '../types';
import { WrenchScrewdriverIcon, FolderIcon, FolderOpenIcon, AcademicCapIcon } from './Icons';

interface SproNodeData {
    label: string;
    children: { [key: string]: SproNodeData };
    lessons: {
        title: string;
        link: string;
    }[];
}

const SproNode: React.FC<{ node: SproNodeData; level: number }> = ({ node, level }) => {
    const [isOpen, setIsOpen] = useState(level < 2);
    const hasChildren = node.children && Object.keys(node.children).length > 0;
    const hasLessons = node.lessons && node.lessons.length > 0;
    const isRoot = level === -1;
    const isLeafLink = !hasChildren && hasLessons && node.lessons.length === 1;

    const toggle = () => {
        if (hasChildren || (hasLessons && !isLeafLink)) {
            setIsOpen(!isOpen);
        }
    };
    
    if (isRoot) {
        return (
            <div>
                {/* Fix: Explicitly type sort function arguments to resolve 'unknown' type error. */}
                {Object.values(node.children).sort((a: SproNodeData,b: SproNodeData) => a.label.localeCompare(b.label)).map((child, index) => (
                    <SproNode key={index} node={child} level={level + 1} />
                ))}
            </div>
        );
    }

    const NodeContent = () => (
        <div className="flex items-center py-1.5 group">
            <div className="w-6 flex-shrink-0">
              {hasChildren ? (
                  isOpen ? 
                  <FolderOpenIcon className="h-5 w-5 text-accent dark:text-dark-accent" /> : 
                  <FolderIcon className="h-5 w-5 text-accent dark:text-dark-accent" />
              ) : (isLeafLink ? <AcademicCapIcon className="h-5 w-5 text-primary dark:text-dark-primary" /> : <div className="w-5 h-5" />) }
            </div>
            <span className={`font-medium text-sm ${isLeafLink ? 'text-primary dark:text-dark-primary' : 'text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary'}`}>{node.label}</span>
        </div>
    );
    
    if (isLeafLink) {
         return (
            <div style={{ paddingLeft: `${level * 1.5}rem` }}>
                <Link to={node.lessons[0].link} className="block rounded-md hover:bg-primary/10 dark:hover:bg-dark-primary/10">
                    <NodeContent />
                </Link>
            </div>
        );
    }
    
    return (
        <div style={{ paddingLeft: `${level * 1.5}rem` }}>
            <div className="cursor-pointer rounded-md hover:bg-primary/10 dark:hover:bg-dark-primary/10" onClick={toggle}>
                <NodeContent />
            </div>
            {isOpen && (
                <div className="border-l-2 border-border-color dark:border-dark-border-color ml-2.5">
                    {hasLessons && node.lessons.map((lesson, index) => (
                        <Link 
                            key={index} 
                            to={lesson.link} 
                            className="flex items-center py-1.5 cursor-pointer rounded-md hover:bg-primary/10 dark:hover:bg-dark-primary/10 group"
                            style={{ paddingLeft: `1.5rem` }}
                        >
                            <div className="w-6 flex-shrink-0">
                                <AcademicCapIcon className="h-5 w-5 text-primary dark:text-dark-primary" />
                            </div>
                            <span className="text-sm text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary italic">{lesson.title}</span>
                        </Link>
                    ))}
                    {/* Fix: Explicitly type sort function arguments to resolve 'unknown' type error. */}
                    {hasChildren && Object.values(node.children).sort((a: SproNodeData, b: SproNodeData) => a.label.localeCompare(b.label)).map((child, index) => (
                        <SproNode key={index} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const SproExplorerPage: React.FC = () => {
    const [selectedModuleId, setSelectedModuleId] = useState(MODULES[0].id);

    const selectedModule = MODULES.find(m => m.id === selectedModuleId);

    const sproTree = useMemo(() => {
        if (!selectedModule) return { label: "root", children: {}, lessons: [] };

        const tree: SproNodeData = { label: "SAP Customizing Implementation Guide", children: {}, lessons: [] };
        selectedModule.chapters.forEach(chapter => {
            chapter.lessons.forEach(lesson => {
                if (lesson.details.sproPath && lesson.details.sproPath !== 'N/A') {
                    const pathParts = lesson.details.sproPath.split(' > ');
                    let currentNode = tree;
                    pathParts.forEach(part => {
                        const trimmedPart = part.trim();
                        if (!currentNode.children[trimmedPart]) {
                            currentNode.children[trimmedPart] = { label: trimmedPart, children: {}, lessons: [] };
                        }
                        currentNode = currentNode.children[trimmedPart];
                    });
                    currentNode.lessons.push({
                        title: lesson.title,
                        link: `/modules/${selectedModule.id}/chapters/${chapter.id}/lessons/${lesson.id}`
                    });
                }
            });
        });
        return tree;
    }, [selectedModule]);

    return (
        <div>
            <div className="text-center mb-12">
                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-dark-primary/10 mb-6">
                    <WrenchScrewdriverIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary sm:text-5xl tracking-tight">
                    SPRO Explorer
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary">
                    An interactive simulation of the SAP Project Reference Object (IMG) menu.
                </p>
            </div>
            
            <div className="mb-6 max-w-xs">
                 <label htmlFor="module-select" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Select Module</label>
                 <select
                    id="module-select"
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-base bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent focus:outline-none"
                 >
                    {MODULES.map(module => (
                        <option key={module.id} value={module.id}>{module.title}</option>
                    ))}
                </select>
            </div>

            <div className="bg-surface dark:bg-dark-surface p-4 sm:p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                {Object.values(sproTree.children).length > 0 ? (
                    <SproNode node={sproTree} level={-1} />
                ) : (
                    <p className="text-text-secondary dark:text-dark-text-secondary p-4">No SPRO paths available for this module.</p>
                )}
            </div>
        </div>
    );
};

export default SproExplorerPage;