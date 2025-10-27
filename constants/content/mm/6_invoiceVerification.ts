import type { Chapter } from '../../../types';

export const CHAPTER_6_INVOICE_VERIFICATION: Chapter = {
  id: 'ch6',
  title: '6. Invoice Verification',
  lessons: [
    {
      id: 'l6-1',
      title: 'Logistics Invoice Verification (LIV)',
      duration: 20,
      details: {
        tCode: 'MIRO',
        definition: 'Logistics Invoice Verification is the process of receiving and verifying a vendor\'s invoice with reference to a Purchase Order and Goods Receipt.',
        purpose: 'To check the accuracy of the invoice (quantities and prices) before posting it and creating a payment liability. This is the final step in the procurement cycle from an MM perspective.',
        integrationNotes: 'Posting an invoice in MIRO creates an accounting document. The typical entry is Debit GR/IR Clearing Account, Credit Vendor Account.',
        updatesS4HANA: 'MIRO is still the core transaction. The Fiori app "Create Supplier Invoice" provides a modern alternative.',
      },
    },
    {
      id: 'l6-2',
      title: 'Invoice Block & Release',
      duration: 15,
      details: {
        tCode: 'MRBR',
        definition: 'An invoice can be automatically blocked for payment if discrepancies are found between the PO, GR, and invoice (e.g., price or quantity variances).',
        purpose: 'To prevent payment for incorrect invoices. An authorized user must investigate the variance and manually release the invoice for payment once the issue is resolved.',
        updatesS4HANA: 'The process remains the same.',
      },
    },
    {
      id: 'l6-3',
      title: 'Credit Memo & Subsequent Debit/Credit',
      duration: 15,
      details: {
        tCode: 'MIRO',
        definition: 'A Credit Memo is used to correct a vendor overcharge. A Subsequent Debit/Credit is used to adjust the invoice value after it has already been posted, without changing the quantity (e.g., for unexpected freight charges).',
        purpose: 'To handle invoice corrections and adjustments.',
        updatesS4HANA: 'These transactions are also handled within the MIRO transaction by selecting the appropriate transaction type.',
      },
    },
  ],
  quiz: {
    id: 'mm-q6',
    title: 'Invoice Verification Quiz',
    questions: [
      { question: 'What is the transaction for Logistics Invoice Verification?', options: ['MIGO', 'ME21N', 'MIRO'], correctAnswer: 2 },
      { question: 'What is the typical accounting entry when posting an invoice in MIRO?', options: ['Debit Inventory, Credit GR/IR', 'Debit GR/IR, Credit Vendor', 'Debit Vendor, Credit GR/IR'], correctAnswer: 1 },
      { question: 'Which transaction is used to release blocked invoices?', options: ['MIRO', 'MRBR', 'MIGO'], correctAnswer: 1 },
    ]
  }
};
