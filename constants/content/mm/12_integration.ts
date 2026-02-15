import type { Chapter } from '../../../types';

export const CHAPTER_13_INTEGRATION: Chapter = {
  id: 'ch13',
  title: '13. MM Integration Points',
  lessons: [
    {
      id: 'l13-1',
      title: 'MM - FI Integration',
      duration: 20,
      details: {
        tCode: 'OBYC',
        definition: 'The integration between MM and FI ensures that all goods movements and invoice postings are reflected in the General Ledger.',
        purpose: 'To automate all financial postings related to materials management.',
        integrationNotes: 'The core of this integration is the automatic account determination (OBYC), which links material movements (via Valuation Class) to G/L accounts.',
        updatesS4HANA: 'The integration is even tighter in S/4HANA because the financial posting is part of the same Universal Journal entry as the material document details.',
      },
    },
    {
      id: 'l13-2',
      title: 'MM - SD Integration',
      duration: 15,
      details: {
        definition: 'The integration between MM and SD is crucial for order fulfillment.',
        purpose: 'To ensure sales orders can check stock availability and that shipping goods correctly reduces inventory.',
        integrationNotes: 'The Availability Check (ATP) in a sales order reads MM stock data. The Post Goods Issue (PGI) in a delivery is an MM transaction that reduces inventory.',
        updatesS4HANA: 'Advanced ATP (aATP) in S/4HANA provides even more powerful, real-time integration with inventory data.',
      },
    },
    {
      id: 'l13-3',
      title: 'MM - PP Integration',
      duration: 15,
      details: {
        definition: 'The integration between MM and Production Planning (PP) is essential for manufacturing.',
        purpose: 'To ensure that production orders have the necessary raw materials available and that the receipt of finished goods is correctly recorded.',
        integrationNotes: 'MRP in PP creates purchase requisitions in MM for raw materials. Goods issue in MM provides components to a production order. Goods receipt in MM receives the finished product from a production order.',
        updatesS4HANA: 'MRP Live streamlines the integration, allowing for faster planning cycles.',
      },
    },
  ],
  quiz: {
    id: 'mm-q13',
    title: 'Integration Quiz',
    questions: [
      { question: 'What is the key transaction for configuring MM-FI integration?', options: ['VKOA', 'OBYC', 'OKKP'], correctAnswer: 1 },
      { question: 'The Post Goods Issue for a sales delivery is an integration point between SD and which module?', options: ['FI', 'PP', 'MM'], correctAnswer: 2 },
    ]
  }
};
