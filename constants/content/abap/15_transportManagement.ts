import type { Chapter } from '../../../types';

export const CHAPTER_15_TRANSPORT_MANAGEMENT: Chapter = {
  id: 'ch15',
  title: '15. Transport Management & Security',
  lessons: [
    {
      id: 'l15-1',
      title: 'Change and Transport System (CTS)',
      duration: 20,
      details: {
        tCode: 'SE09 / SE10',
        sproPath: 'N/A',
        definition: 'The Change and Transport System (CTS) is the central tool in SAP for managing and moving development objects and configuration settings from the development system to the quality assurance (QA) and production (PROD) systems.',
        purpose: 'To ensure a controlled, consistent, and auditable promotion of changes through the system landscape. This prevents uncontrolled changes in the production system and allows for proper testing.',
        configurationSteps: [
          '1. A developer creates or changes an object (e.g., a program) in the Development system (DEV).',
          '2. The change is saved to a "Transport Request".',
          '3. The developer "releases" the transport request, which locks the objects and exports them from the DEV system.',
          '4. A system administrator ("Basis" team) imports the transport request into the QA system for testing.',
          '5. After successful testing, the transport is imported into the PROD system.',
        ],
        updatesS4HANA: 'The core CTS process is unchanged. For ABAP on Cloud, transports are managed via a Git-based approach (gCTS).',
      },
    },
    {
      id: 'l15-2',
      title: 'Workbench vs. Customizing Requests',
      duration: 15,
      details: {
        tCode: 'SE09 / SE10',
        sproPath: 'N/A',
        definition: 'Transport requests are divided into two main types: Workbench and Customizing.',
        purpose: 'To separate repository objects (code) from client-specific configuration data.',
        configurationSteps: [
          '<b>Workbench Request:</b> Contains repository objects, which are client-independent. This includes ABAP programs, tables, function modules, etc. Changes in a workbench request affect all clients in the system.',
          '<b>Customizing Request:</b> Contains client-specific settings. This includes most of the configuration done in the SPRO transaction menu. These changes only affect the client in which they were made.',
        ],
        integrationNotes: 'A developer usually works with Workbench requests, while a functional consultant usually works with Customizing requests.',
      },
    },
    {
      id: 'l15-3',
      title: 'Developer Security Basics',
      duration: 15,
      details: {
        tCode: 'SU01 (User), PFCG (Role)',
        sproPath: 'N/A',
        definition: 'Developer access in SAP is controlled by authorizations. This ensures that only authorized personnel can create or change development objects.',
        purpose: 'To maintain system integrity and security.',
        configurationSteps: [
          '<b>Developer Key:</b> To use the ABAP development tools, a user must be registered as a developer in the system, which generates a developer key.',
          '<b>Authorization Object S_DEVELOP:</b> This is the primary authorization object that controls developer activities. It can be used to restrict access by object type (e.g., PROG for program), activity (e.g., CREATE, CHANGE, DEBUG), and package/authorization group.',
        ],
        integrationNotes: 'Security is typically managed by a separate team. As a developer, it\'s important to understand the basics to request the correct permissions for your work.',
      },
    },
  ],
  quiz: {
    id: 'abap-q15',
    title: 'Transport Management Quiz',
    questions: [
      { question: 'What is the purpose of the Change and Transport System (CTS)?', options: ['To debug ABAP code', 'To move changes from development to production', 'To create new users'], correctAnswer: 1 },
      { question: 'An ABAP program would be saved in which type of transport request?', options: ['Customizing Request', 'Workbench Request', 'A new type called Program Request'], correctAnswer: 1 },
      { question: 'Which authorization object is the most important for controlling developer access?', options: ['S_TCODE', 'S_DEVELOP', 'S_USER_GRP'], correctAnswer: 1 },
    ]
  }
};
