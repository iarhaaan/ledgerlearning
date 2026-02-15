import type { Chapter } from '../../../types';

export const CHAPTER_10_NEW_GL_ACCOUNTING: Chapter = {
  id: 'ch10',
  title: '10. New GL Accounting',
  lessons: [
    {
      id: 'l10-1',
      title: 'Introduction to New G/L',
      duration: 15,
      details: {
        tCode: 'N/A',
        sproPath: 'Financial Accounting (New) > Financial Accounting Global Settings (New) > Activate New General Ledger Accounting',
        definition: 'New General Ledger (New G/L) accounting in SAP combines the functionalities of the classic General Ledger with those of Profit Center Accounting (PCA), Special Purpose Ledger, and other components into a single, unified ledger table.',
        purpose: 'To provide a streamlined general ledger solution with benefits like real-time integration of CO and FI, parallel accounting (e.g., for IFRS and local GAAP), and enhanced reporting via segment reporting and document splitting.',
        configurationSteps: ['The main activation step is to flag "New General Ledger Accounting is Active" in the SPRO path.'],
        integrationNotes: 'With New G/L, financial statements (Balance Sheet, P&L) can be generated not only at the company code level but also for entities like Profit Centers or Segments in real-time.',
        updatesS4HANA: 'New G/L is not optional in S/4HANA; it is the only general ledger available. Its concepts are the foundation of the Universal Journal (ACDOCA), making this knowledge essential.',
      },
    },
    {
      id: 'l10-2',
      title: 'Document Splitting Configuration',
      duration: 30,
      details: {
        tCode: 'N/A',
        sproPath: 'Financial Accounting (New) > General Ledger Accounting (New) > Business Transactions > Document Splitting',
        definition: 'Document Splitting is a key feature of New G/L. It automatically splits line items of a document for specific characteristics (like Profit Center or Segment) during posting, ensuring that these characteristics are balanced to zero for the entire document.',
        purpose: 'To enable the creation of complete financial statements for entities below the company code level. For example, it ensures that not only the expense line but also the vendor and tax lines are assigned to the correct Profit Center.',
        configurationSteps: [
          '1. <b>Classify G/L Accounts for Document Splitting:</b> Assign categories to G/L accounts (e.g., Expense, Bank, Vendor).',
          '2. <b>Classify Document Types for Document Splitting:</b> Assign a Business Transaction Variant to each document type.',
          '3. <b>Define Zero-Balance Clearing Account:</b> Configure an account to post clearing lines when a balance is not zero.',
          '4. <b>Define Document Splitting Characteristics:</b> Specify which fields (e.g., Profit Center) should be split.',
          '5. <b>Activate Document Splitting:</b> Activate the functionality at the client level.'
        ],
        integrationNotes: 'Proper document splitting configuration is critical for accurate segment reporting, a legal requirement in many countries (e.g., under IFRS 8 and US GAAP).',
        updatesS4HANA: 'Document Splitting is a core and mandatory component of S/4HANA Finance. The configuration is largely the same, but it is even more critical to get it right from the start.',
      },
    },
    {
      id: 'l10-3',
      title: 'Posting with Document Splitting',
      duration: 15,
      details: {
        tCode: 'FB03',
        sproPath: 'N/A',
        definition: 'When document splitting is active, users post documents as usual (e.g., FB60). The splitting process happens automatically in the background. The result can be viewed in the "General Ledger View" of a document.',
        purpose: 'To see how the system enriches the document with additional line items or account assignments to ensure a balanced entry for the specified splitting characteristics.',
        configurationSteps: [
          'Post a vendor invoice (FB60) for an expense, assigning a Profit Center to the expense line.',
          'Display the document in FB03.',
          'Compare the "Entry View" (how the user entered it) with the "General Ledger View" (how the system saved it in the ledger).',
        ],
        integrationNotes: 'The G/L view will show that the vendor and tax lines have also been assigned the same Profit Center as the expense line, creating a balanced document at the Profit Center level.',
        updatesS4HANA: 'The concept of Entry View vs. G/L View is fundamental in S/4HANA. The G/L View is essentially a representation of the data in the Universal Journal (ACDOCA).',
      },
    }
  ],
  quiz: {
    id: 'fico-q10',
    title: 'New G/L Quiz',
    questions: [
      { question: 'In S/4HANA, is New G/L accounting optional?', options: ['Yes, you can choose classic or new G/L', 'No, it is the only general ledger available', 'Only for certain countries'], correctAnswer: 1 },
      { question: 'What is the main purpose of Document Splitting?', options: ['To split a document into multiple documents', 'To enable balanced financial statements for entities like Segments or Profit Centers', 'To classify document types'], correctAnswer: 1 },
      { question: 'In which "view" of a document can you see the results of the document split?', options: ['Entry View', 'Header View', 'General Ledger View'], correctAnswer: 2 },
    ]
  }
};