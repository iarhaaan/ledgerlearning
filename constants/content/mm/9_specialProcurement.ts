import type { Chapter } from '../../../types';

export const CHAPTER_9_SPECIAL_PROCUREMENT: Chapter = {
  id: 'ch9',
  title: '9. Special Procurement Types',
  lessons: [
    {
      id: 'l9-1',
      title: 'Consignment',
      duration: 15,
      details: {
        definition: 'In consignment, a vendor provides materials that are stored at your company, but the vendor retains ownership. You only pay for the materials when you withdraw them from consignment stock.',
        purpose: 'To reduce inventory holding costs, as you do not own the stock until you consume it.',
        updatesS4HANA: 'Process remains the same.',
      },
    },
    {
      id: 'l9-2',
      title: 'Subcontracting',
      duration: 20,
      details: {
        definition: 'In subcontracting, you send components to a vendor who uses them to manufacture a finished product, which they then send back to you. You pay the vendor for the service of assembly.',
        purpose: 'To outsource part of the manufacturing process.',
        integrationNotes: 'This process involves creating a subcontracting PO, providing components to the vendor (transfer posting), receiving the finished good, and reconciling the components consumed.',
        updatesS4HANA: 'Process remains the same.',
      },
    },
    {
      id: 'l9-3',
      title: 'Third-Party Processing',
      duration: 15,
      details: {
        definition: 'This process is initiated from a sales order (SD). Your company takes an order but has an external vendor ship the goods directly to the customer. From an MM perspective, this involves creating a PO for the vendor with the customer as the delivery address.',
        purpose: 'To sell goods that you do not stock.',
        updatesS4HANA: 'Process remains the same.',
      },
    },
    {
      id: 'l9-4',
      title: 'Stock Transport Order (STO)',
      duration: 20,
      details: {
        definition: 'A Stock Transport Order is a process for transferring materials from one plant to another within the same company or across company codes. It is handled like a purchase order, allowing the entire process to be monitored.',
        purpose: 'To manage and track internal stock movements with the formal structure of a procurement document. This allows for planning of goods issue and receipt, and management of stock in transit.',
        configurationSteps: [
            '1. <b>Create STO Purchase Order (ME21N):</b> Use a special document type (e.g., UB) and the receiving plant as the "vendor".',
            '2. <b>Goods Issue from Supplying Plant (MIGO):</b> The supplying plant issues the goods with reference to the STO. The stock is moved to "stock in transit".',
            '3. <b>Goods Receipt at Receiving Plant (MIGO):</b> The receiving plant posts a goods receipt with reference to the STO, moving the stock from "stock in transit" to their own inventory.',
        ],
        updatesS4HANA: 'The process remains a core logistics function in S/4HANA.',
      },
    },
  ],
  quiz: {
    id: 'mm-q9',
    title: 'Special Procurement Quiz',
    questions: [
      { question: 'In which process do you send components to a vendor for assembly?', options: ['Consignment', 'Third-Party', 'Subcontracting'], correctAnswer: 2 },
      { question: 'In which process do you only pay for materials when you use them, even though they are stored on your premises?', options: ['Consignment', 'Subcontracting', 'Stock Transfer'], correctAnswer: 0 },
      { question: 'Which document is used to formally manage a plant-to-plant stock transfer?', options: ['Standard Purchase Order', 'Stock Transport Order (STO)', 'Reservation'], correctAnswer: 1 },
    ]
  }
};
