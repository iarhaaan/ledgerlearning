import type { Chapter } from '../../../types';

export const CHAPTER_1_INTRODUCTION: Chapter = {
  id: 'ch1',
  title: '1. Introduction to SAP SD',
  lessons: [
    {
      id: 'l1-1',
      title: 'ERP & SD Overview',
      duration: 10,
      details: {
        definition: 'SAP Sales and Distribution (SD) is a core functional module in SAP ERP that manages all processes in the sales and distribution of goods and services.',
        purpose: 'To handle the entire Order-to-Cash (O2C) cycle, from a customer inquiry to the final payment receipt. It is tightly integrated with other modules like MM, PP, and FICO.',
        updatesS4HANA: 'In S/4HANA, the SD module is referred to as "Sales" within the "Line of Business (LoB)" context. While the core processes are the same, S/4HANA introduces significant changes like the mandatory Business Partner, Advanced ATP, and a simplified data model for better performance and real-time analytics.',
      },
    },
    {
      id: 'l1-2',
      title: 'The Order-to-Cash (O2C) Cycle',
      duration: 15,
      details: {
        definition: 'The O2C cycle is the end-to-end business process that covers all activities from receiving a customer order to the point where the company receives payment.',
        purpose: 'To provide a structured flow for all sales activities, ensuring efficiency and accuracy.',
        configurationSteps: [
            '1. <b>Pre-Sales Activities:</b> Inquiry and Quotation.',
            '2. <b>Sales Order Processing:</b> Creating the sales order, which is the central document.',
            '3. <b>Inventory Sourcing / Availability Check (ATP):</b> Checking if the goods are available.',
            '4. <b>Delivery & Shipping:</b> Creating the outbound delivery and picking, packing, and shipping the goods (Post Goods Issue).',
            '5. <b>Billing:</b> Creating and sending the invoice to the customer.',
            '6. <b>Payment:</b> Receiving and processing the payment from the customer (an Accounts Receivable process in FI).',
        ],
        integrationNotes: 'Each step of the O2C cycle has integration points with other modules. For example, ATP integrates with MM, and Billing integrates with FICO.',
      },
    },
    {
      id: 'l1-3',
      title: 'Role of an SD Consultant',
      duration: 10,
      details: {
        definition: 'An SAP SD Functional Consultant is a business process expert who specializes in the Order-to-Cash cycle. They are responsible for understanding sales and distribution requirements, configuring the SAP system to meet those needs, and testing the solution.',
        purpose: 'To bridge the gap between business sales processes and the SAP SD module. They analyze business needs, design solutions, customize the system (configuration), test, and provide support.',
        integrationNotes: 'A key skill is understanding the integration points with MM (for stock availability), FI (for billing and receivables), and CO (for profitability).',
        updatesS4HANA: 'In S/4HANA projects, the SD consultant must also be an expert in the new mandatory components like the Business Partner model, Advanced ATP, and the configuration of Fiori apps for sales processes.',
      }
    },
    {
      id: 'l1-4',
      title: 'SAP GUI vs Fiori Navigation',
      duration: 15,
      details: {
        definition: 'SAP GUI (Graphical User Interface) is the classic, desktop-based interface for interacting with SAP. SAP Fiori is the modern, web-based user experience (UX) designed to be role-based, responsive, and simple.',
        purpose: 'To provide users with the tools to perform their tasks in the SAP system.',
        configurationSteps: [
          '<b>SAP GUI:</b> Transaction-code based. Users navigate by entering T-codes (e.g., VA01) into a command field.',
          '<b>SAP Fiori:</b> App-based. Users access apps from a personalized Launchpad. Apps are categorized by role (e.g., "Internal Sales Rep") and function (e.g., "Create Sales Order").',
        ],
        integrationNotes: 'Fiori apps communicate with the S/4HANA backend using OData services.',
        updatesS4HANA: 'Fiori is the standard user interface for S/4HANA. While the classic SAP GUI is still available for many back-end functions, the strategic direction is to use Fiori for all user-facing activities.'
      }
    }
  ],
  quiz: {
    id: 'sd-q1',
    title: 'Introduction to SD Quiz',
    questions: [
      { question: 'What is the full business process managed by SAP SD?', options: ['Procure-to-Pay', 'Order-to-Cash', 'Record-to-Report'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the modern, web-based user experience called?', options: ['SAP GUI', 'SAP Fiori', 'SAP Portal'], correctAnswer: 1 },
      { question: 'What is the primary communication protocol used by Fiori apps to talk to the S/4HANA backend?', options: ['RFC', 'OData', 'IDoc'], correctAnswer: 1 },
    ]
  }
};