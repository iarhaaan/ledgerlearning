import type { Chapter } from '../../../types';

export const CHAPTER_10_OUTPUT_DETERMINATION: Chapter = {
  id: 'ch10',
  title: '10. Output Determination',
  lessons: [
    {
        id: 'l10-1',
        title: 'Output Determination Overview (Classic)',
        duration: 20,
        details: {
            tCode: 'NACE',
            sproPath: 'Sales and Distribution > Basic Functions > Output Control > Output Determination',
            definition: 'Output Determination is the process by which the system automatically finds and processes outputs for business documents like sales orders, deliveries, and invoices. An output can be a printed document, a fax, an email, or an EDI message.',
            purpose: 'To automate communication with business partners. For example, when a sales order is saved, the system can automatically print an order confirmation or email it to the customer.',
            configurationSteps: [
                'Classic output determination uses the condition technique:',
                '1. <b>Condition Tables:</b> Define the key combination for the output (e.g., Sales Org / Customer).',
                '2. <b>Access Sequences:</b> Define the search strategy for the condition tables.',
                '3. <b>Output Types:</b> Define the output itself (e.g., BA00 for Order Confirmation), including the transmission medium and form.',
                '4. <b>Output Determination Procedure:</b> Assign output types to a procedure, which is then assigned to the sales document header (e.g., Sales Order Type).',
                '5. <b>Condition Records (VV11/VV12/VV13):</b> Create the master data that links a customer to a specific output type (e.g., for this customer, send output type BA00 via email).',
            ],
            integrationNotes: 'It is a cross-functional component used in SD, MM, and other modules.',
            updatesS4HANA: 'The classic output determination using NACE is still available for backward compatibility. However, the new, recommended approach is Business Rule Framework plus (BRFplus), which is more flexible and powerful.',
        },
    },
    {
        id: 'l10-2',
        title: 'S/4HANA Output Management (BRF+)',
        duration: 20,
        details: {
            tCode: 'OPD (Output Parameter Determination)',
            sproPath: 'Cross-Application Components > Output Control',
            definition: 'The modern Output Management in S/4HANA is based on the Business Rule Framework plus (BRF+). It provides a central and unified solution for all application outputs.',
            purpose: 'To offer a more flexible, user-friendly, and powerful way to configure output. It supports modern channels like email with HTML templates, can handle complex rules without coding, and provides better monitoring tools.',
            configurationSteps: [
              '1. <b>Define Output Types:</b> In SPRO, define the output (e.g., ORDER_CONFIRMATION).',
              '2. <b>Configure Output Determination:</b> Use the OPD transaction to define business rules (decision tables) for Channel (e.g., PRINT, EMAIL), Recipient, and Form Template based on document properties (e.g., Sales Org, Customer).',
            ],
            integrationNotes: 'The form templates are now based on Adobe Forms (SAP Interactive Forms by Adobe) instead of the older SAPscript or Smart Forms.',
            updatesS4HANA: 'This is the strategic and default output management solution for new S/4HANA implementations.',
        },
    },
  ],
  quiz: {
    id: 'sd-q10',
    title: 'Output Determination Quiz',
    questions: [
      { question: 'What is the classic transaction code for output determination configuration?', options: ['VKOA', 'NACE', 'VOV8'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the new, recommended technology for output management?', options: ['Condition Technique', 'Business Rule Framework plus (BRF+)', 'User Exits'], correctAnswer: 1 },
      { question: 'What is the transaction for configuring the new S/4HANA output rules?', options: ['NACE', 'OPD', 'BRF+'], correctAnswer: 1 },
    ]
  }
};