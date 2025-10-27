
import type { Chapter } from '../../../types';

export const CHAPTER_14_REPORTING: Chapter = {
  id: 'ch14',
  title: '14. SD Reporting & Analytics',
  lessons: [
    {
        id: 'l14-1',
        title: 'Standard SD Reports (List Displays)',
        duration: 15,
        details: {
            tCode: 'VA05 (Sales Orders), VL06O (Deliveries), VF05 (Billing Docs)',
            sproPath: 'N/A',
            definition: 'SAP provides a wide range of standard list reports for monitoring and analyzing sales documents.',
            purpose: 'To provide operational reporting capabilities, allowing users to list open documents, track statuses, and find specific transactions.',
            configurationSteps: [
                ' - <b>VA05 / VA05N:</b> List of Sales Orders',
                ' - <b>VL06O:</b> Outbound Delivery Monitor',
                ' - <b>VF05 / VF05N:</b> List of Billing Documents',
                ' - <b>V.25:</b> List of Incomplete Sales Documents',
            ],
            integrationNotes: 'These reports are useful for day-to-day operations but have limited analytical capabilities.',
            updatesS4HANA: 'While these transactions are still available, Fiori apps are the recommended tool for operational reporting in S/4HANA as they offer a better user experience and real-time insights.',
        },
    },
    {
        id: 'l14-2',
        title: 'S/4HANA Analytics (Fiori Apps)',
        duration: 20,
        details: {
            tCode: 'Fiori Launchpad',
            sproPath: 'N/A',
            definition: 'S/4HANA provides a suite of Fiori analytical apps that leverage the power of the HANA database and the simplified data model to offer real-time, multi-dimensional reporting and dashboards.',
            purpose: 'To provide deep insights into the sales process, enabling managers to monitor KPIs, identify bottlenecks, and make data-driven decisions on the fly.',
            configurationSteps: [
                'Key Fiori Analytical Apps for SD include:',
                ' - <b>Sales Order Fulfillment Issues:</b> Identifies and helps resolve issues blocking sales orders from being delivered and billed.',
                ' - <b>Sales Performance:</b> Provides KPIs and drill-down analysis on sales volume, profit margins, etc.',
                ' - <b>Sales Order Monitor:</b> A modern, powerful way to track and manage sales orders.',
            ],
            integrationNotes: 'These apps are built on Core Data Services (CDS) views, which perform all the data aggregation and calculations directly in the HANA database for maximum performance.',
            updatesS4HANA: 'This is the strategic direction for all reporting and analytics in SAP. It replaces the need for the older Logistics Information System (LIS).',
        },
    },
  ],
  quiz: {
    id: 'sd-q14',
    title: 'Reporting Quiz',
    questions: [
      { question: 'Which transaction code is used to list sales orders?', options: ['VL06O', 'VA05', 'VF05'], correctAnswer: 1 },
      { question: 'What is the underlying technology that powers S/4HANA Fiori analytical apps?', options: ['ABAP List Viewer (ALV)', 'Logistics Information System (LIS)', 'Core Data Services (CDS) Views'], correctAnswer: 2 },
      { question: 'What is the purpose of the "Sales Order Fulfillment Issues" Fiori app?', options: ['To create new sales orders', 'To identify and resolve bottlenecks in the O2C process', 'To set pricing'], correctAnswer: 1 },
    ]
  }
};
