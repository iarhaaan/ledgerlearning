import type { Chapter } from '../../../types';

export const CHAPTER_14_CONTROLLING: Chapter = {
  id: 'ch14',
  title: '14. Controlling (CO) - Basics',
  lessons: [
    {
      id: 'l14-1',
      title: 'Controlling Fundamentals',
      duration: 10,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'Controlling (CO) is the SAP module focused on internal reporting. While Financial Accounting (FI) is concerned with legal reporting to external parties, CO provides information to management for decision-making, planning, and cost management.',
        purpose: 'To manage and analyze costs and revenues to understand profitability, control costs, and support internal business decisions.',
        configurationSteps: [],
        integrationNotes: 'CO objects (like Cost Centers, Profit Centers, Internal Orders) are assigned to FI postings to track costs and revenues for specific purposes.',
        updatesS4HANA: 'In S/4HANA, CO is no longer a separate module with its own tables. All CO postings are now stored in the Universal Journal (ACDOCA) along with FI data, eliminating the need for FI-CO reconciliation.',
      },
    },
    {
      id: 'l14-2',
      title: 'Maintain Controlling Area',
      duration: 15,
      details: {
        tCode: 'OKKP',
        sproPath: 'Controlling > General Controlling > Organization > Maintain Controlling Area',
        definition: 'A Controlling Area is the central organizational unit in CO. It is a self-contained structure where costs and revenues are managed. It can be linked to one or more company codes.',
        purpose: 'To provide the organizational framework for all controlling activities. The assignment to company codes determines whether postings are cross-company-code or not.',
        configurationSteps: ['In OKKP, define the Controlling Area, assign it to Company Codes, and activate the required components (e.g., Cost Centers, Profit Center Acctg).'],
        integrationNotes: 'For the FI-CO integration to be real-time, the Controlling Area must be assigned to the Company Code.',
        updatesS4HANA: 'OKKP is still the central configuration transaction. The currency type of the controlling area is more significant in S/4HANA due to the multi-currency capabilities of the Universal Journal.',
      },
    },
    {
      id: 'l14-3',
      title: 'Maintain CO Number Ranges & Versions',
      duration: 15,
      details: {
        tCode: 'KANK (Number Ranges), OKEQ (Versions)',
        sproPath: 'Controlling > General Controlling > Organization...',
        definition: 'CO documents have their own number ranges, separate from FI. Versions in CO are used to store different sets of data, primarily for planning (e.g., optimistic plan, pessimistic plan). Version 0 is always reserved for actual data.',
        purpose: 'To ensure unique numbering for CO transactions and to enable comparison between planned data and actual data.',
        configurationSteps: ['Define number range groups in KANK. Review the settings for Version 0 in OKEQ to ensure it allows for actual data postings.'],
        integrationNotes: 'Plan/Actual variance analysis is a core activity in CO and relies on the proper setup of versions.',
        updatesS4HANA: 'These settings are still required. Planning can be done using the classic tools or the new SAP Analytics Cloud (SAC) for more advanced planning scenarios.',
      },
    },
    {
      id: 'l14-4',
      title: 'Cost Element Accounting',
      duration: 15,
      details: {
        tCode: 'FS00',
        sproPath: 'N/A',
        definition: 'A Cost Element classifies costs/revenues within CO. Primary Cost Elements have a corresponding G/L account in FI. Secondary Cost Elements exist only in CO for internal allocations (e.g., assessments).',
        purpose: 'To ensure that costs posted in FI flow to CO for management reporting.',
        configurationSteps: [],
        integrationNotes: 'A cost posting in FI to a primary cost element requires a CO account assignment object (like a cost center).',
        updatesS4HANA: 'Cost Elements are now created as G/L accounts in FS00. There are no separate transactions like KA01 or KA06. You simply choose the G/L Account Type "Primary Costs or Revenue" or "Secondary Costs". This is a major simplification.',
      },
    },
    {
      id: 'l14-5',
      title: 'Cost Center Accounting (CCA)',
      duration: 20,
      details: {
        tCode: 'KS01 (Create), KSB1 (Report)',
        sproPath: 'N/A',
        definition: 'A Cost Center is a location, department, or area where costs are incurred. It is a fundamental cost object for tracking expenses.',
        purpose: 'To manage and analyze costs for different functional areas (e.g., Marketing Dept, HR Dept), which is essential for departmental budgeting and variance analysis.',
        configurationSteps: ['Create a Cost Center master record in KS01, assigning it to the controlling area and a cost center category.'],
        integrationNotes: 'Cost centers are the most common account assignment object for expense postings.',
        updatesS4HANA: 'Cost Center Accounting is still a core component. Reporting is significantly enhanced with Fiori analytical apps that read directly from the Universal Journal.',
      },
    },
    {
      id: 'l14-6',
      title: 'Profit Center Accounting (PCA)',
      duration: 20,
      details: {
        tCode: 'KE51 (Create)',
        sproPath: 'N/A',
        definition: 'A Profit Center is an organizational unit treated as a "company within the company" used to analyze both costs and revenues.',
        purpose: 'To evaluate the profit or loss of individual, independent areas within an organization, allowing management to assess the performance of different business lines.',
        configurationSteps: ['Create a Profit Center master record in KE51 within a controlling area.'],
        integrationNotes: 'With New G/L and document splitting active, profit centers are updated in real-time, enabling the creation of full financial statements at the profit center level.',
        updatesS4HANA: 'Profit Center Accounting is a standard feature of the Universal Journal. The Profit Center field is part of the ACDOCA table, making real-time PCA inherent to the system. The configuration of document splitting for Profit Centers is therefore critical.',
      },
    }
  ],
  quiz: {
    id: 'fico-q14',
    title: 'Controlling Quiz',
    questions: [
      { question: 'In S/4HANA, where are CO actual postings stored?', options: ['In separate CO tables like COEP', 'In the Universal Journal (ACDOCA)', 'In the Controlling Area'], correctAnswer: 1 },
      { question: 'In S/4HANA, how are Primary Cost Elements created?', options: ['Using T-Code KA01', 'As a G/L Account in FS00 with the type "Primary Costs"', 'In the Controlling Area settings (OKKP)'], correctAnswer: 1 },
      { question: 'A Cost Center is primarily used to track what?', options: ['Revenues', 'Costs/Expenses', 'Balance Sheet items'], correctAnswer: 1 },
      { question: 'Which CO object is used to analyze both costs and revenues to determine profitability?', options: ['Cost Element', 'Profit Center', 'Internal Order'], correctAnswer: 1 },
    ]
  }
};