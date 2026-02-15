import type { Chapter } from '../../../types';

export const CHAPTER_1_INTRODUCTION: Chapter = {
  id: 'ch1',
  title: '1. Introduction',
  lessons: [
    {
      id: 'l1-1',
      title: 'ERP Overview',
      duration: 10,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'SAP (Systems, Applications, and Products in Data Processing) is a leading Enterprise Resource Planning (ERP) software that integrates key business functions of an organization.',
        purpose: 'To provide a centralized system that allows departments to share data and work together seamlessly, improving efficiency and data accuracy across the entire business.',
        configurationSteps: [],
        integrationNotes: 'The core strength of an ERP like SAP is its real-time integration between modules (e.g., a sales order in SD automatically checks inventory in MM and prepares billing in FI).',
        updatesS4HANA: 'S/4HANA is the latest generation ERP, built on the in-memory SAP HANA database. It offers a simplified data model, a new user experience with SAP Fiori, and advanced real-time analytics capabilities not possible in older ECC systems.',
      },
    },
     {
      id: 'l1-2',
      title: 'SAP Architecture',
      duration: 15,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'Classic SAP ERP (like ECC) follows a three-tier client-server architecture: Presentation Layer (SAP GUI), Application Layer (where business logic is executed), and Database Layer (where data is stored).',
        purpose: 'This architecture separates user interface, business processing, and data storage, which allows for scalability, flexibility, and platform independence. Each layer can be managed and scaled separately.',
        configurationSteps: [],
        integrationNotes: 'The Application Layer is where all the processing and ABAP code runs. It communicates with both the database to fetch/store data and the presentation layer to display it to the user.',
        updatesS4HANA: 'While the three-tier concept remains, the Database Layer is now the SAP HANA in-memory database, which dramatically accelerates data processing and enables real-time analytics directly on transactional data.',
      },
    },
    {
      id: 'l1-3',
      title: 'ASAP vs Activate Methodology',
      duration: 15,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'ASAP (Accelerated SAP) was the traditional, waterfall-based implementation methodology for SAP ECC. SAP Activate is the modern, agile methodology used for S/4HANA implementations.',
        purpose: 'To provide a structured roadmap for SAP projects. Activate is more flexible and iterative, designed for faster deployments, especially for cloud solutions.',
        configurationSteps: [
            'ASAP Phases: 1. Project Preparation, 2. Business Blueprint, 3. Realization, 4. Final Preparation, 5. Go-Live & Support.',
            'Activate Phases: 1. Discover, 2. Prepare, 3. Explore, 4. Realize, 5. Deploy, 6. Run.',
        ],
        integrationNotes: 'N/A',
        updatesS4HANA: 'SAP Activate is the standard methodology for all S/4HANA projects (Cloud and On-Premise). It emphasizes using pre-configured "Best Practices" to accelerate the "Explore" phase.',
      },
    },
     {
      id: 'l1-4',
      title: 'Role of a Functional Consultant',
      duration: 10,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'A SAP Functional Consultant is a business process expert who specializes in a specific SAP module (like FICO). They are responsible for understanding business requirements, configuring the SAP system to meet those needs, and testing the solution.',
        purpose: 'To bridge the gap between business processes and the SAP system. They analyze business needs, design solutions within SAP, customize the system (configuration), and guide the business through implementation.',
        configurationSteps: [],
        integrationNotes: 'The consultant must understand how their module integrates with others. For example, a FICO consultant must know how MM and SD transactions generate financial postings.',
        updatesS4HANA: 'In S/4HANA projects, the consultant\'s role is more focused on leveraging standard Fiori apps and guiding clients through SAP Best Practices, rather than building custom solutions from scratch.',
      },
    },
    {
      id: 'l1-5',
      title: 'Core Functional Modules Overview',
      duration: 10,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'SAP is composed of various functional modules that are integrated. Key modules include: FICO (Finance & Controlling), SD (Sales & Distribution), MM (Materials Management), PP (Production Planning), and HCM (Human Capital Management).',
        purpose: 'Each module addresses specific business functions, but their power comes from integration. For example, a sales transaction in SD automatically triggers postings in MM and FICO.',
        configurationSteps: [],
        integrationNotes: 'The tight integration ensures a "single source of truth" for all business data, which is a core value proposition of SAP.',
        updatesS4HANA: 'In S/4HANA, some modules are replaced or merged. For example, HCM is evolving into SuccessFactors, and CRM functionalities are embedded within the S/4HANA core.',
      },
    },
    {
      id: 'l1-6',
      title: 'Introduction to Finance Module',
      duration: 15,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'SAP FICO is a core functional module in SAP ERP that covers Financial Accounting (FI) and Controlling (CO). FI deals with external reporting (balance sheets, profit & loss statements), while CO handles internal reporting (cost analysis, profitability).',
        purpose: 'To manage all financial transactions and data for an enterprise. FICO helps generate accurate financial statements and provides powerful tools for internal cost management and analysis.',
        configurationSteps: [],
        integrationNotes: 'FICO is the ultimate recipient of financial data from almost all other modules like SD, MM, PP, and HR.',
        updatesS4HANA: 'In S/4HANA, FI and CO are merged into a single data table called the Universal Journal (ACDOCA). This eliminates data redundancy and the need for reconciliation, enabling real-time reporting across both financial and management accounting.',
      },
    },
     {
      id: 'l1-7',
      title: 'Integration in SAP',
      duration: 15,
      details: {
        tCode: 'OBYC, VKOA',
        sproPath: 'N/A',
        definition: 'Integration in SAP refers to the automated flow of information between different modules. When a business process is executed, the system automatically creates transactions and updates data across all relevant functional areas.',
        purpose: 'To eliminate redundant data entry, ensure data consistency, and provide a real-time, holistic view of the business. For example, when a goods receipt is posted in MM, inventory levels are updated, and a financial document is automatically posted in FI.',
        configurationSteps: [
            'FI-MM Integration is configured mainly in T-Code OBYC.',
            'FI-SD Integration is configured mainly in T-Code VKOA.',
        ],
        integrationNotes: 'The key integration points are configured through account determination settings which map logistic transactions to the correct G/L accounts in Finance.',
        updatesS4HANA: 'The integration concept is still fundamental in S/4HANA, but the underlying data model is simplified. The Universal Journal (ACDOCA) now holds all the details from logistics documents, making reporting across modules much more powerful.',
      },
    },
  ],
  quiz: {
    id: 'fico-q1',
    title: 'Introduction Quiz',
    questions: [
      { question: 'What is the modern implementation methodology for S/4HANA?', options: ['ASAP', 'Activate', 'Waterfall'], correctAnswer: 1 },
      { question: 'What is the name of the new, single data table for FI and CO in S/4HANA?', options: ['BSEG', 'FAGLFLEXT', 'ACDOCA (Universal Journal)'], correctAnswer: 2 },
      { question: 'What are the two main components of FICO?', options: ['Sales and Distribution', 'Financial Accounting and Controlling', 'Materials Management and Finance'], correctAnswer: 1 },
      { question: 'Which T-Code is central to FI-MM integration?', options: ['VKOA', 'OBYC', 'FBZP'], correctAnswer: 1 },
    ]
  }
};