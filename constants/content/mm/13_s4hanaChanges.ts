import type { Chapter } from '../../../types';

export const CHAPTER_14_S4HANA_CHANGES: Chapter = {
  id: 'ch14',
  title: '14. Key S/4HANA Changes in MM',
  lessons: [
    {
      id: 'l14-1',
      title: 'Mandatory Business Partner (BP)',
      duration: 15,
      details: {
        tCode: 'BP',
        definition: 'In S/4HANA, the Business Partner (BP) is the single, mandatory point of entry for maintaining vendor and customer master data. Classic transactions like XK01 are obsolete.',
        purpose: 'To provide a harmonized data model and eliminate data redundancy.',
        updatesS4HANA: 'This is the most significant master data change for MM consultants.',
      },
    },
    {
      id: 'l14-2',
      title: 'Material Number Extension',
      duration: 10,
      details: {
        definition: 'The maximum length of the material number field has been extended from 18 to 40 characters.',
        purpose: 'To accommodate more descriptive or complex material numbering schemes.',
        updatesS4HANA: 'This is an optional feature that must be activated.',
      },
    },
    {
      id: 'l14-3',
      title: 'Mandatory Material Ledger',
      duration: 15,
      details: {
        definition: 'The Material Ledger (ML) is mandatory in S/4HANA. It is no longer an optional component.',
        purpose: 'To provide actual costing and parallel currency valuation capabilities for materials, which is a core feature of S/4HANA Finance.',
        updatesS4HANA: 'Understanding the Material Ledger is now a required skill for MM consultants.',
      },
    },
    {
      id: 'l14-4',
      title: 'MRP Live',
      duration: 15,
      details: {
        tCode: 'MD01N',
        definition: 'MRP Live is the new, performance-optimized MRP run designed for the HANA database.',
        purpose: 'To perform planning runs significantly faster, enabling more frequent planning cycles and real-time decision making.',
        updatesS4HANA: 'This is the strategic MRP tool, although classic MRP transactions are still available for specific scenarios not covered by MRP Live.',
      },
    },
  ],
  quiz: {
    id: 'mm-q14',
    title: 'S/4HANA Changes Quiz',
    questions: [
      { question: 'What is the mandatory transaction for vendor master data in S/4HANA?', options: ['XK01', 'BP', 'MK01'], correctAnswer: 1 },
      { question: 'Which component is now mandatory for material valuation in S/4HANA?', options: ['Material Ledger', 'Classic G/L', 'Special Purpose Ledger'], correctAnswer: 0 },
      { question: 'The material number can be extended to how many characters in S/4HANA?', options: ['20', '30', '40'], correctAnswer: 2 },
    ]
  }
};
