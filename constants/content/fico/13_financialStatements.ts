import type { Chapter } from '../../../types';

export const CHAPTER_13_FINANCIAL_STATEMENTS: Chapter = {
  id: 'ch13',
  title: '13. Drilldown Reporting - Financial Statements',
  lessons: [
    {
      id: 'l13-1',
      title: 'Define Financial Statement Version (FSV)',
      duration: 30,
      details: {
        tCode: 'OB58',
        sproPath: 'Financial Accounting > General Ledger Accounting > Business Transactions > Closing > Document > Define Financial Statement Versions',
        definition: 'A Financial Statement Version (FSV) is a hierarchical structure that defines how G/L accounts are grouped and displayed in financial statements like the Balance Sheet and Profit & Loss statement.',
        purpose: 'To arrange G/L accounts in the required format for legal reporting. It allows you to define nodes for Assets, Liabilities, Equity, etc., and assign ranges of G/L accounts to these nodes.',
        configurationSteps: [
          'Go to OB58 and create a new FSV.',
          'Define the main nodes (e.g., Assets, Liabilities).',
          'Create sub-nodes (e.g., Current Assets, Fixed Assets).',
          'Assign G/L account ranges to the lowest-level nodes.',
        ],
        integrationNotes: 'The FSV is a mandatory parameter for running the main financial statement reports.',
        updatesS4HANA: 'FSVs are still fundamentally important. In S/4HANA, you must also define which Semantic Tag is linked to which FSV node, which is essential for Fiori analytical apps to work correctly.',
      },
    },
    {
      id: 'l13-2',
      title: 'Drawing Balance Sheet & P&L',
      duration: 15,
      details: {
        tCode: 'S_ALR_87012284',
        sproPath: 'N/A',
        definition: 'This is the process of executing the financial statement report in SAP, which uses the configured Financial Statement Version to display the balances of G/L accounts.',
        purpose: 'To generate the company\'s official Balance Sheet and P&L statement for a specific period for external reporting to shareholders, banks, and regulatory bodies.',
        configurationSteps: [
          'Go to T-Code S_ALR_87012284 (or search for "Financial Statement" in the SAP Easy Access menu).',
          'Enter the Company Code and Financial Statement Version.',
          'Specify the reporting period and execute the report.',
          'The system will display the G/L account balances aggregated according to the hierarchical structure defined in your FSV.',
        ],
        integrationNotes: 'This report reads data directly from the G/L balance tables.',
        updatesS4HANA: 'While this classic report is still available for compatibility, the strategic reporting tools in S/4HANA are the Fiori analytical apps like "Balance Sheet/Income Statement" and "Trial Balance". These apps provide drill-down capabilities and real-time insights directly from the Universal Journal.',
      },
    }
  ],
  quiz: {
    id: 'fico-q13',
    title: 'Financial Statements Quiz',
    questions: [
      { question: 'What is the purpose of a Financial Statement Version (FSV)?', options: ['To create G/L accounts', 'To define the hierarchical structure for reports like the Balance Sheet and P&L', 'To post financial documents'], correctAnswer: 1 },
      { question: 'What transaction code is used to define an FSV?', options: ['F-02', 'OB58', 'S_ALR_87012284'], correctAnswer: 1 },
      { question: 'In S/4HANA, what are the primary, modern tools for financial reporting?', options: ['Classic ABAP reports', 'Fiori analytical apps', 'SAPscript forms'], correctAnswer: 1 },
    ]
  }
};