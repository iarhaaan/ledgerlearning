import type { Chapter } from '../../../types';

export const CHAPTER_11_S4HANA_DEV: Chapter = {
    id: 'abap-l11',
    title: '11. S/4HANA Development',
    lessons: [
        {
            id: 'abap-l11-1',
            title: 'Code-to-Data Paradigm',
            duration: 20,
            details: {
                definition: 'The fundamental shift in S/4HANA development where data-intensive logic is pushed from the application server (classic ABAP) down to the HANA database layer.',
                purpose: 'To leverage the massive parallel processing power of HANA for aggregation and calculation.',
                updatesS4HANA: 'Classic "SELECT * -> LOOP -> CALCULATE" is replaced by "CALCULATE IN DB -> RETURN RESULT".',
            },
        },
        {
            id: 'abap-l11-2',
            title: 'ABAP on HANA (ADT)',
            duration: 25,
            details: {
                definition: 'ABAP Development Tools (ADT) in Eclipse is the mandatory IDE for modern S/4HANA development (CDS, AMDP).',
                purpose: 'SE80 does not support new artifacts like CDS Views. Eclipse offers better refactoring, search, and syntax highlighting.',
                updatesS4HANA: 'ABAP developers must transition from SE80 to Eclipse.',
            },
        },
        {
            id: 'abap-l11-3',
            title: 'AMDP (ABAP Managed Database Procedures)',
            duration: 20,
            details: {
                definition: 'A framework that allows developers to write database procedures (using native SQLScript) directly within ABAP classes.',
                purpose: 'To implement complex logic that cannot be expressed in Open SQL or CDS, consuming HANA native features.',
            },
        },
        {
            id: 'abap-l11-4',
            title: 'RAP Model',
            duration: 25,
            details: {
                definition: 'RESTful Application Programming Model (RAP). The strategic programming model for building Fiori apps and OData services on S/4HANA.',
                purpose: 'To provide a standardized way to build cloud-ready, enterprise-grade applications.',
                updatesS4HANA: 'Replaces older models like BOPF and SEGW for new development.',
            },
        },
    ],
    quiz: {
        id: 'abap-q11',
        title: 'S/4HANA Development Quiz',
        questions: [
            { question: 'What is the mandatory IDE for CDS and AMDP development?', options: ['SE80', 'Eclipse (ADT)', 'VS Code', 'Notepad'], correctAnswer: 1 },
            { question: 'What is the primary goal of Code-to-Data?', options: ['Move logic to UI', 'Move logic to Database', 'Keep logic in App Layer'], correctAnswer: 1 },
            { question: 'Which programming model is strategic for S/4HANA?', options: ['Dynpro', 'Web Dynpro', 'RAP', 'BSP'], correctAnswer: 2 },
        ]
    }
};
