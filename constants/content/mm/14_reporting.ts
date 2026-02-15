import type { Chapter } from '../../../types';

export const CHAPTER_15_REPORTING: Chapter = {
  id: 'ch15',
  title: '15. MM Reporting & Analytics',
  lessons: [
    {
      id: 'l15-1',
      title: 'Standard MM Reports',
      duration: 15,
      details: {
        tCode: 'MB51 (Material Docs), ME2N (POs)',
        definition: 'SAP provides many standard reports for analyzing purchasing and inventory data.',
        purpose: 'To provide operational reporting on transactions and stock levels.',
        configurationSteps: [
            ' - <b>ME2L/ME2N:</b> Purchase Orders by Vendor/PO Number',
            ' - <b>MB51:</b> Material Document List',
            ' - <b>MB5B:</b> Stock for Posting Date',
            ' - <b>MMBE:</b> Stock Overview',
        ],
        updatesS4HANA: 'These are still available, but Fiori analytical apps are the recommended tools.',
      },
    },
    {
      id: 'l15-2',
      title: 'S/4HANA Analytics (Fiori Apps)',
      duration: 20,
      details: {
        tCode: 'Fiori Launchpad',
        definition: 'S/4HANA provides a suite of Fiori analytical apps that offer real-time, multi-dimensional reporting and dashboards for procurement and inventory.',
        purpose: 'To provide deep insights into KPIs like purchasing spend, supplier performance, and inventory turnover.',
        configurationSteps: [
            'Key Fiori Apps for MM include:',
            ' - <b>Procurement Overview</b>',
            ' - <b>Monitor Purchase Order Items</b>',
            ' - <b>Inventory Analysis Overview</b>',
        ],
        updatesS4HANA: 'This is the strategic direction for analytics, replacing the older Logistics Information System (LIS).',
      },
    },
  ],
  quiz: {
    id: 'mm-q15',
    title: 'Reporting Quiz',
    questions: [
      { question: 'Which transaction provides a dynamic overview of stock for a single material across all organizational levels?', options: ['MB51', 'MMBE', 'ME2N'], correctAnswer: 1 },
      { question: 'What is the strategic technology for MM analytics in S/4HANA?', options: ['Logistics Information System (LIS)', 'ABAP Reports', 'Fiori Analytical Apps'], correctAnswer: 2 },
    ]
  }
};
