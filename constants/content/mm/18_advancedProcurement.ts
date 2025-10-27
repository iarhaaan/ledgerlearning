import type { Chapter } from '../../../types';

export const CHAPTER_19_ADVANCED_PROCUREMENT: Chapter = {
  id: 'ch19',
  title: '19. Advanced Inventory & Procurement',
  lessons: [
    {
      id: 'l19-1',
      title: 'Service Procurement',
      duration: 30,
      details: {
        tCode: 'AC01 (Service Master), ME21N (PO)',
        sproPath: 'N/A',
        definition: 'Service Procurement deals with the purchasing of non-material services, such as consulting, maintenance, or cleaning services. Instead of a material master, it uses a Service Master Record.',
        purpose: 'To provide a structured process for procuring, tracking, and paying for intangible services.',
        configurationSteps: [
          '1. <b>Create Service Master (AC01):</b> Define the service with a description and unit of measure (e.g., hours).',
          '2. <b>Create Purchase Order (ME21N):</b> Create a PO with Item Category "D" (Service). Instead of a material, you enter the service details in the "Services" tab.',
          '3. <b>Create Service Entry Sheet (ML81N):</b> This is the equivalent of a Goods Receipt for services. It is a document where the vendor\'s performance of the service is confirmed.',
          '4. <b>Accept Service Entry Sheet:</b> Accepting the SES generates an accounting document similar to a GR.',
          '5. <b>Invoice Verification (MIRO):</b> The invoice is posted with reference to the PO or Service Entry Sheet.',
        ],
        integrationNotes: 'The Service Entry Sheet is a critical document that acts as proof of service delivery and is the basis for payment.',
        updatesS4HANA: 'The process is largely the same. S/4HANA offers Fiori apps for "Lean Services" which provide a more streamlined procurement process for simple services.',
      },
    },
    {
      id: 'l19-2',
      title: 'Special Stocks Overview',
      duration: 20,
      details: {
        tCode: 'MMBE (Stock Overview)',
        sproPath: 'N/A',
        definition: 'Special Stocks are types of inventory that are managed separately from a company\'s own standard, unrestricted stock. They have unique ownership or location characteristics.',
        purpose: 'To handle specific logistics scenarios that require separate inventory management.',
        configurationSteps: [
          'Common types of Special Stock seen in MMBE:',
          ' - <b>Vendor Consignment (K):</b> Stock that is physically at your plant but still owned by the vendor.',
          ' - <b>Stock Transport Order Stock (U):</b> Stock that is in transit between two plants.',
          ' - <b>Customer Consignment (W):</b> Your company\'s stock that is physically located at a customer\'s site.',
          ' - <b>Subcontracting Stock (O):</b> Your company\'s components that have been provided to a subcontracting vendor.',
          ' - <b>Sales Order Stock (E):</b> Stock that is specifically reserved for a single sales order.',
        ],
        integrationNotes: 'Each special stock type is managed with specific movement types and processes.',
        updatesS4HANA: 'These special stock indicators are fully integrated into the S/4HANA inventory data model (table MATDOC).',
      },
    },
    {
      id: 'l19-3',
      title: 'Batch Management',
      duration: 25,
      details: {
        tCode: 'MSC1N (Create Batch)',
        sproPath: 'Logistics - General > Batch Management',
        definition: 'Batch Management is used to manage and track materials that are produced or procured in discrete quantities or "batches". Each batch is given a unique number that identifies it throughout its lifecycle.',
        purpose: 'To provide traceability, which is a legal requirement in many industries like pharmaceuticals, food, and chemicals. It allows a company to trace a product from the raw material batch to the finished good batch delivered to a customer.',
        configurationSteps: [
          '1. Activate Batch Management in the Material Master (Purchasing or Plant data view).',
          '2. Configure if batch numbers are assigned externally or internally.',
          '3. During Goods Receipt, the system will require a batch number to be entered or will assign one automatically.',
          '4. This batch number is then tracked through all subsequent inventory movements.',
        ],
        integrationNotes: 'Batch Management is deeply integrated with MM, PP, SD, and QM (Quality Management). For example, a quality inspection can be performed on a specific batch.',
        updatesS4HANA: 'Batch Management functionality is the same, but S/4HANA offers enhanced analytics and Fiori apps for tracking and managing batches ("Batch Information Cockpit").',
      },
    }
  ],
  quiz: {
    id: 'mm-q19',
    title: 'Advanced Procurement Quiz',
    questions: [
      { question: 'What is the equivalent of a Goods Receipt in the Service Procurement process?', options: ['Service Master', 'Service Purchase Order', 'Service Entry Sheet'], correctAnswer: 2 },
      { question: 'What does the special stock indicator "K" signify?', options: ['Customer Consignment', 'Vendor Consignment', 'Subcontracting Stock'], correctAnswer: 1 },
      { question: 'What is the primary business reason for using Batch Management?', options: ['To simplify pricing', 'To provide traceability', 'To speed up goods receipt'], correctAnswer: 1 },
    ]
  }
};
