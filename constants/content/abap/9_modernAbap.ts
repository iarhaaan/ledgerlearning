import type { Chapter } from '../../../types';

export const CHAPTER_10_MODERN_ABAP: Chapter = {
  id: 'ch10',
  title: '10. Modern ABAP for S/4HANA',
  lessons: [
    {
        id: 'l9-1',
        title: 'The "Code-to-Data" Paradigm',
        duration: 15,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'This is a fundamental shift in programming philosophy for the SAP HANA database. In the traditional "Data-to-Code" approach, you would select large amounts of data from the database to the application server and then process it in ABAP. In the "Code-to-Data" paradigm, you push down data-intensive calculations from the ABAP layer into the database layer.',
            purpose: 'To leverage the immense calculation power of the in-memory HANA database. By performing calculations and aggregations directly on the database, you dramatically reduce the volume of data transferred to the application server, leading to massive performance gains.',
            configurationSteps: ['This is achieved using modern technologies like CDS Views and AMDPs.'],
            integrationNotes: 'This paradigm is the key to building high-performance applications on S/4HANA.',
            updatesS4HANA: 'This is the core principle of all modern S/4HANA development.',
        },
    },
    {
        id: 'l9-2',
        title: 'Core Data Services (CDS) Views',
        duration: 25,
        details: {
            tCode: 'ADT (Eclipse)',
            sproPath: 'N/A',
            definition: 'CDS Views are the modern way of defining data models in S/4HANA. They are an enhancement of SQL that allows you to define semantically rich data models directly in the database, which can be consumed in ABAP programs and Fiori apps.',
            purpose: 'To be the new "single source of truth" for data modeling. They are much more powerful than classic SE11 Views, as they support all types of joins, calculations, aggregations, and annotations that define how the data is used in Fiori UIs.',
            configurationSteps: [
                'CDS Views are created as development objects in the ABAP Development Tools (ADT) for Eclipse.',
                'Example: `@AbapCatalog.sqlViewName: \'Z_I_MYCDS\' DEFINE VIEW Z_I_My_Cds AS SELECT FROM spfli...`',
            ],
            integrationNotes: 'CDS Views are the foundation of the S/4HANA Virtual Data Model (VDM) and are the primary data source for Fiori Analytical Apps.',
            updatesS4HANA: 'Mastering CDS Views is essential for any S/4HANA technical consultant.',
        },
    },
    {
        id: 'l9-3',
        title: 'ABAP Managed Database Procedures (AMDP)',
        duration: 20,
        details: {
            tCode: 'ADT (Eclipse)',
            sproPath: 'N/A',
            definition: 'AMDP is a framework that allows you to write database procedures (complex logic) directly in an ABAP class method using the native database language (SQLScript for HANA).',
            purpose: 'To execute complex, data-intensive logic that cannot be modeled using CDS Views. This is an explicit way to push down code to the database for maximum performance in specific scenarios.',
            configurationSteps: [
                'You create a global ABAP class that implements a special AMDP marker interface.',
                'You then write your SQLScript code inside the body of a method in this class.',
                'The ABAP runtime manages the creation and execution of this procedure in the HANA database.',
            ],
            integrationNotes: 'Use AMDPs when you have very complex calculations that require procedural logic (loops, etc.) that cannot be handled by the declarative nature of Open SQL or CDS.',
            updatesS4HANA: 'AMDPs are a key tool for performance optimization in S/4HANA.',
        },
    },
    {
        id: 'l9-4',
        title: 'OData Services',
        duration: 20,
        details: {
            tCode: 'SEGW (Gateway Builder)',
            sproPath: 'N/A',
            definition: 'OData (Open Data Protocol) is a standard web protocol for building and consuming RESTful APIs. In SAP, OData services are used to expose business data and functionality from the S/4HANA back-end to front-end applications.',
            purpose: 'To be the communication channel between the S/4HANA back-end and SAP Fiori UIs. The Fiori app in the browser calls an OData service, which then retrieves, creates, or updates data in the ABAP system.',
            configurationSteps: ['In T-Code SEGW, you can create an OData project. You can define your data model by importing a CDS View, and the Gateway Builder will generate the service artifacts for you.'],
            integrationNotes: 'An OData service typically exposes a CDS View, providing a direct link from the UI to the HANA-optimized data model.',
            updatesS4HANA: 'OData services are the backbone of the Fiori user experience. The modern way to build them is using the ABAP RESTful Application Programming Model (RAP), which is a framework that uses CDS and ABAP code to define and implement robust, Fiori-ready OData services.',
        },
    },
  ],
  quiz: {
    id: 'abap-q10',
    title: 'Modern ABAP Quiz',
    questions: [
      { question: 'What is the "Code-to-Data" paradigm?', options: ['Bringing all data to the application server to process it', 'Pushing down data-intensive calculations to the database', 'A new way to write user interfaces'], correctAnswer: 1 },
      { question: 'What is the modern, primary tool for data modeling in S/4HANA?', options: ['SE11 Database Views', 'Core Data Services (CDS) Views', 'ABAP Managed Database Procedures (AMDP)'], correctAnswer: 1 },
      { question: 'What is the main communication protocol between SAP Fiori apps and the S/4HANA back-end?', options: ['RFC', 'SOAP', 'OData'], correctAnswer: 2 },
      { question: 'When would you use an AMDP?', options: ['For all database selections', 'To define a simple data model', 'For complex, procedural logic that needs to run directly on the HANA database for performance'], correctAnswer: 2 },
    ]
  }
};
