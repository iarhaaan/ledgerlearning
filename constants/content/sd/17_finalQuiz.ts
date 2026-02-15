import type { Chapter } from '../../../types';

export const CHAPTER_17_FINAL_QUIZ: Chapter = {
  id: 'ch17',
  title: '17. SD Final Quiz',
  lessons: [],
  quiz: {
    id: 'sd-q-final',
    title: 'SD Module Final Quiz',
    questions: [
      { question: 'What are the three organizational units that form a Sales Area?', options: ['Company Code, Plant, Shipping Point', 'Sales Organization, Distribution Channel, Division', 'Sales Office, Sales Group, Division'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the mandatory transaction for creating a customer master?', options: ['XD01', 'BP', 'VD01'], correctAnswer: 1 },
      { question: 'Which document processing step triggers the posting of Cost of Goods Sold (COGS)?', options: ['Sales Order Creation', 'Billing Document Creation', 'Post Goods Issue'], correctAnswer: 2 },
      { question: 'Which component of the condition technique defines the search strategy for a price?', options: ['Condition Type', 'Access Sequence', 'Condition Table'], correctAnswer: 1 },
      { question: 'The Item Category is determined by the Sales Document Type and what other master data field?', options: ['Item Category Group (from Material Master)', 'MRP Type (from Material Master)', 'Customer Pricing Procedure (from Customer Master)'], correctAnswer: 0 },
      { question: 'What is the main transaction code for Revenue Account Determination?', options: ['OBYC', 'VKOA', 'NACE'], correctAnswer: 1 },
      { question: 'Which of the following is a key feature of Advanced ATP (aATP) in S/4HANA?', options: ['Incompletion Log', 'Backorder Processing (BOP)', 'Document Flow'], correctAnswer: 1 },
      { question: 'In a third-party sales process, who ships the goods to the end customer?', options: ['Your company', 'The external vendor', 'A logistics partner'], correctAnswer: 1 },
      { question: 'Which tool is best for troubleshooting an incorrect price in a sales order?', options: ['Document Flow', 'Pricing Analysis', 'Output Analysis'], correctAnswer: 1 },
      { question: 'In S/4HANA, the classic NACE for output determination is strategically replaced by what technology?', options: ['IDocs', 'ABAP List Viewer (ALV)', 'Business Rule Framework plus (BRF+)'], correctAnswer: 2 },
    ]
  }
};
