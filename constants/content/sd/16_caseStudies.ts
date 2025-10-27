import type { Chapter } from '../../../types';

export const CHAPTER_16_CASE_STUDIES: Chapter = {
  id: 'ch16',
  title: '16. End-to-End Case Study',
  lessons: [
    {
      id: 'l16-1',
      title: 'Exercise: Run the Full Order-to-Cash (O2C) Cycle',
      duration: 60,
      details: {
        definition: 'This exercise will walk you through a complete, hands-on Order-to-Cash cycle. You will perform the key steps from creating master data to seeing the final financial impact.',
        purpose: 'To solidify your understanding of the core SD processes and their integration points with MM and FI.',
        configurationSteps: [
          '<b>Step 1: Create Customer (BP):</b> Create a new customer using the Business Partner transaction. Ensure you extend the BP to the FI Customer and Customer roles, maintaining all necessary sales area data.',
          '<b>Step 2: Create Material (MM01):</b> Ensure a finished good material exists. Check the Sales views and confirm the Item Category Group and Delivering Plant are set correctly.',
          '<b>Step 3: Set Price (VK11):</b> Create a price condition record for your new customer and material combination.',
          '<b>Step 4: Create Sales Order (VA01):</b> Create a standard sales order for your customer and material. Observe how the system performs an availability check and determines the price automatically.',
          '<b>Step 5: Create Outbound Delivery (VL01N):</b> With reference to your sales order, create the delivery document. Perform the picking process by entering the picked quantity.',
          '<b>Step 6: Post Goods Issue (VL02N):</b> Post the goods issue for your delivery. Note the status change and understand the FI/CO document created for the Cost of Goods Sold.',
          '<b>Step 7: Create Billing Document (VF01):</b> With reference to your delivery, create the customer invoice. Check the accounting document generated (Customer DR, Revenue CR).',
          '<b>Step 8: Post Incoming Payment (F-28):</b> (As an FI user) Post the incoming payment from the customer to clear the open receivable.',
          '<b>Step 9: Review Document Flow:</b> Display any of the documents (Order, Delivery, or Invoice) and review the Document Flow to see the complete, linked chain of transactions with their statuses.',
        ],
        integrationNotes: 'This exercise provides a practical demonstration of the seamless integration between SD, MM, and FI within the O2C process.',
      },
    },
  ],
   quiz: {
    id: 'sd-q16',
    title: 'Case Study Quiz',
    questions: [
      { question: 'Which step in the O2C case study creates the financial posting for Cost of Goods Sold?', options: ['Create Sales Order', 'Create Billing Document', 'Post Goods Issue'], correctAnswer: 2 },
      { question: 'What is the best way to see all the related documents for the entire O2C process?', options: ['The Sales Order list (VA05)', 'The Document Flow', 'The Customer Master (BP)'], correctAnswer: 1 },
      { question: 'The billing document (invoice) directly creates a corresponding document in which other module?', options: ['MM (Materials Management)', 'FI (Financial Accounting)', 'PP (Production Planning)'], correctAnswer: 1 },
    ]
  }
};
