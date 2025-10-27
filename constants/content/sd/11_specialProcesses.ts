
import type { Chapter } from '../../../types';

export const CHAPTER_11_SPECIAL_PROCESSES: Chapter = {
  id: 'ch11',
  title: '11. Special Business Processes',
  lessons: [
    {
        id: 'l11-1',
        title: 'Consignment Process',
        duration: 20,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'In a consignment process, the company sends goods to a customer (the consignee), but the company retains ownership of the goods. The customer only pays for the goods after they have sold or used them.',
            purpose: 'To allow customers to have stock available without owning it, which can be a competitive advantage.',
            configurationSteps: [
                '1. <b>Consignment Fill-up (CF):</b> Create a sales order to send goods to the customer\'s special stock. This does not involve billing.',
                '2. <b>Consignment Issue (CI):</b> When the customer reports selling the goods, create a sales order to issue the goods from consignment stock. This is relevant for billing.',
                '3. <b>Consignment Pick-up (CP):</b> Create a sales order to take back any unsold goods from the customer.',
                '4. <b>Consignment Returns (CR):</b> If the customer returns goods after they were sold, this process is used.',
            ],
            integrationNotes: 'The stock is managed as "special stock" at the customer\'s location and is still visible in the company\'s inventory.',
            updatesS4HANA: 'The process remains the same in S/4HANA.',
        },
    },
    {
        id: 'l11-2',
        title: 'Third-Party Order Processing',
        duration: 20,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'In a third-party process, the company receives a sales order from a customer but does not deliver the goods from its own stock. Instead, it places a purchase order with an external vendor, who then ships the goods directly to the customer.',
            purpose: 'To sell goods that the company does not stock itself, acting as a middleman.',
            configurationSteps: [
                '1. Create a sales order with a third-party item category (e.g., TAS).',
                '2. Saving the sales order automatically creates a purchase requisition in the background.',
                '3. Convert the purchase requisition to a purchase order and send it to the vendor.',
                '4. The vendor ships to the customer. They send an invoice to you.',
                '5. You post the vendor invoice (MIRO).',
                '6. You create a customer invoice (VF01) based on the sales order.',
            ],
            integrationNotes: 'This process is a tight integration between SD and MM. There is no delivery or goods issue from the company\'s own plant.',
            updatesS4HANA: 'The process remains the same in S/4HANA.',
        },
    },
  ],
  quiz: {
    id: 'sd-q11',
    title: 'Special Processes Quiz',
    questions: [
      { question: 'In which process does the company retain ownership of goods stored at the customer\'s site?', options: ['Third-Party', 'Consignment', 'Standard Order'], correctAnswer: 1 },
      { question: 'In a third-party order process, who ships the goods to the end customer?', options: ['Your company', 'The customer', 'An external vendor'], correctAnswer: 2 },
      { question: 'Which step in the consignment process is relevant for billing?', options: ['Consignment Fill-up', 'Consignment Issue', 'Consignment Pick-up'], correctAnswer: 1 },
    ]
  }
};
