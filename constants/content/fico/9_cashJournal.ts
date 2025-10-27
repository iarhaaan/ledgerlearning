import type { Chapter } from '../../../types';

export const CHAPTER_9_CASH_JOURNAL: Chapter = {
  id: 'ch9',
  title: '9. Cash Journal',
  lessons: [
    {
      id: 'l9-1',
      title: 'Cash Journal Configuration',
      duration: 25,
      details: {
        tCode: 'FBCJC0',
        sproPath: 'Financial Accounting > Bank Accounting > Business Transactions > Cash Journal > Set Up Cash Journal',
        definition: 'The Cash Journal is an SAP tool used for managing cash transactions (petty cash). The setup involves creating a unique cash journal for a company code and defining its currency and G/L accounts.',
        purpose: 'To provide a simple and user-friendly interface for entering cash receipts and payments, such as minor office expenses, without the complexity of standard FI postings.',
        configurationSteps: [
          'Go to T-Code FBCJC0 (or the SPRO path).',
          'Click "New Entries".',
          'Enter the Company Code and a 4-character ID for your Cash Journal (e.g., 0001).',
          'Specify the G/L account for the cash journal (the Petty Cash G/L account).',
          'Define the currency and assign document types for postings.',
        ],
        integrationNotes: 'The G/L account assigned here must be configured for postings without a tax code allowed, as taxes are handled at the business transaction level.',
        updatesS4HANA: 'The configuration and functionality of the back-end Cash Journal remain the same in S/4HANA.',
      },
    },
    {
      id: 'l9-2',
      title: 'Define Business Transaction Types',
      duration: 20,
      details: {
        tCode: 'FBCJC2',
        sproPath: 'Financial Accounting > Bank Accounting > Business Transactions > Cash Journal > Create, Change, Delete Business Transactions',
        definition: 'This step involves creating predefined templates for common cash transactions, such as "Office Supplies Expense" or "Postage Expense".',
        purpose: 'To simplify data entry for the end-user. By selecting a business transaction type, the system automatically defaults the G/L account and tax code, reducing errors and speeding up the posting process.',
        configurationSteps: [
          'Go to T-Code FBCJC2.',
          'Enter the Company Code.',
          'Click "New Entries".',
          'Select a business transaction category (e.g., E for Expenses, R for Revenues).',
          'Assign the relevant G/L account, tax code, and a descriptive text.',
        ],
        integrationNotes: 'These transactions are specific to the Cash Journal and are not used in other FI posting transactions.',
        updatesS4HANA: 'This configuration is also unchanged in S/4HANA and is required for the Fiori app to function correctly.',
      },
    },
    {
      id: 'l9-3',
      title: 'Document Posting in Cash Journal',
      duration: 15,
      details: {
        tCode: 'FBCJ',
        sproPath: 'N/A',
        definition: 'This is the end-user transaction for recording all petty cash inflows and outflows.',
        purpose: 'To maintain a real-time record of the cash balance. Users can enter receipts and payments, and once saved and posted, the system generates FI documents in the background.',
        configurationSteps: [
          'Go to T-Code FBCJ.',
          'Select the tab for "Cash Payments" or "Cash Receipts".',
          'Choose the appropriate business transaction type.',
          'Enter the amount and any relevant text.',
          'Save the entry. The transaction is now in the journal but not yet in FI.',
          'To post all saved entries to the General Ledger, click the "Post" button.',
        ],
        integrationNotes: 'Posting in the cash journal updates the cash journal G/L account and the corresponding expense/revenue/customer/vendor accounts.',
        updatesS4HANA: 'The classic FBCJ transaction is still available. There is also a dedicated Fiori app, "Cash Journal", that provides a modern, tablet-friendly user interface for the same process.',
      },
    }
  ],
  quiz: {
    id: 'fico-q9',
    title: 'Cash Journal Quiz',
    questions: [
      { question: 'What is the transaction code for posting transactions in the Cash Journal?', options: ['FBCJC0', 'FBCJ', 'FBCJC2'], correctAnswer: 1 },
      { question: 'What is the primary purpose of defining Business Transaction Types for the Cash Journal?', options: ['To create G/L accounts', 'To act as templates that simplify data entry for common transactions', 'To set up a new company code'], correctAnswer: 1 },
      { question: 'In FBCJ, what action generates the actual FI accounting document in the General Ledger?', options: ['Saving an entry', 'Selecting a business transaction', 'Clicking the "Post" button'], correctAnswer: 2 },
    ]
  }
};