import type { Chapter } from '../../../types';

export const CHAPTER_12_PHYSICAL_INVENTORY: Chapter = {
  id: 'ch12',
  title: '12. Physical Inventory',
  lessons: [
    {
      id: 'l12-1',
      title: 'Physical Inventory Process',
      duration: 20,
      details: {
        definition: 'The physical inventory process is used to count the actual physical stock in the warehouse and compare it with the book inventory (the stock quantity in the SAP system).',
        purpose: 'To ensure inventory accuracy and adjust the book inventory to reflect the physical reality.',
        configurationSteps: [
            '1. <b>Create Physical Inventory Document (MI01):</b> Prepares the system for the count.',
            '2. <b>Enter Count (MI04):</b> Enter the quantities that were physically counted.',
            '3. <b>Post Differences (MI07):</b> Post any differences between the book quantity and the counted quantity. This creates a material document and an accounting document to adjust inventory value.',
        ],
        updatesS4HANA: 'These transactions are still valid. Fiori apps are also available to streamline the process.',
      },
    },
  ],
  quiz: {
    id: 'mm-q12',
    title: 'Physical Inventory Quiz',
    questions: [
      { question: 'Which transaction is used to post inventory differences after a count?', options: ['MI01', 'MI04', 'MI07'], correctAnswer: 2 },
      { question: 'What is the main purpose of the physical inventory process?', options: ['To order new materials', 'To ensure book inventory matches physical inventory', 'To pay vendors'], correctAnswer: 1 },
    ]
  }
};
