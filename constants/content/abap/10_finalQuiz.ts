import type { Chapter } from '../../../types';

export const CHAPTER_10_FINAL_QUIZ: Chapter = {
  id: 'ch10',
  title: '10. ABAP Final Quiz',
  lessons: [],
  quiz: {
    id: 'abap-q-final',
    title: 'ABAP Module Final Quiz',
    questions: [
      { question: 'Which transaction code is used to access the ABAP Dictionary?', options: ['SE80', 'SE38', 'SE11'], correctAnswer: 2 },
      { question: 'What is the purpose of an Internal Table?', options: ['To permanently store configuration data', 'To hold data in memory during program execution', 'To define the structure of a database table'], correctAnswer: 1 },
      { question: 'Which OOP concept allows a class to acquire the properties of another class?', options: ['Encapsulation', 'Polymorphism', 'Inheritance'], correctAnswer: 2 },
      { question: 'In S/4HANA, what is the modern successor to SE11 Views for data modeling?', options: ['Lock Objects', 'Core Data Services (CDS) Views', 'AMDPs'], correctAnswer: 1 },
      { question: 'What is the main communication protocol used by Fiori apps?', options: ['RFC', 'OData', 'BAPI'], correctAnswer: 1 },
      { question: 'What does the `LOOP AT ... ENDLOOP` statement do?', options: ['Executes a block of code a fixed number of times', 'Processes an internal table row by row', 'Defines a reusable code block'], correctAnswer: 1 },
      { question: 'What is the purpose of a BAdI (Business Add-In)?', options: ['To create a new report from scratch', 'To enhance standard SAP programs without modification', 'To lock database records'], correctAnswer: 1 },
      { question: 'The "Code-to-Data" paradigm is designed to leverage the power of which technology?', options: ['The ABAP Application Server', 'The SAP GUI front-end', 'The SAP HANA in-memory database'], correctAnswer: 2 },
      { question: 'What is the purpose of a Lock Object?', options: ['To encrypt data in a table', 'To prevent multiple users from editing the same record simultaneously', 'To connect to an external database'], correctAnswer: 1 },
      { question: 'Which statement is used to read data from the database?', options: ['READ TABLE', 'SELECT', 'FETCH'], correctAnswer: 1 },
    ]
  }
};