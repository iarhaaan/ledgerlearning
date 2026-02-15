import type { Chapter } from '../../../types';

export const CHAPTER_11_ASSET_ACCOUNTING: Chapter = {
  id: 'ch11',
  title: '11. Asset Accounting',
  lessons: [
    {
      id: 'l11-1',
      title: 'Copy Chart of Depreciation & Assign to CoCode',
      duration: 15,
      details: {
        tCode: 'EC08 (Copy), OAOB (Assign)',
        sproPath: 'Financial Accounting > Asset Accounting > Organizational Structures',
        definition: 'The Chart of Depreciation is a country-specific directory of depreciation areas (e.g., for book depreciation, tax depreciation). It is best practice to copy a standard template and then assign it to your company code.',
        purpose: 'To establish the legal and operational framework for asset valuation. Each company code is assigned to one Chart of Depreciation.',
        configurationSteps: ['Copy a standard Chart of Depreciation (e.g., 0DE for Germany). Assign your company code to this new Chart of Depreciation.'],
        integrationNotes: 'The depreciation areas within the Chart of Depreciation control how asset values are posted to the General Ledger.',
        updatesS4HANA: 'This initial setup is similar. However, S/4HANA requires the use of "New" Asset Accounting, which must be activated. The integration with the Universal Journal is much deeper.',
      },
    },
    {
      id: 'l11-2',
      title: 'Specify Account Determination',
      duration: 15,
      details: {
        tCode: 'AO90',
        sproPath: 'Financial Accounting > Asset Accounting > Integration with General Ledger Accounting > Assign G/L Accounts',
        definition: 'Account Determination is a key that links asset classes to the corresponding G/L accounts in the general ledger.',
        purpose: 'To enable automatic posting of asset values (e.g., acquisition cost, accumulated depreciation, depreciation expense) to the correct G/L accounts without manual intervention.',
        configurationSteps: ['Define a key, then assign all required balance sheet and P&L accounts for APC, depreciation, and asset retirement.'],
        integrationNotes: 'This is the core of the FI-AA integration.',
        updatesS4HANA: 'The configuration remains in AO90, but now it uses a new account determination logic that is ledger-group specific, providing more flexibility for parallel accounting.',
      },
    },
    {
      id: 'l11-3',
      title: 'Screen Layout & Number Ranges',
      duration: 20,
      details: {
        tCode: 'AO21 (Screen Layout), AS08 (Number Ranges)',
        sproPath: 'Financial Accounting > Asset Accounting > Master Data > Screen Layout / Number Ranges',
        definition: 'The Screen Layout Rule controls the field status (required, optional, etc.) of fields in the asset master record. Number Ranges define the unique numbers assigned to assets.',
        purpose: 'To customize the asset master data entry screen and to ensure that each asset receives a unique ID number based on its asset class.',
        configurationSteps: ['Define a screen layout rule and set the status for each field group. Define a number range interval in AS08.'],
        integrationNotes: 'Both the screen layout and number range are assigned to the Asset Class.',
        updatesS4HANA: 'These configurations are still required and function similarly.',
      },
    },
    {
      id: 'l11-4',
      title: 'Define Asset Classes',
      duration: 20,
      details: {
        tCode: 'OAOA',
        sproPath: 'Financial Accounting > Asset Accounting > Master Data > Define Asset Classes',
        definition: 'An Asset Class is the primary tool for structuring fixed assets (e.g., Buildings, Vehicles, Computers).',
        purpose: 'It is the most important configuration for asset master data, as it links the Account Determination, Screen Layout, and Number Range to the master record. It also provides default values for depreciation.',
        configurationSteps: ['Create an asset class and assign the Account Determination key, Screen Layout rule, and Number Range interval to it.'],
        integrationNotes: 'When a user creates an asset master, they must first select an asset class, which then determines all the control parameters.',
        updatesS4HANA: 'Asset classes remain the central control element for asset master data.',
      },
    },
    {
      id: 'l11-5',
      title: 'Depreciation Keys Configuration',
      duration: 25,
      details: {
        tCode: 'AFAMA',
        sproPath: 'Financial Accounting > Asset Accounting > Depreciation > Valuation Methods > Depreciation Keys > Maintain Depreciation Keys',
        definition: 'A Depreciation Key contains all the calculation rules needed to determine the amount of depreciation for an asset.',
        purpose: 'To define how depreciation is calculated (e.g., straight-line, declining balance) over the asset\'s useful life.',
        configurationSteps: [
            "A Depreciation Key combines several settings:",
            "1. <b>Base Method:</b> Determines the base value for depreciation calculation.",
            "2. <b>Period Control Method:</b> Determines when depreciation starts and stops.",
            "3. <b>Multilevel Method:</b> Defines the depreciation rates over the useful life.",
        ],
        integrationNotes: 'The depreciation key is assigned as a default in the asset class and can be overridden in the asset master record.',
        updatesS4HANA: 'The configuration principle is the same. The depreciation run itself is a new transaction (AFAB) which is much faster and posts directly to the Universal Journal.',
      },
    },
    {
      id: 'l11-6',
      title: 'Asset Master Creation and Acquisition',
      duration: 20,
      details: {
        tCode: 'AS01 (Create), F-90 (Acquisition with Vendor)',
        sproPath: 'N/A',
        definition: 'This is the process of creating the asset master record and then posting its acquisition value.',
        purpose: 'To record a new fixed asset in the system and capitalize its cost on the balance sheet.',
        configurationSteps: ['Create the master data in AS01 by selecting an asset class. Post the acquisition via F-90, debiting the asset and crediting the vendor.'],
        integrationNotes: 'The acquisition posting automatically updates the Asset sub-ledger and the General Ledger.',
        updatesS4HANA: 'AS01 is still available, but Fiori apps like "Manage Fixed Assets" are recommended. The acquisition posting now generates a single document in the Universal Journal with all ledger-specific details.',
      },
    },
    {
      id: 'l11-7',
      title: 'Depreciation Run and Other Transactions',
      duration: 20,
      details: {
        tCode: 'AFAB (Run), ABAVN (Retirement/Scrapping), ABUMN (Transfer)',
        sproPath: 'N/A',
        definition: 'The Depreciation Run (AFAB) is the periodic process that calculates and posts depreciation for all assets. Other transactions manage the asset lifecycle.',
        purpose: 'To manage the complete lifecycle of an asset, from acquisition through periodic depreciation to final retirement.',
        configurationSteps: ['Execute AFAB at each period-end. It calculates the depreciation for each asset and posts a single batch document.'],
        integrationNotes: 'The depreciation run posts a debit to the Depreciation Expense account and a credit to the Accumulated Depreciation account, based on the AO90 settings.',
        updatesS4HANA: 'The classic depreciation run (AFABN) is obsolete. The new depreciation run (AFAB) must be used. It has been redesigned for performance on the HANA database and posts in real-time to all ledgers.',
      },
    },
  ],
  quiz: {
    id: 'fico-q11',
    title: 'Asset Accounting Quiz',
    questions: [
      { question: 'What is the most important master data control element in Asset Accounting?', options: ['Cost Center', 'Asset Class', 'Depreciation Key'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the new, mandatory transaction for the depreciation run?', options: ['AFABN', 'AFAB', 'F-90'], correctAnswer: 1 },
      { question: 'The Account Determination (T-Code AO90) links an asset class to what?', options: ['Depreciation Keys', 'G/L Accounts', 'Users'], correctAnswer: 1 },
      { question: 'The Period Control Method within a Depreciation Key determines what?', options: ['The depreciation percentage', 'When depreciation starts and stops', 'The base value for calculation'], correctAnswer: 1 },
    ]
  }
};