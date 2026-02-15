import type { Chapter } from '../../../types';

export const CHAPTER_4_SALES_PROCESS: Chapter = {
  id: 'ch4',
  title: '4. The Sales Process & Documents',
  lessons: [
    {
      id: 'l4-1',
      title: 'Inquiry & Quotation (Pre-Sales)',
      duration: 20,
      details: {
        tCode: 'VA11 (Inquiry), VA21 (Quotation)',
        sproPath: 'N/A',
        definition: 'Pre-sales activities occur before a customer places a firm order. An Inquiry is a customer\'s request for information about products or services. A Quotation is a legally binding offer to a customer for the supply of goods or services under specific fixed conditions.',
        purpose: 'To track initial customer contacts and to provide binding offers that can later be converted into sales orders, streamlining the order entry process.',
        configurationSteps: [
          'An Inquiry is created (e.g., document type IN).',
          'A Quotation can be created with reference to an Inquiry (e.g., document type QT).',
          'A Sales Order can then be created with reference to the Quotation, copying all the agreed-upon data like materials, quantities, and prices.'
        ],
        integrationNotes: 'Quotations have a validity period and, upon acceptance, provide a seamless transition to a sales order.',
        updatesS4HANA: 'These transactions are still available. Fiori apps like "Manage Inquiries" and "Manage Quotations" offer a modern user experience for these pre-sales activities.',
      },
    },
    {
        id: 'l4-2',
        title: 'Sales Order Types & Structure',
        duration: 20,
        details: {
            tCode: 'VOV8',
            sproPath: 'Sales and Distribution > Sales > Sales Documents > Sales Document Header > Define Sales Document Types',
            definition: 'The Sales Document Type is a key that controls how a sales document behaves. It is the first thing a user selects when creating a sales document. A document consists of Header, Item, and Schedule Line levels.',
            purpose: 'To differentiate between various business transactions. Examples: OR (Standard Order), QT (Quotation), RE (Returns). It controls the number range, which screens appear, whether a delivery is required, and much more.',
            configurationSteps: ['In VOV8, you can create new sales document types (usually by copying a standard one) and maintain dozens of control parameters.'],
            integrationNotes: 'The sales document type is a central control element for the entire sales process.',
            updatesS4HANA: 'The configuration remains in VOV8 and is just as critical in S/4HANA.',
        },
    },
    {
        id: 'l4-3',
        title: 'Item Categories',
        duration: 20,
        details: {
            tCode: 'VOV7',
            sproPath: 'Sales and Distribution > Sales > Sales Documents > Sales Document Item > Define Item Categories',
            definition: 'The Item Category controls how a line item in a sales document behaves.',
            purpose: 'To differentiate how different materials are handled within the same sales order. Examples: TAN (Standard Item, relevant for delivery and billing), TANN (Free of Charge Item, delivery relevant, not billing relevant). It controls if the item is relevant for pricing, delivery, billing, etc.',
            integrationNotes: 'The system determines the Item Category automatically based on the Sales Document Type and the Item Category Group from the material master.',
            updatesS4HANA: 'The configuration and determination logic are unchanged in S/4HANA.',
        },
    },
    {
        id: 'l4-4',
        title: 'Schedule Lines',
        duration: 20,
        details: {
            tCode: 'VOV6',
            sproPath: 'Sales and Distribution > Sales > Sales Documents > Schedule Lines > Define Schedule Line Categories',
            definition: 'The Schedule Line Category controls the logistics of a sales document item. Each item can have multiple schedule lines, for example, if a delivery is split.',
            purpose: 'To control details about delivery dates and quantities. Crucially, it determines whether an availability check is performed and whether requirements are passed to MRP. It also specifies the movement type for the goods issue.',
            integrationNotes: 'This is a key integration point with MM/PP. The movement type (e.g., 601 for goods issue for delivery) is a core MM setting.',
            updatesS4HANA: 'The configuration and determination logic are unchanged in S/4HANA.',
        },
    },
    {
        id: 'l4-5',
        title: 'Creating a Sales Order',
        duration: 15,
        details: {
            tCode: 'VA01',
            sproPath: 'N/A',
            definition: 'The Sales Order is the central document in SD. It is a contractual agreement between a sales organization and a customer for the supply of goods or services at agreed-upon prices, quantities, and times.',
            purpose: 'To capture all the information needed to process a customer\'s request.',
            configurationSteps: ['In VA01, the user enters the customer, material, and quantity. The system automatically determines most other data (pricing, delivery dates, partner information) from the master data and configuration.'],
            integrationNotes: 'Saving a sales order triggers many downstream processes, such as the availability check and the transfer of requirements to MRP.',
            updatesS4HANA: 'VA01 is still available. The Fiori app "Create Sales Orders - VA01" provides a modern, role-based user experience.',
        },
    },
  ],
  quiz: {
    id: 'sd-q4',
    title: 'Sales Process Quiz',
    questions: [
      { question: 'Which document is a legally binding offer to a customer?', options: ['Inquiry', 'Sales Order', 'Quotation'], correctAnswer: 2 },
      { question: 'Which configuration object controls the overall behavior of a sales document, like its number range?', options: ['Item Category', 'Sales Document Type', 'Schedule Line Category'], correctAnswer: 1 },
      { question: 'The system determines the Item Category based on the Sales Document Type and what other field?', options: ['The Material Group from the material master', 'The Item Category Group from the material master', 'The Customer Group from the customer master'], correctAnswer: 1 },
      { question: 'Which configuration object controls whether requirements are passed to MRP?', options: ['Item Category', 'Sales Document Type', 'Schedule Line Category'], correctAnswer: 2 },
    ]
  }
};