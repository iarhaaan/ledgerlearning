import type { Chapter } from '../../../types';

export const CHAPTER_18_S4HANA_FINANCE: Chapter = {
    id: 'fico-l18',
    title: '18. S/4HANA Finance Changes',
    lessons: [
        {
            id: 'fico-l18-1',
            title: 'New Asset Accounting',
            duration: 25,
            details: {
                definition: 'Asset Accounting in S/4HANA is fully integrated with the Universal Journal. No more periodic postings (ASKB) are required, and reconciliation is real-time.',
                purpose: 'Real-time valuation of assets in multiple currencies and valuation areas (ledgers).',
                updatesS4HANA: 'Technical Clearing Account is a new concept introduced for integrated asset acquisitions.',
            },
        },
        {
            id: 'fico-l18-2',
            title: 'Ledger Approach vs. Accounts Approach',
            duration: 20,
            details: {
                definition: 'S/4HANA strongly favors the Ledger Approach (parallel ledgers) for handling multiple accounting principles (e.g., IFRS vs. GAAP) over the Accounts Approach.',
                purpose: 'Cleaner separation of data and reporting. Each ledger contains a complete set of records for that accounting principle.',
            },
        },
        {
            id: 'fico-l18-3',
            title: 'CO-PA Simplification',
            duration: 20,
            details: {
                definition: 'Account-Based CO-PA (now Margin Analysis) is the default and recommended solution in S/4HANA, as opposed to Costing-Based CO-PA in ECC.',
                purpose: 'To ensure full reconciliation with the G/L (ACDOCA). Costing-Based CO-PA can still run in parallel but is not fully integrated with Universal Journal.',
            },
        },
        {
            id: 'fico-l18-4',
            title: 'Bank Account Management (BAM)',
            duration: 15,
            details: {
                tCode: 'NWBC / Fiori',
                definition: 'Bank Accounts are no longer master data in G/L. They are master data managed in Fiori apps (Cash Management).',
                purpose: 'Centralized management of bank accounts, signatories, and overdraft limits.',
                updatesS4HANA: 'House Banks are still configuration, but House Bank Accounts are master data.',
            },
        },
    ],
    quiz: {
        id: 'fico-q18',
        title: 'S/4HANA Finance Quiz',
        questions: [
            { question: 'Which CO-PA type is recommended in S/4HANA?', options: ['Costing-Based', 'Account-Based (Margin Analysis)', 'Profit Center Accounting'], correctAnswer: 1 },
            { question: 'Asset Accounting postings are now:', options: ['Periodic', 'Real-time', 'Manual', 'Batch'], correctAnswer: 1 },
            { question: 'Where are Bank Accounts managed in S/4HANA Lite?', options: ['FI12', 'Fiori Apps (BAM)', 'FS00'], correctAnswer: 1 },
        ]
    }
};
