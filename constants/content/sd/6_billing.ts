
import type { Chapter } from '../../../types';

export const CHAPTER_6_BILLING: Chapter = {
  id: 'ch6',
  title: '6. Billing & Invoicing',
  lessons: [
    {
        id: 'l6-1',
        title: 'Introduction to Billing',
        duration: 15,
        details: {
            tCode: 'VF01 (Create), VF02 (Change), VF03 (Display)',
            sproPath: 'N/A',
            definition: 'Billing is the final stage of the sales and distribution process. It involves creating the customer invoice based on the preceding sales and delivery documents.',
            purpose: 'To create a billing document (invoice) which serves as the basis for collecting payment from the customer. This process is the primary trigger for recognizing revenue in Financial Accounting.',
            configurationSteps: ['In VF01, enter the number of the sales order or delivery document to be billed. The system copies all relevant data to create the invoice.'],
            integrationNotes: 'The creation of a billing document automatically generates a corresponding accounting document in FI/CO, posting a debit to the customer account and a credit to the revenue account.',
            updatesS4HANA: 'These transactions are still available. The Fiori app "Create Billing Documents - VF01" is the modern alternative.',
        },
    },
    {
        id: 'l6-2',
        title: 'Billing Document Types',
        duration: 20,
        details: {
            tCode: 'VOFA',
            sproPath: 'Sales and Distribution > Billing > Billing Documents > Define Billing Types',
            definition: 'The Billing Document Type is a key that controls the entire billing process, similar to how the Sales Document Type controls the sales process.',
            purpose: 'To differentiate between various business transactions in billing. Examples: F2 (Invoice), G2 (Credit Memo), L2 (Debit Memo). It controls the number range, the document type for the FI posting, and the cancellation billing type.',
            configurationSteps: ['In VOFA, you can create new billing types (usually by copying a standard one) and maintain their control parameters.'],
            integrationNotes: 'The "Document Type" field in the billing type configuration determines the document type (e.g., "RV") of the accounting document posted in FI.',
            updatesS4HANA: 'The configuration remains in VOFA and is fundamental to the billing process in S/4HANA.',
        },
    },
    {
        id: 'l6-3',
        title: 'Returns, Credit & Debit Memos',
        duration: 15,
        details: {
            tCode: 'VA01 (for Requests), VF01 (for Memos)',
            sproPath: 'N/A',
            definition: 'These are special billing processes. A Credit Memo is issued to a customer to reduce their debt (e.g., for returned goods). A Debit Memo is issued to increase their debt (e.g., for undercharging).',
            purpose: 'To handle exceptions and corrections in the billing process.',
            configurationSteps: ['Typically, a Credit/Debit Memo Request is created first in VA01. This request is then used as a reference to create the actual Credit Memo (G2) or Debit Memo (L2) in VF01.'],
            integrationNotes: 'Credit Memos post a credit to the customer account and a debit to a revenue or returns account. Debit Memos do the opposite.',
            updatesS4HANA: 'The process is the same. S/4HANA introduces Advanced Returns Management for more complex and streamlined returns processing.',
        },
    },
    {
        id: 'l6-4',
        title: 'Billing Copy Control',
        duration: 20,
        details: {
            tCode: 'VTFL (Delivery to Bill), VTFA (Order to Bill)',
            sproPath: 'Sales and Distribution > Billing > Billing Documents > Maintain Copying Control for Billing Documents',
            definition: 'Copy Control is a powerful configuration that defines how data is transferred from a source document (e.g., delivery) to a target document (e.g., invoice).',
            purpose: 'To ensure that data flows seamlessly and correctly between documents in the sales cycle. It is configured at the Header and Item level, allowing for very granular control over which fields are copied and how.',
            configurationSteps: ['In VTFL, you define the copy control between a delivery type and a billing type. You can specify routines that control data transfer for pricing, quantities, etc.'],
            integrationNotes: 'Copy control is the "glue" that holds the SD document flow together. Without it, you cannot create one document with reference to another.',
            updatesS4HANA: 'The configuration and its importance are unchanged in S/4HANA.',
        },
    },
    {
        id: 'l6-5',
        title: 'SD-FI Account Determination',
        duration: 25,
        details: {
            tCode: 'VKOA',
            sproPath: 'Sales and Distribution > Basic Functions > Account Assignment/Costing > Revenue Account Determination',
            definition: 'This is the core integration point between SD and FI for revenue recognition. It determines which G/L accounts are automatically posted to when a billing document is created.',
            purpose: 'To ensure that sales revenues, discounts, and taxes are posted to the correct G/L accounts in Financial Accounting without any manual intervention.',
            configurationSteps: ['VKOA uses the condition technique. You define condition tables, access sequences, and an account determination procedure. You then create condition records that link combinations of criteria (e.g., Customer Group, Material Group) to specific G/L accounts.'],
            integrationNotes: 'This is arguably the most critical SD-FI integration setting. Incorrect configuration here will lead to incorrect financial statements.',
            updatesS4HANA: 'The VKOA transaction and configuration method are the same. In S/4HANA, the resulting posting also includes profitability segment information directly in the Universal Journal, streamlining profitability analysis.',
        },
    },
  ],
  quiz: {
    id: 'sd-q6',
    title: 'Billing & Invoicing Quiz',
    questions: [
      { question: 'What is the transaction code for the main SD-FI revenue account determination?', options: ['OBYC', 'VKOA', 'VOFA'], correctAnswer: 1 },
      { question: 'Which configuration controls the data flow from a delivery document to a billing document?', options: ['Item Category', 'Document Type', 'Copy Control'], correctAnswer: 2 },
      { question: 'The billing document type "G2" is typically used for what purpose?', options: ['Standard Invoice', 'Debit Memo', 'Credit Memo'], correctAnswer: 2 },
      { question: 'Creating a standard invoice in SD automatically triggers a posting in which other module?', options: ['MM (Materials Management)', 'PP (Production Planning)', 'FI (Financial Accounting)'], correctAnswer: 2 },
    ]
  }
};
