import type { Chapter } from '../../../types';

export const CHAPTER_11_INTEGRATION: Chapter = {
  id: 'ch11',
  title: '11. Integration Technologies',
  lessons: [
    {
        id: 'l11-1',
        title: 'Remote Function Call (RFC)',
        duration: 20,
        details: {
            tCode: 'SM59',
            sproPath: 'N/A',
            definition: 'RFC is the standard SAP interface for communication between SAP systems. It allows a program to call and execute a function module located in a remote system (the "target system").',
            purpose: 'To enable synchronous or asynchronous communication and data exchange between different SAP systems or between an SAP system and a non-SAP system.',
            configurationSteps: [
              '1. The target function module must be marked as "Remote-Enabled" in SE37.',
              '2. An "RFC Destination" must be configured in T-Code SM59, which contains the connection details (host, system number, login credentials) for the target system.',
              '3. In the calling program, use the syntax `CALL FUNCTION \'MY_FUNCTION\' DESTINATION \'MY_RFC_DEST\'.`'
            ],
            integrationNotes: 'RFC is the underlying technology for many other SAP communication methods, including BAPIs.',
            updatesS4HANA: 'RFC is still a core technology. However, for communication with modern web-based applications, OData services and other REST/SOAP APIs are the preferred approach.',
        },
    },
    {
        id: 'l11-2',
        title: 'BAPI (Business Application Programming Interface)',
        duration: 20,
        details: {
            tCode: 'BAPI',
            sproPath: 'N/A',
            definition: 'A BAPI is a standardized, object-oriented programming interface. Technically, it is a remote-enabled function module that provides a stable interface to SAP business objects (e.g., Sales Order, Purchase Order).',
            purpose: 'To allow external programs and other systems to perform business transactions (Create, Read, Update, Delete) in a controlled and consistent way, respecting all the underlying business logic and validations.',
            configurationSteps: ['BAPIs are stored in the Business Object Repository (T-Code BAPI). A key feature is that they handle transaction control (COMMIT WORK, ROLLBACK WORK).'],
            integrationNotes: 'BAPIs are the recommended method for programmatically creating or changing standard business documents from custom code or external systems.',
            updatesS4HANA: 'BAPIs are still widely used for system-to-system integration. For new UI-focused scenarios, OData services built on CDS and RAP are the modern equivalent.',
        },
    },
    {
        id: 'l11-3',
        title: 'IDoc & ALE',
        duration: 25,
        details: {
            tCode: 'WE02 (Display), WE19 (Test)',
            sproPath: 'N/A',
            definition: 'An IDoc (Intermediate Document) is a standard SAP data container for exchanging business information between systems. ALE (Application Link Enabling) is the technology used to set up the distribution model for exchanging IDocs between SAP systems.',
            purpose: 'To provide a standardized format and process for asynchronous, message-based data exchange, such as sending a purchase order to a vendor system via EDI (Electronic Data Interchange) or distributing master data (like materials) between different SAP systems.',
            configurationSteps: ['Configuring ALE involves setting up a distribution model (BD64), partner profiles (WE20), and ports (WE21).'],
            integrationNotes: 'IDoc processing is asynchronous. The sending system sends the IDoc, and the receiving system processes it independently. This is suitable for large volumes of data where immediate confirmation is not required.',
            updatesS4HANA: 'IDoc/ALE is still a very relevant technology, especially for EDI and master data distribution scenarios.',
        },
    },
  ],
  quiz: {
    id: 'abap-q11',
    title: 'Integration Technologies Quiz',
    questions: [
      { question: 'What is the underlying SAP technology for communication between systems that allows a program to call a remote function module?', options: ['IDoc', 'RFC', 'BAPI'], correctAnswer: 1 },
      { question: 'Which technology provides a stable, object-oriented interface for creating or changing standard business documents like Sales Orders?', options: ['IDoc', 'RFC', 'BAPI'], correctAnswer: 2 },
      { question: 'Which technology is designed for asynchronous, message-based communication using a standard data container format?', options: ['IDoc', 'RFC', 'BAPI'], correctAnswer: 0 },
    ]
  }
};
