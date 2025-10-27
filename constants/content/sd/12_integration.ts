
import type { Chapter } from '../../../types';

export const CHAPTER_12_INTEGRATION: Chapter = {
  id: 'ch12',
  title: '12. SD Integration Points',
  lessons: [
    {
        id: 'l12-1',
        title: 'SD - MM Integration',
        duration: 20,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'The integration between Sales & Distribution (SD) and Materials Management (MM) is critical for managing inventory and procurement in response to sales demand.',
            purpose: 'To ensure that the sales process is always in sync with the physical stock situation.',
            configurationSteps: [
                '1. <b>Availability Check (ATP):</b> When a sales order is created, SD checks with MM to see if the material is available in stock.',
                '2. <b>Transfer of Requirements:</b> Sales order quantities create requirements that are visible to MRP in MM/PP, driving procurement or production.',
                '3. <b>Post Goods Issue (PGI):</b> When goods are shipped, SD triggers an update in MM to reduce inventory levels. The Movement Type (e.g., 601) used for this is a key MM configuration point defined in the SD Schedule Line Category.',
                '4. <b>Third-Party/Individual Purchase Orders:</b> A sales order can automatically generate a purchase requisition in MM.',
            ],
            integrationNotes: 'The plant and storage location are organizational units shared between SD and MM.',
            updatesS4HANA: 'The integration is tighter in S/4HANA due to the unified data model, allowing for real-time inventory visibility and faster MRP runs (MRP Live).',
        },
    },
    {
        id: 'l12-2',
        title: 'SD - FI Integration',
        duration: 20,
        details: {
            tCode: 'VKOA, OBYC',
            sproPath: 'N/A',
            definition: 'The integration between SD and Financial Accounting (FI) ensures that all sales activities are correctly reflected in the company\'s financial statements.',
            purpose: 'To automate the posting of revenues, receivables, and cost of goods sold, ensuring data consistency between logistics and finance.',
            configurationSteps: [
                '1. <b>Billing:</b> When a customer invoice is created in SD (VF01), the system automatically generates an FI accounting document. This debits the customer reconciliation account and credits the revenue accounts. The G/L account for revenue is determined via VKOA.',
                '2. <b>Post Goods Issue (PGI):</b> This SD transaction triggers the posting of the Cost of Goods Sold (COGS) in FI/CO. The G/L accounts for COGS and inventory are determined via OBYC (the MM-FI setting).',
                '3. <b>Credit Management:</b> SD uses credit limits and customer account data from FI to perform credit checks.',
            ],
            integrationNotes: 'Account Determination (VKOA) is the most critical SD-FI configuration point.',
            updatesS4HANA: 'In S/4HANA, the billing document posting creates a single entry in the Universal Journal (ACDOCA), which contains all the SD, FI, and CO details in one place. This eliminates the need for FI-CO reconciliation.',
        },
    },
  ],
  quiz: {
    id: 'sd-q12',
    title: 'Integration Quiz',
    questions: [
      { question: 'Which SD transaction triggers the posting of Cost of Goods Sold (COGS)?', options: ['Sales Order Creation', 'Billing', 'Post Goods Issue'], correctAnswer: 2 },
      { question: 'What is the transaction code for Revenue Account Determination?', options: ['OBYC', 'VKOA', 'VOV8'], correctAnswer: 1 },
      { question: 'The availability check (ATP) is a key integration point between SD and which other module?', options: ['FI', 'MM', 'HR'], correctAnswer: 1 },
    ]
  }
};
