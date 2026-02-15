import type { Chapter } from '../../../types';

export const CHAPTER_16_REAL_TIME_SCENARIOS: Chapter = {
  id: 'ch16',
  title: '16. Real Time Scenarios',
  lessons: [
    {
      id: 'l16-1',
      title: 'LSMW (Legacy System Migration Workbench)',
      duration: 30,
      details: {
        tCode: 'LSMW',
        sproPath: 'N/A',
        definition: 'LSMW is a comprehensive tool provided by SAP to migrate large amounts of master and transactional data from a legacy (non-SAP) system into an SAP system. It is a project-based tool that guides the user through a 14-step process.',
        purpose: 'To facilitate and automate data migration during an SAP implementation project. It can be used for almost any master data (G/L, Vendor, Customer, Asset) and some transactional data. It supports various import methods like Batch Input Recording, BAPI, and IDoc.',
        configurationSteps: [
          'The 14 steps include: Create Project, Maintain Object Attributes (e.g., Recording), Maintain Source Structures/Fields, Maintain Field Mapping, Specify & Assign Files, Read Data, Convert Data, Create & Run Batch Input Session.',
        ],
        integrationNotes: 'LSMW using the recording method is powerful but can be sensitive to screen changes. For core objects, using standard BAPIs or IDocs within LSMW is a more robust method.',
        updatesS4HANA: 'LSMW is no longer considered a strategic data migration tool by SAP for S/4HANA. The recommended tool is the SAP S/4HANA Migration Cockpit (T-Code LTMC), which uses pre-configured templates and is more user-friendly.',
      },
    },
    {
      id: 'l16-2',
      title: 'Validation and Substitution',
      duration: 25,
      details: {
        tCode: 'GGB0 (Validation), GGB1 (Substitution), OB28/OBBH (Activation)',
        sproPath: 'Financial Accounting > Financial Accounting Global Settings > Tools > Validation/Substitution',
        definition: 'A **Validation** checks entered data against predefined conditions and issues a custom error or warning message. A **Substitution** automatically replaces entered values with a predefined value if a certain condition is met.',
        purpose: 'To improve data quality and consistency beyond standard configuration. E.g., a validation can prevent posting to a specific G/L account with a wrong cost center. A substitution could auto-populate a Profit Center based on a Cost Center.',
        configurationSteps: [
          '1. <b>Create Rule (GGB0/GGB1):</b> Define the rule with three components: Prerequisite (the condition to check), Check (the rule to enforce), and Message.',
          '2. <b>Activate Rule (OB28/OBBH):</b> A rule must be activated for a specific company code and "call-up point" (e.g., at the Document Header, Line Item, or Complete Document level).',
        ],
        integrationNotes: 'These are powerful tools but should be used carefully as they can make the system behavior complex and harder to troubleshoot.',
        updatesS4HANA: 'Validations and substitutions are still fully supported. S/4HANA also introduces "Check and Substitute Journal Entries" Fiori apps, which are based on the same framework but offer a modern UI for rule definition.',
      },
    },
    {
      id: 'l16-3',
      title: 'Lockbox',
      duration: 20,
      details: {
        tCode: 'FLB2 (Process), FLB1 (Post)',
        sproPath: 'Financial Accounting > Bank Accounting > Business Transactions > Payment Transactions > Lockbox',
        definition: 'Lockbox is a service offered by banks for managing customer payments. Customers send payments to a bank PO Box. The bank deposits the checks and sends a file (typically in BAI2 format) with payment details to the company.',
        purpose: 'To automate the processing of customer payments and the clearing of open receivables. The Lockbox program in SAP (T-Code FLB2) reads the bank file, posts the payments, and attempts to automatically match and clear the open invoices.',
        configurationSteps: ['The main configuration is in T-Code OBAX, where you define the lockbox details provided by your bank and link them to your company code.'],
        integrationNotes: 'The success of automatic clearing depends heavily on the quality of remittance information provided by the customer and the bank.',
        updatesS4HANA: 'The lockbox functionality is still available and works similarly. It is part of the broader "Receivables Management" capabilities in S/4HANA.',
      },
    }
  ],
  quiz: {
    id: 'fico-q16',
    title: 'Real Time Scenarios Quiz',
    questions: [
      { question: 'In S/4HANA, what is the new recommended tool for data migration instead of LSMW?', options: ['BAPI', 'SAP S/4HANA Migration Cockpit (LTMC)', 'IDoc'], correctAnswer: 1 },
      { question: 'What is the key difference between a Validation and a Substitution?', options: ['Validation checks data and issues a message; Substitution automatically changes data.', 'Validation is for master data; Substitution is for transactional data.', 'There is no difference.'], correctAnswer: 0 },
      { question: 'The Lockbox process is used to automate which business function?', options: ['Vendor Payments (Accounts Payable)', 'Customer Payments (Accounts Receivable)', 'Asset Depreciation'], correctAnswer: 1 },
    ]
  }
};