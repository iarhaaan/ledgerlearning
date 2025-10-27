import type { Chapter } from '../../../types';

export const CHAPTER_12_TAXATION: Chapter = {
  id: 'ch12',
  title: '12. Taxation System & Configuration in Finance',
  lessons: [
    {
      id: 'l12-1',
      title: 'Tax Calculation Procedure (Basics)',
      duration: 15,
      details: {
        tCode: 'OBYZ',
        sproPath: 'Financial Accounting > Financial Accounting Global Settings > Tax on Sales/Purchases > Basic Settings > Assign Country to Calculation Procedure',
        definition: 'The Tax Calculation Procedure is a country-specific schema that the system uses to calculate taxes. It is a sequence of steps that defines condition types (e.g., base amount, tax amount) and links them to G/L accounts via account keys.',
        purpose: 'To provide the framework for all tax calculations. This procedure is assigned to a country (T-Code OBBG), and all company codes in that country will use it.',
        configurationSteps: ['Typically, a standard SAP-provided procedure is assigned to the country. It is rarely created from scratch.'],
        integrationNotes: 'This procedure is used in FI, SD, and MM whenever a transaction involves a tax calculation.',
        updatesS4HANA: 'The concept of tax procedures remains the same. S/4HANA offers advanced tax solutions and integration with external tax engines, but the basic configuration is still fundamental.',
      },
    },
    {
      id: 'l12-2',
      title: 'Input Tax Configuration (Purchase Tax)',
      duration: 20,
      details: {
        tCode: 'FTXP (Define Tax Codes), OB40 (Assign G/L Accounts)',
        sproPath: 'Financial Accounting > Financial Accounting Global Settings > Tax on Sales/Purchases > Calculation > Define Tax Codes for Sales and Purchases',
        definition: 'Input Tax is the tax paid on purchases of goods or services. It is configured using Tax Codes (e.g., V1, V2) with a tax type "V" for Input Tax.',
        purpose: 'To calculate and post the tax on vendor invoices. The tax amount is typically posted to an "Input Tax Receivable" G/L account, which can be claimed back from the tax authorities.',
        configurationSteps: [
          '1. Create a Tax Code in FTXP with Tax Type "V".',
          '2. Define the tax percentage rate for the relevant condition type (e.g., NAVS).',
          '3. Ensure the corresponding account key (e.g., VST) is assigned to the correct Input Tax G/L account in OB40.',
        ],
        integrationNotes: 'When posting a vendor invoice (FB60/MIRO), the user selects the appropriate tax code, and the system calculates the tax automatically.',
        updatesS4HANA: 'The process for configuring and using input tax codes is unchanged in S/4HANA.',
      },
    },
    {
      id: 'l12-3',
      title: 'Output Tax Configuration (Sales Tax)',
      duration: 20,
      details: {
        tCode: 'FTXP (Define Tax Codes), OB40 (Assign G/L Accounts)',
        sproPath: 'Financial Accounting > Financial Accounting Global Settings > Tax on Sales/Purchases > Calculation > Define Tax Codes for Sales and Purchases',
        definition: 'Output Tax is the tax collected on sales of goods or services. It is configured using Tax Codes (e.g., A1, A2) with a tax type "A" for Output Tax.',
        purpose: 'To calculate and post the tax on customer invoices. The tax amount is posted to an "Output Tax Payable" G/L account, which must be remitted to the tax authorities.',
         configurationSteps: [
          '1. Create a Tax Code in FTXP with Tax Type "A".',
          '2. Define the tax percentage rate.',
          '3. Ensure the corresponding account key (e.g., MWS) is assigned to the correct Output Tax G/L account in OB40.',
        ],
        integrationNotes: 'In the integrated SD process, the tax code is usually determined automatically from condition records rather than being entered manually.',
        updatesS4HANA: 'The process for configuring and using output tax codes is unchanged in S/4HANA.',
      },
    },
    {
      id: 'l12-4',
      title: 'Extended Withholding Tax – TDS',
      duration: 30,
      details: {
        tCode: 'N/A',
        sproPath: 'Financial Accounting > Financial Accounting Global Settings > Withholding Tax > Extended Withholding Tax',
        definition: 'Extended Withholding Tax is the standard SAP functionality used to manage tax that is deducted at the source of payment, such as Tax Deducted at Source (TDS) in India or other similar taxes globally.',
        purpose: 'To automatically calculate and deduct the required tax amount when paying a vendor invoice and to facilitate reporting to the tax authorities.',
        configurationSteps: [
          '1. Define Withholding Tax Keys (Official country-specific keys).',
          '2. Define Withholding Tax Types: Specify if tax is calculated at invoice or payment time.',
          '3. Define Withholding Tax Codes: Define the percentage of tax to be withheld.',
          '4. Assign G/L accounts for the withholding tax postings.',
          '5. Activate Extended Withholding Tax for the Company Code.',
          '6. Maintain the withholding tax details in the vendor master record.',
        ],
        integrationNotes: 'This functionality is highly country-specific and requires careful configuration based on local legal requirements.',
        updatesS4HANA: 'The Extended Withholding Tax functionality is still the standard solution in S/4HANA and works in a similar way.',
      },
    }
  ],
  quiz: {
    id: 'fico-q12',
    title: 'Taxation Quiz',
    questions: [
      { question: 'What transaction is used to create and maintain Tax Codes?', options: ['OBYZ', 'OB40', 'FTXP'], correctAnswer: 2 },
      { question: 'Tax paid on purchases is known as...', options: ['Output Tax', 'Withholding Tax', 'Input Tax'], correctAnswer: 2 },
      { question: 'Extended Withholding Tax is typically configured for what purpose?', options: ['Calculating sales tax', 'Managing tax deducted at the source of payment (like TDS)', 'Calculating asset tax'], correctAnswer: 1 },
      { question: 'The Tax Calculation Procedure is assigned at which organizational level?', options: ['Company Code', 'Country', 'Client'], correctAnswer: 1 },
    ]
  }
};