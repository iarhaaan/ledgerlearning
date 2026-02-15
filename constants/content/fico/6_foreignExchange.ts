import type { Chapter } from '../../../types';

export const CHAPTER_6_FOREIGN_EXCHANGE: Chapter = {
  id: 'ch6',
  title: '6. Foreign Exchange',
  lessons: [
    {
      id: 'l6-1',
      title: 'Maintain Exchange Rates',
      duration: 15,
      details: {
        tCode: 'OB08',
        sproPath: 'SAP NetWeaver > General Settings > Currencies > Enter Exchange Rates',
        definition: 'This configuration is used to maintain the exchange rates between different currencies for a specific date. These rates are stored in the system table TCURR.',
        purpose: 'To enable the system to translate foreign currency amounts into the local currency (company code currency) during transaction posting and for foreign currency valuation at period-end.',
        configurationSteps: [
          'Navigate to T-Code OB08.',
          'Click "New Entries".',
          'Enter the Exchange Rate Type (e.g., M for standard translation).',
          'Enter the "Valid From" date.',
          'Specify the "From" currency (e.g., USD) and the "To" currency (e.g., EUR).',
          'Enter the exchange rate.',
        ],
        integrationNotes: 'These exchange rates are used across all modules (FI, SD, MM) whenever a transaction involves a foreign currency. It is crucial to keep them updated.',
        updatesS4HANA: 'The transaction and process are unchanged. There is a Fiori app "Currency Exchange Rates" available for maintaining rates with a better UI.',
      },
    },
    {
      id: 'l6-2',
      title: 'Account Determination for Exchange Rate Differences',
      duration: 20,
      details: {
        tCode: 'KDF', // Replaced OB09 in S/4HANA for this specific setting
        sproPath: 'Financial Accounting > General Ledger Accounting > Periodic Processing > Valuate > Foreign Currency Valuation > Prepare Automatic Postings for Foreign Currency Valuation',
        definition: 'This step configures the G/L accounts where realized and unrealized foreign exchange gains or losses will be posted automatically by the system.',
        purpose: 'To automate the posting of exchange rate differences that arise when an open item in a foreign currency is cleared or when it is valuated at period-end.',
        configurationSteps: [
          'In T-Code KDF (or via the SPRO path), for your Chart of Accounts, specify the G/L accounts for realized gains/losses and valuation gains/losses against a valuation area.',
          'This is done for the reconciliation accounts that are managed in foreign currency.',
        ],
        integrationNotes: 'This is a critical month-end closing activity. The foreign currency valuation program (FAGL_FCV) uses this configuration to post unrealized gains and losses.',
        updatesS4HANA: 'While OB09 still exists, the recommended transaction for this setting is KDF as it is more robust and part of the new account determination framework. The valuation program is now FAGL_FCV.',
      },
    },
    {
      id: 'l6-3',
      title: 'Document Posting in Foreign Currency',
      duration: 10,
      details: {
        tCode: 'FB60, FB70, etc.',
        sproPath: 'N/A',
        definition: 'Posting a document in a foreign currency is similar to a local currency posting, but the system uses the exchange rates maintained in T-Code OB08 to translate the amounts.',
        purpose: 'To record transactions with foreign vendors or customers accurately.',
        configurationSteps: [
          'In a transaction like FB60 (Vendor Invoice), enter the document header details.',
          'In the "Currency" field, enter the foreign currency code (e.g., USD). The system will automatically fetch the rate from the exchange rate table based on the posting date.',
          'Enter the invoice amount in the foreign currency.',
          'The system will display both the amount in the document currency and the translated amount in the local currency.',
          'Simulate and post the document.',
        ],
        integrationNotes: 'The document header will show the document currency, while the line items will show amounts in both document and local currency.',
        updatesS4HANA: 'The process is the same. The Universal Journal (ACDOCA) table has fields to store amounts in up to 10 parallel currencies, making multi-currency reporting much more powerful than in ECC.',
      },
    }
  ],
  quiz: {
    id: 'fico-q6',
    title: 'Foreign Exchange Quiz',
    questions: [
      { question: 'Which transaction is used to maintain exchange rates?', options: ['KDF', 'OB08', 'OB07'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the new recommended transaction for configuring automatic postings for exchange rate differences?', options: ['OB09', 'KDF', 'FAGL_FCV'], correctAnswer: 1 },
      { question: 'Realized gains/losses occur when...', options: ['A foreign currency open item is valuated at month-end', 'An exchange rate is updated', 'A foreign currency open item is cleared (paid)'], correctAnswer: 2 },
    ]
  }
};