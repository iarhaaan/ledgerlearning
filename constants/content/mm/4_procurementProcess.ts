import type { Chapter } from '../../../types';

export const CHAPTER_4_PROCUREMENT_PROCESS: Chapter = {
  id: 'ch4',
  title: '4. The Procurement Process',
  lessons: [
    {
      id: 'l4-1',
      title: 'Purchase Requisition (PR)',
      duration: 15,
      details: {
        tCode: 'ME51N',
        definition: 'A Purchase Requisition is an internal document that notifies the purchasing department of a need for materials or services.',
        purpose: 'To initiate the procurement process. It can be created manually by a user or automatically by the MRP run.',
        updatesS4HANA: 'ME51N is still available. Fiori apps like "Manage Purchase Requisitions" offer a modern UI and approval workflows.',
      },
    },
    {
      id: 'l4-2',
      title: 'Request for Quotation (RFQ) & Quotation',
      duration: 15,
      details: {
        tCode: 'ME41 (RFQ), ME47 (Quotation)',
        definition: 'An RFQ is a request sent to vendors to submit a quotation for materials or services. The vendor\'s response is recorded as a Quotation.',
        purpose: 'To compare prices and conditions from multiple vendors to select the best source.',
        updatesS4HANA: 'These processes are now often managed through SAP Ariba for more strategic sourcing.',
      },
    },
    {
      id: 'l4-3',
      title: 'Purchase Order (PO)',
      duration: 20,
      details: {
        tCode: 'ME21N',
        definition: 'A Purchase Order is a formal, legally binding document sent to a vendor to order materials or services.',
        purpose: 'To commit the company to a purchase. It specifies quantities, prices, delivery dates, and other terms.',
        integrationNotes: 'A PO can be created with reference to a PR, RFQ, or contract.',
        updatesS4HANA: 'ME21N is still a core transaction. Fiori apps like "Manage Purchase Orders" provide advanced monitoring and analytical capabilities.',
      },
    },
    {
      id: 'l4-4',
      title: 'Release Procedure (Approval)',
      duration: 15,
      details: {
        definition: 'The Release Procedure is a workflow process for approving purchasing documents (like PRs and POs) before they are sent to a vendor.',
        purpose: 'To ensure financial control and compliance by requiring management approval for purchases, often based on value.',
        updatesS4HANA: 'Flexible Workflow is the new, modern way to configure approvals in S/4HANA, managed through Fiori apps and offering more dynamic rule-setting.',
      },
    },
  ],
  quiz: {
    id: 'mm-q4',
    title: 'Procurement Process Quiz',
    questions: [
      { question: 'Which document is an internal request to the purchasing department?', options: ['Purchase Order', 'RFQ', 'Purchase Requisition'], correctAnswer: 2 },
      { question: 'What is the transaction code to create a Purchase Order?', options: ['ME51N', 'ME21N', 'ME41'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the modern technology for managing approval workflows?', options: ['Release Strategy', 'User Exits', 'Flexible Workflow'], correctAnswer: 2 },
    ]
  }
};
