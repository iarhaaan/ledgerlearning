import type { Chapter } from '../../../types';

export const CHAPTER_7_VALUATION_ACCOUNT_DETERMINATION: Chapter = {
  id: 'ch7',
  title: '7. Valuation & Account Determination',
  lessons: [
    {
      id: 'l7-1',
      title: 'Material Valuation',
      duration: 15,
      details: {
        definition: 'Material Valuation is the process of determining the monetary value of material stocks. In SAP, this is done at the Plant level.',
        purpose: 'To value inventory for the company\'s balance sheet. The two main valuation methods are Standard Price (S) and Moving Average Price (V).',
        integrationNotes: 'The price control indicator (S or V) is set in the Accounting 1 view of the Material Master.',
        updatesS4HANA: 'The Material Ledger is mandatory in S/4HANA, which provides more advanced capabilities for actual costing and parallel valuation, but the basic concepts of S and V price control still apply.',
      },
    },
    {
      id: 'l7-2',
      title: 'Valuation Class',
      duration: 15,
      details: {
        definition: 'The Valuation Class is a key field in the Accounting 1 view of the Material Master that groups materials with the same account determination.',
        purpose: 'To allow the system to post to different G/L accounts for different types of materials (e.g., Raw Materials, Finished Goods) without having to define rules for every single material.',
        updatesS4HANA: 'Valuation Class remains a critical link between MM and FI.',
      },
    },
    {
      id: 'l7-3',
      title: 'Automatic Account Determination (OBYC)',
      duration: 25,
      details: {
        tCode: 'OBYC',
        definition: 'This is the core configuration for MM-FI integration. It defines the rules for how the system finds the correct G/L accounts to post to automatically during goods movements and invoice verification.',
        purpose: 'To automate all financial postings originating from MM, eliminating manual work and ensuring accuracy.',
        integrationNotes: 'Within OBYC, you assign G/L accounts to "Transaction Keys" (e.g., BSX for Inventory, WRX for GR/IR, GBB for Offsetting Entry) based on factors like Valuation Class.',
        updatesS4HANA: 'OBYC configuration is still fundamental and one of the most important integration points to understand.',
      },
    },
  ],
  quiz: {
    id: 'mm-q7',
    title: 'Valuation Quiz',
    questions: [
      { question: 'Which transaction is used for MM-FI automatic account determination?', options: ['VKOA', 'OBYC', 'OKKP'], correctAnswer: 1 },
      { question: 'Which field in the Material Master is the main link to G/L account determination?', options: ['Material Group', 'Purchasing Group', 'Valuation Class'], correctAnswer: 2 },
      { question: 'What are the two main price control indicators for materials?', options: ['High/Low', 'Internal/External', 'Standard/Moving Average'], correctAnswer: 2 },
    ]
  }
};
