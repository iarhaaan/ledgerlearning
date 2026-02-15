import type { Chapter } from '../../../types';

export const CHAPTER_17_ADVANCED_CONTROLLING: Chapter = {
  id: 'ch17',
  title: '17. Advanced Controlling',
  lessons: [
    {
      id: 'l17-1',
      title: 'Internal Orders',
      duration: 30,
      details: {
        tCode: 'KO01 (Create), KOB1 (Line Items)',
        sproPath: 'Controlling > Internal Orders',
        definition: 'Internal Orders are short-lived cost objects used to plan, collect, and analyze the costs of a specific job, task, or event. Unlike cost centers, which are for ongoing, departmental costs, internal orders have a specific lifecycle.',
        purpose: 'To monitor costs for a specific measure or project, such as a marketing campaign, a trade fair, or an internal R&D project. They provide more granular cost tracking than a cost center.',
        configurationSteps: [
          '1. <b>Define Order Types (KOT2):</b> This is the main control for an internal order, defining number ranges, planning profiles, and settlement profiles.',
          '2. <b>Create Internal Order (KO01):</b> Create the master data for the order, assigning it to a company code and responsible cost center.',
          '3. <b>Post Costs:</b> Post costs to the internal order (e.g., from an FI journal entry or a vendor invoice).',
          '4. <b>Settle Order (KO88):</b> At period-end, the collected costs on the internal order are settled to a final receiver, such as a cost center, an asset, or a profitability segment.',
        ],
        integrationNotes: 'The settlement profile, configured in SPRO, is critical as it defines the valid receivers for the costs collected on the order.',
        updatesS4HANA: 'Internal Orders are fully supported. In S/4HANA, the actual line items are stored in the Universal Journal (ACDOCA), which allows for unified reporting across FI and CO objects.',
      },
    },
    {
      id: 'l17-2',
      title: 'Profitability Analysis (CO-PA)',
      duration: 45,
      details: {
        tCode: 'KE30 (Execute Report)',
        sproPath: 'Controlling > Profitability Analysis',
        definition: 'Profitability Analysis (CO-PA) is a sub-module of Controlling designed to analyze the profitability of market segments. These segments can be defined by products, customers, regions, or any combination of characteristics.',
        purpose: 'To provide a detailed, multi-dimensional "slice and dice" view of a company\'s profit and loss. It helps answer questions like "How profitable is Product A in the North region with Customer X?".',
        configurationSteps: [
          'There are two forms of CO-PA:',
          '1. <b>Costing-Based CO-PA (Legacy):</b> Uses value fields to map cost and revenue data. It requires complex data mapping and runs in separate tables.',
          '2. <b>Account-Based CO-PA (S/4HANA Standard):</b> Uses G/L accounts directly. It is perfectly reconciled with the general ledger by design.',
          'Configuration involves defining the Operating Concern (the highest org unit in CO-PA), maintaining characteristics and value fields (for costing-based), and managing the data flow from SD and other modules.',
        ],
        integrationNotes: 'CO-PA is a major integration point. When a billing document is posted in SD, the system can automatically generate a CO-PA document, populating characteristics like customer and product, and value fields like revenue and COGS.',
        updatesS4HANA: 'In S/4HANA, Account-Based CO-PA is the default and recommended approach. It is fully integrated into the Universal Journal (ACDOCA). This means that every FI posting relevant for profitability automatically contains the CO-PA characteristics, providing real-time, perfectly reconciled profitability reporting without any separate data flows.',
      },
    }
  ],
  quiz: {
    id: 'fico-q17',
    title: 'Advanced Controlling Quiz',
    questions: [
      { question: 'What is the main purpose of an Internal Order?', options: ['To track ongoing departmental costs', 'To track costs for a specific, short-term job or event', 'To manage the company\'s balance sheet'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the default and recommended form of Profitability Analysis (CO-PA)?', options: ['Costing-Based CO-PA', 'Value-Based CO-PA', 'Account-Based CO-PA'], correctAnswer: 2 },
      { question: 'At the end of its life, an Internal Order\'s costs are moved to a final receiver through a process called what?', options: ['Allocation', 'Settlement', 'Distribution'], correctAnswer: 1 },
    ]
  }
};