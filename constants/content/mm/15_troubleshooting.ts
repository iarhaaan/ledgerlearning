import type { Chapter } from '../../../types';

export const CHAPTER_16_TROUBLESHOOTING: Chapter = {
  id: 'ch16',
  title: '16. Common Issues & Troubleshooting',
  lessons: [
    {
      id: 'l16-1',
      title: 'Analyzing Account Determination',
      duration: 20,
      details: {
        definition: 'A common issue is when a goods movement fails due to a G/L account not being found.',
        purpose: 'To troubleshoot MM-FI integration issues.',
        configurationSteps: [
            '1. Check the error message for the Transaction Key (e.g., GBB) and the Valuation Class of the material.',
            '2. Go to OBYC.',
            '3. Double-click the Transaction Key from the error message.',
            '4. Check if there is a G/L account assigned for the combination of your Chart of Accounts, Valuation Modifier, and Valuation Class.',
        ],
        updatesS4HANA: 'This skill remains essential for MM consultants.',
      },
    },
    {
      id: 'l16-2',
      title: 'PO History Tab',
      duration: 15,
      details: {
        tCode: 'ME23N',
        definition: 'The "Purchase Order History" tab in the PO display transaction shows all the follow-on documents for a PO item.',
        purpose: 'To track the complete lifecycle of a procurement transaction, from goods receipts to invoice receipts. It is the first place to check the status of a PO.',
        updatesS4HANA: 'This tab is a fundamental feature and remains unchanged.',
      },
    },
  ],
  quiz: {
    id: 'mm-q16',
    title: 'Troubleshooting Quiz',
    questions: [
      { question: 'If a goods movement fails with an account determination error, which transaction is the primary place to check the configuration?', options: ['ME21N', 'MIGO', 'OBYC'], correctAnswer: 2 },
      { question: 'Where can you see all the goods receipts and invoices related to a specific Purchase Order item?', options: ['Material Master', 'PO History Tab', 'Vendor Master'], correctAnswer: 1 },
    ]
  }
};
