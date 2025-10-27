import type { Chapter } from '../../../types';

export const CHAPTER_3_ABAP_DICTIONARY: Chapter = {
  id: 'ch3',
  title: '3. ABAP Dictionary',
  lessons: [
    {
        id: 'l3-1',
        title: 'Dictionary Overview',
        duration: 10,
        details: {
            tCode: 'SE11',
            sproPath: 'N/A',
            definition: 'The ABAP Dictionary is a central repository in the SAP system for defining and managing all data definitions (metadata). It is used to create and manage database objects like tables, views, and data types.',
            purpose: 'To ensure data integrity and consistency across the entire system. By defining data types centrally, you ensure that a field like "Customer ID" is used with the same properties in every program and table.',
            configurationSteps: [],
            integrationNotes: 'Objects created in the ABAP Dictionary are "active". When you activate a table, the system physically creates it in the underlying database (e.g., HANA, Oracle).',
            updatesS4HANA: 'SE11 is still the core tool. However, in S/4HANA, the new paradigm for data modeling is Core Data Services (CDS) Views, which are also managed via the Dictionary but offer much more powerful capabilities.',
        },
    },
    {
        id: 'l3-2',
        title: 'Database Tables',
        duration: 20,
        details: {
            tCode: 'SE11',
            sproPath: 'N/A',
            definition: 'A database table is a structure consisting of rows and columns that stores the master or transactional data of an application. In the Dictionary, you define the fields (columns) of the table.',
            purpose: 'To physically store business data. You define the table structure in the Dictionary, and the system creates it in the database.',
            configurationSteps: [
                'In SE11, select "Database table", enter a name (e.g., Z_MY_TABLE), and click Create.',
                'Provide a description and set the Delivery Class (e.g., A for Application table) and Data Browser settings.',
                'On the "Fields" tab, define the columns, specifying a Field Name and a Data Element for each.',
                'Define the Primary Key fields.',
                'Go to "Technical Settings" to specify the Data Class and Size Category.',
                'Activate the table.',
            ],
            integrationNotes: 'The primary key uniquely identifies each row in the table.',
            updatesS4HANA: 'While you can still create custom Z-tables, the best practice is to extend standard tables where possible or use CDS views to model data.',
        },
    },
    {
        id: 'l3-3',
        title: 'Data Elements and Domains',
        duration: 20,
        details: {
            tCode: 'SE11',
            sproPath: 'N/A',
            definition: 'A Domain defines the technical attributes of a field, such as its data type (e.g., CHAR, INT4) and length. A Data Element is a semantic definition that uses a Domain and provides the field labels (short, medium, long text) that appear on screens.',
            purpose: 'To promote reusability and semantic consistency. You can create one Domain for "Price" (e.g., CURR, 13 long, 2 decimal places) and reuse it in multiple Data Elements (e.g., "Sales Price", "Purchase Price"), ensuring they all have the same technical properties.',
            configurationSteps: ['First, create a Domain. Then, create a Data Element and assign the Domain to it. Finally, use the Data Element in your table definition.'],
            integrationNotes: 'This two-level approach separates technical and semantic definitions.',
            updatesS4HANA: 'This concept is fundamental and unchanged in S/4HANA.',
        },
    },
    {
        id: 'l3-4',
        title: 'Views',
        duration: 15,
        details: {
            tCode: 'SE11',
            sproPath: 'N/A',
            definition: 'A View is a virtual table that does not physically store data. It is a logical view that combines data from one or more underlying database tables.',
            purpose: 'To provide a specific, pre-joined view of data to an application program without creating a redundant data table. This is useful for reporting when you frequently need to join the same tables.',
            configurationSteps: ['In SE11, select "View", provide a name, and choose the view type (e.g., Database View). Add the base tables you want to join. Define the join conditions (how the tables are linked) and select the fields you want to include in the view.'],
            integrationNotes: 'Database Views perform an "inner join" on the database level.',
            updatesS4HANA: 'Database Views are still used, but Core Data Services (CDS) Views are the modern, far more powerful successor. CDS Views can perform all types of joins, aggregations, and calculations directly in the HANA database.',
        },
    },
    {
        id: 'l3-5',
        title: 'Lock Objects',
        duration: 15,
        details: {
            tCode: 'SE11',
            sproPath: 'N/A',
            definition: 'A Lock Object is used to manage data consistency by preventing multiple users from changing the same data record simultaneously.',
            purpose: 'To ensure data integrity in a multi-user environment. When a user starts editing a record (e.g., a sales order), the program should lock it. If another user tries to edit the same record, they will be denied access until the first user saves or cancels their changes.',
            configurationSteps: ['In SE11, select "Lock Object", give it a name (starting with E), and specify the primary key fields of the table you want to lock. Activating the Lock Object generates two function modules: ENQUEUE_* (to set the lock) and DEQUEUE_* (to release the lock).'],
            integrationNotes: 'It is the developer\'s responsibility to call these ENQUEUE and DEQUEUE function modules in their custom programs to correctly implement the locking mechanism.',
            updatesS4HANA: 'The concept of SAP LUW (Logical Unit of Work) and locking is still fundamental in S/4HANA.',
        },
    },
  ],
  quiz: {
    id: 'abap-q3',
    title: 'ABAP Dictionary Quiz',
    questions: [
      { question: 'What is the main transaction for accessing the ABAP Dictionary?', options: ['SE80', 'SE38', 'SE11'], correctAnswer: 2 },
      { question: 'Which object defines the technical attributes of a field like data type and length?', options: ['Data Element', 'Domain', 'Table'], correctAnswer: 1 },
      { question: 'Activating a Lock Object generates what?', options: ['A new database table', 'Two function modules (ENQUEUE and DEQUEUE)', 'A report program'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the modern and more powerful successor to database views?', options: ['Core Data Services (CDS) Views', 'Projection Views', 'Help Views'], correctAnswer: 0 },
    ]
  }
};
