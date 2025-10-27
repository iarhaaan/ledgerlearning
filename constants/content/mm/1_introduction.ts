import type { Chapter } from '../../../types';

export const CHAPTER_1_INTRODUCTION: Chapter = {
  id: 'ch1',
  title: '1. Introduction to SAP MM',
  lessons: [
    {
      id: 'l1-1',
      title: 'ERP & MM Overview',
      duration: 10,
      details: {
        definition: 'SAP Materials Management (MM) is a core functional module in SAP ERP that manages procurement activities and inventory management.',
        purpose: 'To ensure a consistent supply of materials for the company\'s operations, manage inventory levels efficiently, and handle the procurement of goods and services from vendors.',
        updatesS4HANA: 'In S/4HANA, the MM module is part of the "Sourcing and Procurement" Line of Business. Key changes include the mandatory Business Partner for vendors, a simplified data model, and powerful Fiori-based analytics.',
      },
    },
    {
      id: 'l1-2',
      title: 'The Procure-to-Pay (P2P) Cycle',
      duration: 15,
      details: {
        definition: 'The P2P cycle is the end-to-end business process that covers all activities from identifying a need for a material to the final payment to the vendor.',
        purpose: 'To provide a structured flow for all procurement activities.',
        configurationSteps: [
            '1. <b>Determination of Requirements:</b> Identifying a need, often via MRP.',
            '2. <b>Source Determination:</b> Finding a suitable vendor.',
            '3. <b>Vendor Selection & PO Processing:</b> Creating and sending a Purchase Order (PO).',
            '4. <b>Goods Receipt:</b> Receiving the materials from the vendor.',
            '5. <b>Invoice Verification:</b> Verifying the vendor\'s invoice.',
            '6. <b>Payment Processing:</b> Paying the vendor (an Accounts Payable process in FI).',
        ],
        integrationNotes: 'The P2P cycle has critical integration points with FI (for payments), SD (for sales-driven procurement), and PP (for production requirements).',
      },
    },
    {
      id: 'l1-3',
      title: 'S/4HANA Architecture Basics',
      duration: 15,
      details: {
        definition: 'SAP S/4HANA is built on the advanced in-memory SAP HANA database. Its architecture is designed for performance and a simplified data model.',
        purpose: 'To enable real-time processing and analytics on live transactional data, eliminating the separation between OLTP (transactional) and OLAP (analytical) systems.',
        configurationSteps: [
          '<b>Key Principles:</b>',
          ' - <b>In-Memory Database:</b> All data is held in main memory (RAM) for fastest possible access.',
          ' - <b>Columnar Store:</b> Data is stored in columns, which is highly efficient for aggregation and analytics.',
          ' - <b>Simplified Data Model:</b> Many aggregate and index tables are removed. For example, in MM, the MATDOC table replaces MKPF and MSEG, simplifying inventory data management.',
        ],
        updatesS4HANA: 'This simplified architecture is the foundation for all the performance gains and real-time capabilities of S/4HANA.',
      },
    },
    {
      id: 'l1-4',
      title: 'Fiori Launchpad Navigation',
      duration: 15,
      details: {
        definition: 'The SAP Fiori Launchpad is the central, role-based entry point for all applications in S/4HANA. It provides a modern, intuitive, and personalized user experience.',
        purpose: 'To give users a simple, consistent interface to access the apps they need to perform their jobs, across any device.',
        configurationSteps: [
          '<b>Key Elements:</b>',
          ' - <b>Tiles:</b> Represent individual Fiori apps. Can display live data (e.g., number of open POs).',
          ' - <b>Groups:</b> Apps are organized into logical groups on the user\'s homepage.',
          ' - <b>App Finder:</b> Allows users to search for and add apps from the catalogs assigned to their role.',
          ' - <b>Personalization:</b> Users can create their own groups, rearrange tiles, and change themes.',
        ],
        integrationNotes: 'Fiori apps are assigned to users via security roles (PFCG) and Fiori Catalogs.',
      },
    }
  ],
  quiz: {
    id: 'mm-q1',
    title: 'Introduction to MM Quiz',
    questions: [
      { question: 'What is the full business process managed by SAP MM?', options: ['Order-to-Cash', 'Procure-to-Pay', 'Record-to-Report'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the key change to the inventory data model?', options: ['More index tables are added', 'The MATDOC table replaces many older tables', 'Data is stored in the application layer'], correctAnswer: 1 },
      { question: 'What is the central, role-based entry point in S/4HANA?', options: ['SAP Easy Access Menu', 'The command field', 'The Fiori Launchpad'], correctAnswer: 2 },
    ]
  }
};