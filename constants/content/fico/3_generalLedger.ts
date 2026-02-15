import type { Chapter } from '../../../types';

export const CHAPTER_3_GENERAL_LEDGER: Chapter = {
  id: 'ch3',
  title: '3. General Ledger Configuration & Operation',
  lessons: [
    {
      id: 'l3-1',
      title: 'Define Chart of Accounts',
      duration: 20,
      details: {
        tCode: 'OB13',
        sproPath: 'Financial Accounting > General Ledger Accounting > G/L Accounts > Master Data > Preparations > Edit Chart of Accounts List',
        definition: 'A Chart of Accounts (COA) is a structured list of all General Ledger (G/L) accounts used by one or more company codes. It provides the framework for recording all financial transactions.',
        purpose: 'To classify accounts (assets, liabilities, equity, revenue, expenses). There are three types: Operating COA (for daily postings), Group COA (for consolidation), and Country-Specific COA (for legal reporting).',
        configurationSteps: ['Define a 4-character ID, description, maintenance language, and the length of the G/L account number.'],
        integrationNotes: 'The Operating COA is assigned to the company code and is mandatory for transaction posting.',
        updatesS4HANA: 'The concept remains the same, but S/4HANA introduces an "Account Type" field in the COA (OB13) to classify accounts as Balance Sheet, Primary Costs/Revenues, Secondary Costs, etc., which is crucial for the Universal Journal.',
      },
    },
    {
      id: 'l3-2',
      title: 'Define Account Groups',
      duration: 20,
      details: {
        tCode: 'OBD4',
        sproPath: 'Financial Accounting > General Ledger Accounting > G/L Accounts > Master Data > Preparations > Define Account Group',
        definition: 'An Account Group classifies G/L accounts. It determines the number range from which an account is created and controls the field status for the G/L master record.',
        purpose: 'To organize G/L accounts and control the data entry process during G/L account creation (FS00). For example, asset accounts can be grouped in one number range and expense accounts in another.',
        configurationSteps: ['Define a 4-character ID, assign it to your Chart of Accounts, provide a description, and define the number range for the accounts in this group.'],
        integrationNotes: 'The field status control here applies to the G/L master data screen (FS00), not the transaction posting screen (which is controlled by the Field Status Group from OBC4).',
        updatesS4HANA: 'The functionality of Account Groups is identical in S/4HANA.',
      },
    },
    {
      id: 'l3-3',
      title: 'Assign Chart of Accounts to Company Code',
      duration: 5,
      details: {
        tCode: 'OB62',
        sproPath: 'Financial Accounting > General Ledger Accounting > G/L Accounts > Master Data > Preparations > Assign Company Code to Chart of Accounts',
        definition: 'This configuration step links a company code to a specific Operating Chart of Accounts and optionally a Country-Specific Chart of Accounts.',
        purpose: 'To enable the company code to use the G/L accounts defined in the assigned COA. This is a mandatory step.',
        configurationSteps: ['Enter your company code and assign the 4-character ID of your Operating COA.'],
        integrationNotes: 'Once transactions are posted in a company code, the assigned Chart of Accounts cannot be changed.',
        updatesS4HANA: 'This assignment logic is unchanged in S/4HANA.',
      },
    },
    {
      id: 'l3-4',
      title: 'Define Retained Earnings Account',
      duration: 10,
      details: {
        tCode: 'OB53',
        sproPath: 'Financial Accounting > General Ledger Accounting > G/L Accounts > Master Data > Preparations > Define Retained Earnings Account',
        definition: 'This configuration is mandatory for defining the G/L account to which the net result (profit or loss) of the fiscal year is carried forward.',
        purpose: 'To automate the year-end closing process where the balance of all P&L accounts is transferred to the Retained Earnings account on the Balance Sheet.',
        configurationSteps: ['For your Chart of Accounts, enter a P&L statement account type (e.g., "X") and assign a G/L account number for Retained Earnings.'],
        integrationNotes: 'This account must be a Balance Sheet account. The balance carryforward program uses this configuration at year-end.',
        updatesS4HANA: 'This configuration is still required and works the same way in S/4HANA.',
      },
    },
     {
      id: 'l3-5',
      title: 'G/L Account Master Data',
      duration: 20,
      details: {
        tCode: 'FS00',
        sproPath: 'N/A',
        definition: 'The G/L Account Master Record contains all the defining information for a general ledger account, such as its description, account group, and whether it is a P&L or Balance Sheet account. It has two main segments: the Chart of Accounts segment and the Company Code segment.',
        purpose: 'To create the individual G/L accounts that are used for transaction posting. The Company Code segment contains parameters that can be specific for each company code, like currency and field status group.',
        configurationSteps: ['Use FS00, enter the G/L account number and company code, and click Create. Fill in the details in the "Type/Description", "Control Data", and "Create/Bank/Interest" tabs.'],
        integrationNotes: 'The Field Status Group assigned in the company code data is critical as it controls the fields during transaction posting.',
        updatesS4HANA: 'FS00 is now the single transaction for creating ALL G/L accounts, including what used to be separate cost elements (KA01, KA06). You now specify the "G/L Account Type" (e.g., Primary Costs, Secondary Costs) directly in the master record.',
      },
    },
    {
      id: 'l3-6',
      title: 'Document Parking and Reversals',
      duration: 15,
      details: {
        tCode: 'FV50 (Park), FBV0 (Post/Delete), FB08 (Reverse)',
        sproPath: 'N/A',
        definition: 'Document Parking allows a user to save an incomplete financial document in the system without performing validity checks or updating balances. A Reversal is the process of cancelling a posted document by creating an inverse posting.',
        purpose: 'Parking is used in approval workflows, where a junior accountant parks a document and a senior accountant reviews and posts it (using FBV0). Reversals are used to correct erroneous postings.',
        configurationSteps: ['To park, use FV50 and click the "Save as Parked" button. To post, go to FBV0, select the document, and post. To reverse, go to FB08, enter the document number, and specify a reversal reason.'],
        integrationNotes: 'Parked documents do not update G/L balances and are not included in financial statements until they are posted.',
        updatesS4HANA: 'The functionality is the same. There are also Fiori Apps like "Park General Journal Entries" and "Manage Journal Entries" that offer a modern user interface for these processes.',
      },
    },
    {
      id: 'l3-7',
      title: 'Recurring Document',
      duration: 15,
      details: {
        tCode: 'FBD1 (Create), F.14 (Execute)',
        sproPath: 'N/A',
        definition: 'Recurring Documents are templates for business transactions that repeat regularly, such as monthly rent or insurance payments, where the amount is fixed.',
        purpose: 'To automate the posting of predictable, periodic transactions. You create a template with all the details (accounts, amounts), and then run a periodic program (F.14) to generate the actual accounting documents based on the schedule you define.',
        configurationSteps: ['1. Create the template in FBD1, specifying the first and last run date and the run frequency. 2. Execute F.14 to create a batch input session. 3. Process the batch session using SM35 to post the documents.'],
        integrationNotes: 'This is suitable for fixed amounts. For variable amounts, "Sample Documents" are used as a template where the user must manually enter the amount each time.',
        updatesS4HANA: 'This classic functionality still exists. However, the Fiori app "Manage Recurring Journal Entries" provides a more modern and integrated way to handle these processes.',
      },
    },
  ],
  quiz: {
    id: 'fico-q3',
    title: 'General Ledger Quiz',
    questions: [
      { question: 'In S/4HANA, what single transaction is used to create G/L accounts and cost elements?', options: ['FS00 & KA01', 'FS00', 'OBD4 & KA06'], correctAnswer: 1 },
      { question: 'What is the purpose of parking a document?', options: ['To immediately update G/L balances', 'To save an incomplete document for later review and posting', 'To delete a document permanently'], correctAnswer: 1 },
      { question: 'The program F.14 is used for what purpose?', options: ['To create recurring document templates', 'To reverse documents', 'To execute the batch session for posting recurring documents'], correctAnswer: 2 },
      { question: 'What T-code is used to define G/L Account Groups?', options: ['FS00', 'OBD4', 'OB53'], correctAnswer: 1 },
    ]
  }
};