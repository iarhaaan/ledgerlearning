import type { Chapter } from '../../../types';

export const CHAPTER_18_ADVANCED_TOPICS: Chapter = {
  id: 'ch18',
  title: '18. Advanced & Special Topics',
  lessons: [
    {
      id: 'l18-1',
      title: 'Settlement Management (Rebates)',
      duration: 30,
      details: {
        tCode: 'N/A (Fiori Apps)',
        sproPath: 'Logistics - General > Settlement Management',
        definition: 'Settlement Management is the S/4HANA solution for managing supplier and customer rebates. It replaces the classic SD Rebate functionality. A rebate is a retrospective discount paid to a customer based on their sales volume over a specific period.',
        purpose: 'To automate the complex process of accruing, calculating, and settling volume-based rebates, ensuring accurate financial accounting and customer payments.',
        configurationSteps: [
          '1. <b>Condition Contracts:</b> The core master data object. You create a condition contract with a customer, defining the business volume criteria (e.g., sales of Material X) and the condition for the rebate (e.g., 2% of total sales).',
          '2. <b>Accrual:</b> As relevant invoices are posted, the system automatically posts accruals to FI to account for the future rebate liability.',
          '3. <b>Settlement:</b> At the end of the period, you run the settlement process, which calculates the final rebate amount and creates a credit memo to pay the customer.',
        ],
        integrationNotes: 'This process is tightly integrated with SD Pricing and FI. The accruals and settlement postings are all automated.',
        updatesS4HANA: 'This is a mandatory change. Classic SD Rebates (VBO1) are not available in S/4HANA. Settlement Management is the only solution.',
      },
    },
    {
      id: 'l18-2',
      title: 'Intercompany Sales Process',
      duration: 30,
      details: {
        tCode: 'N/A',
        sproPath: 'N/A',
        definition: 'The Intercompany Sales process handles a scenario where the sales organization belongs to one company code, but the delivering plant belongs to a different company code within the same corporate group.',
        purpose: 'To automate the sales process and the corresponding internal billing between two related legal entities.',
        configurationSteps: [
          '1. A customer places a sales order with Sales Org A (in Company Code A).',
          '2. The order is fulfilled and shipped from Plant B (in Company Code B).',
          '3. An external invoice is created from Sales Org A and sent to the end customer.',
          '4. An internal "Intercompany Invoice" is automatically created from Plant B (Company Code B) and sent to Sales Org A (Company Code A).',
          '5. This internal invoice posts a payable in Company Code A and a receivable in Company Code B.',
        ],
        integrationNotes: 'This is a complex process requiring careful configuration of pricing, partner determination, and billing types for both the external and internal transactions.',
        updatesS4HANA: 'The process flow is the same in S/4HANA, but the underlying documents are now all recorded in the Universal Journal, simplifying group-level reporting.',
      },
    },
    {
      id: 'l18-3',
      title: 'Billing Plans',
      duration: 20,
      details: {
        tCode: 'N/A',
        sproPath: 'Sales and Distribution > Billing > Billing Plan',
        definition: 'A Billing Plan is a schedule of individual billing dates for a single item in a sales document. There are two main types: Periodic Billing and Milestone Billing.',
        purpose: 'To automate billing for long-term agreements or projects.',
        configurationSteps: [
          '1. <b>Periodic Billing:</b> Used for scenarios where a fixed amount is billed at regular intervals (e.g., a monthly service contract). The system automatically creates invoices on the scheduled dates.',
          '2. <b>Milestone Billing:</b> Used for project-based scenarios. The total amount is divided across multiple billing dates, which are linked to the achievement of specific project milestones.',
        ],
        integrationNotes: 'The Billing Plan type is assigned to the sales document Item Category to activate this functionality.',
        updatesS4HANA: 'Billing Plans are fully supported. S/4HANA also offers SAP Subscription Billing as a more advanced solution for complex recurring revenue models.',
      },
    }
  ],
  quiz: {
    id: 'sd-q18',
    title: 'Advanced Topics Quiz',
    questions: [
      { question: 'In S/4HANA, what functionality replaces classic SD Rebates?', options: ['Billing Plans', 'Settlement Management', 'Advanced ATP'], correctAnswer: 1 },
      { question: 'Which scenario involves billing a customer a fixed amount every month for a service contract?', options: ['Milestone Billing', 'Intercompany Sales', 'Periodic Billing'], correctAnswer: 2 },
      { question: 'The Intercompany Sales process is used when the Sales Organization and the Delivering Plant belong to what?', options: ['The same company code', 'Different company codes', 'Different clients'], correctAnswer: 1 },
    ]
  }
};
