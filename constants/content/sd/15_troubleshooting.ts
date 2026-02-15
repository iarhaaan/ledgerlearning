
import type { Chapter } from '../../../types';

export const CHAPTER_15_TROUBLESHOOTING: Chapter = {
  id: 'ch15',
  title: '15. Common Issues & Troubleshooting',
  lessons: [
    {
        id: 'l15-1',
        title: 'Analyzing Incomplete Documents',
        duration: 15,
        details: {
            tCode: 'V.02 (Incomplete Orders)',
            sproPath: 'Sales and Distribution > Basic Functions > Log of Incomplete Items',
            definition: 'The incompletion log prevents a sales document from being saved or processed further if essential data is missing. This is controlled by the Incompletion Procedure.',
            purpose: 'To ensure data quality and that all necessary information for subsequent processes (like delivery and billing) is present in the sales document.',
            configurationSteps: ['You define an incompletion procedure and assign it to the Sales Document Type or Item Category. In the procedure, you specify which fields are mandatory.'],
            integrationNotes: 'If a user tries to save a document with missing mandatory data, the system will prompt them with the incompletion log, highlighting the missing fields.',
            updatesS4HANA: 'The functionality remains the same in S/4HANA.',
        },
    },
    {
        id: 'l15-2',
        title: 'Pricing Analysis',
        duration: 20,
        details: {
            tCode: 'VA01/VA02',
            sproPath: 'N/A',
            definition: 'Pricing Analysis is a tool within the sales order that shows exactly how the system arrived at a particular price. It displays the pricing procedure, which condition types were found, which were not, and why.',
            purpose: 'To be the primary tool for troubleshooting all pricing-related issues. If a price is wrong or a discount is missing, this screen will show which condition record was not found or which requirement was not met.',
            configurationSteps: ['In the sales order item conditions tab, click the "Analysis" button.'],
            integrationNotes: 'Understanding the pricing analysis screen is one of the most important skills for an SD consultant.',
            updatesS4HANA: 'The pricing analysis tool is still available and functions identically in S/4HANA.',
        },
    },
    {
        id: 'l15-3',
        title: 'Document Flow',
        duration: 10,
        details: {
            tCode: 'VA03, VL03N, VF03',
            sproPath: 'N/A',
            definition: 'The Document Flow provides a graphical or list-based overview of the entire chain of documents that make up a single business transaction.',
            purpose: 'To track the status of an Order-to-Cash process. It allows you to see the sales order, the delivery, the goods issue document, the invoice, and the accounting document all linked together, along with their current statuses.',
            configurationSteps: ['From any of the sales documents (order, delivery, invoice), click the "Display Document Flow" button on the toolbar.'],
            integrationNotes: 'This is an essential tool for understanding the end-to-end process and for finding related documents quickly.',
            updatesS4HANA: 'The document flow is a fundamental feature and is available in both the classic GUI transactions and the new Fiori apps.',
        },
    },
  ],
  quiz: {
    id: 'sd-q15',
    title: 'Troubleshooting Quiz',
    questions: [
      { question: 'Which tool is used to prevent sales documents from being saved with missing data?', options: ['Pricing Analysis', 'Document Flow', 'Incompletion Log'], correctAnswer: 2 },
      { question: 'If a customer\'s price is incorrect in a sales order, what is the best tool to find the cause?', options: ['Document Flow', 'Pricing Analysis', 'Incompletion Log'], correctAnswer: 1 },
      { question: 'What does the Document Flow show?', options: ['The pricing procedure calculation', 'The chain of related documents in a sales process', 'A list of incomplete documents'], correctAnswer: 1 },
    ]
  }
};
