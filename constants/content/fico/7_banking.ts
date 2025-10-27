import type { Chapter } from '../../../types';

export const CHAPTER_7_BANKING: Chapter = {
  id: 'ch7',
  title: '7. Banking Configurations & Operation',
  lessons: [
    {
      id: 'l7-1',
      title: 'Fundamentals of Banking Operations',
      duration: 10,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'Bank accounting in SAP focuses on managing all transactions with the company\'s banks. This includes cash payments, cash receipts, and reconciling the company\'s book balance with the bank statement.',
        purpose: 'To maintain accurate records of cash and bank balances, manage liquidity, and automate payment and reconciliation processes.',
        configurationSteps: [],
        integrationNotes: 'Bank accounts are represented by G/L accounts in the Chart of Accounts. The House Bank configuration links these G/L accounts to the specific bank master data (bank keys, account numbers) required for payment processing.',
        updatesS4HANA: 'S/4HANA introduces Bank Account Management (BAM) as the central tool for managing all bank accounts, offering enhanced control and workflow capabilities. Classic T-codes like FI12 are no longer the primary method.',
      },
    },
    {
      id: 'l7-2',
      title: 'House Bank and Bank Key Configuration',
      duration: 20,
      details: {
        tCode: 'FI12 (Classic), Fiori App "Manage Banks" (S/4HANA)',
        sproPath: 'Financial Accounting > Bank Accounting > Bank Accounts > Define House Banks',
        definition: 'A House Bank is the bank your company uses. The configuration involves defining the bank itself (Bank Key), the accounts held at that bank, and linking them to G/L accounts.',
        purpose: 'To represent the physical banks and bank accounts your company uses within SAP. This is essential for payment processing (APP) and bank statement processing.',
        configurationSteps: ['In classic GUI, use FI12 to create a House Bank and assign bank accounts. In S/4HANA, use the "Manage Banks" and "Manage Bank Accounts" Fiori apps.'],
        integrationNotes: 'A Bank Key is a country-specific identifier for a bank (like a routing number). The House Bank combines the Bank Key with your company-specific account details.',
        updatesS4HANA: 'The recommended way to manage house banks and accounts is through the Fiori apps as part of Bank Account Management (BAM). FI12 is largely obsolete and has limited functionality in S/4HANA.',
      },
    },
    {
      id: 'l7-3',
      title: 'Manual Bank Reconciliation',
      duration: 20,
      details: {
        tCode: 'FF67',
        sproPath: 'N/A',
        definition: 'Manual Bank Reconciliation is the process of manually entering data from your physical bank statement into SAP to clear open items in the bank clearing accounts.',
        purpose: 'To reconcile the cash balance in the company\'s books with the bank statement balance, ensuring all transactions are accounted for.',
        configurationSteps: ['Enter statement header data (date, balances). Enter individual transaction lines and select open items to clear.'],
        integrationNotes: 'This process typically involves a "Bank Main" account and two "Bank Clearing" accounts (incoming and outgoing) for better control.',
        updatesS4HANA: 'FF67 is still available, but the Fiori app "Reprocess Bank Statement Items" is the modern tool for handling exceptions from electronic bank statements.',
      },
    },
    {
      id: 'l7-4',
      title: 'Electronic Bank Reconciliation (EBR)',
      duration: 30,
      details: {
        tCode: 'FF_5 (Import), FF.A (Import with Post-Processing)',
        sproPath: 'Financial Accounting > Bank Accounting > Business Transactions > Payment Transactions > Electronic Bank Statement',
        definition: 'Electronic Bank Reconciliation automates the reconciliation process by uploading an electronic file (e.g., MT940, BAI2) from the bank. The system then automatically clears open items based on predefined posting rules.',
        purpose: 'To significantly speed up the bank reconciliation process, reducing manual effort and errors. It is highly efficient for companies with a large volume of transactions.',
        configurationSteps: ['The key is configuring Posting Rules that link external transaction codes from the bank file to internal posting actions in SAP.'],
        integrationNotes: 'Proper configuration of posting rules and search algorithms is the key to achieving a high automation rate in EBR.',
        updatesS4HANA: 'The process is fundamentally the same. The Fiori app "Manage Bank Statements" provides a central dashboard for monitoring statement imports and their status.',
      },
    }
  ],
  quiz: {
    id: 'fico-q7',
    title: 'Banking Quiz',
    questions: [
      { question: 'In S/4HANA, what is the new, recommended tool for managing bank accounts?', options: ['FI12', 'Bank Account Management (BAM) via Fiori apps', 'FF67'], correctAnswer: 1 },
      { question: 'What is the primary purpose of Electronic Bank Reconciliation?', options: ['To print checks', 'To automate the matching of bank statement items with SAP open items', 'To create vendors'], correctAnswer: 1 },
      { question: 'Classic T-Code FI12 is used to...', options: ['Post a bank transaction', 'Define House Banks', 'View bank balances'], correctAnswer: 1 },
    ]
  }
};