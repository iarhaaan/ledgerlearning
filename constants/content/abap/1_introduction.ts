import type { Chapter } from '../../../types';

export const CHAPTER_1_INTRODUCTION: Chapter = {
  id: 'ch1',
  title: '1. Introduction to ABAP & HANA',
  lessons: [
    {
        id: 'l1-1',
        title: 'What is ABAP?',
        duration: 10,
        details: {
            tCode: 'SE80 / SE38',
            definition: 'ABAP (Advanced Business Application Programming) is the proprietary, high-level programming language created by SAP for developing applications on the SAP platform.',
            purpose: 'To customize and extend SAP applications, create custom reports, and build entire new applications within the SAP environment. It is the core language for all development in the SAP Business Suite and S/4HANA.',
            integrationNotes: 'ABAP code runs on the Application Server layer of the SAP architecture. It is tightly integrated with the ABAP Dictionary and the underlying database.',
            updatesS4HANA: 'The core ABAP language is still fundamental. "Modern ABAP" refers to new syntax and features introduced for S/4HANA that are optimized for the HANA database and for building modern Fiori apps, such as CDS Views and the ABAP RESTful Application Programming Model (RAP).',
        },
    },
    {
      id: 'l1-2',
      title: 'SAP HANA Architecture & In-Memory Concepts',
      duration: 15,
      details: {
        definition: 'SAP HANA is an in-memory, column-oriented, relational database management system. It is the foundation of S/4HANA.',
        purpose: 'To provide dramatically faster data processing speeds compared to traditional disk-based databases, enabling real-time analytics and transaction processing on a single platform.',
        configurationSteps: [
          '<b>In-Memory Computing:</b> All data is stored in the main memory (RAM) for processing, eliminating slow disk I/O bottlenecks.',
          '<b>Columnar Data Store:</b> Data is stored in columns instead of rows. This is highly efficient for data compression and for analytical queries that aggregate data from a few columns.',
          '<b>No Aggregates/Indices:</b> Because of its speed, HANA does not need many of the pre-built aggregate and index tables that were required in ECC, leading to a simplified data model.',
        ],
        integrationNotes: 'As an ABAP developer, the key is to write code that leverages the power of HANA by pushing data-intensive calculations down to the database ("Code-to-Data" paradigm).',
        updatesS4HANA: 'The entire S/4HANA system is architected to run exclusively on the SAP HANA database.',
      },
    }
  ],
  quiz: {
    id: 'abap-q1',
    title: 'Introduction to ABAP Quiz',
    questions: [
      { question: 'What does the "in-memory" aspect of SAP HANA mean?', options: ['Data is stored on disk', 'All data is processed in the main memory (RAM)', 'It is a type of ABAP code'], correctAnswer: 1 },
      { question: 'What is the modern, recommended development environment for S/4HANA?', options: ['ABAP Workbench (SE80)', 'Visual Studio Code', 'ABAP Development Tools (ADT) for Eclipse'], correctAnswer: 2 },
    ]
  }
};