import type { Chapter } from '../../../types';

export const CHAPTER_18_FINAL_QUIZ: Chapter = {
  id: 'ch18',
  title: '18. MM Final Quiz',
  lessons: [],
  quiz: {
    id: 'mm-q-final',
    title: 'MM Module Final Quiz',
    questions: [
      { question: 'What is the core end-to-end process in SAP MM?', options: ['Order-to-Cash', 'Procure-to-Pay', 'Record-to-Report'], correctAnswer: 1 },
      { question: 'In S/4HANA, the vendor master is created using which mandatory transaction?', options: ['XK01', 'BP', 'MIGO'], correctAnswer: 1 },
      { question: 'Which organizational level is responsible for material valuation?', options: ['Storage Location', 'Plant', 'Purchasing Organization'], correctAnswer: 1 },
      { question: 'Which transaction is used to post a goods receipt against a purchase order?', options: ['MIRO', 'ME21N', 'MIGO'], correctAnswer: 2 },
      { question: 'The automatic determination of G/L accounts for goods movements is configured in which transaction?', options: ['OBYC', 'VKOA', 'OKKP'], correctAnswer: 0 },
      { question: 'Which master data object links a specific material to a specific vendor and stores their price?', options: ['Source List', 'Material Master', 'Purchasing Info Record'], correctAnswer: 2 },
      { question: 'What is the new, performance-optimized MRP run in S/4HANA called?', options: ['Classic MRP', 'MRP Live', 'Advanced MRP'], correctAnswer: 1 },
      { question: 'In the subcontracting process, what do you provide to the vendor?', options: ['Finished goods', 'Component materials', 'A sales order'], correctAnswer: 1 },
      { question: 'Which of these is a mandatory component in S/4HANA for inventory valuation?', options: ['Warehouse Management', 'Material Ledger', 'Purchasing Groups'], correctAnswer: 1 },
      { question: 'What is the main purpose of the "PO History" tab in a purchase order?', options: ['To see the approval workflow', 'To track all follow-on documents like goods receipts and invoices', 'To change the price'], correctAnswer: 1 },
    ]
  }
};
