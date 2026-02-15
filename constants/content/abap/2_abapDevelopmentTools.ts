import type { Chapter } from '../../../types';

export const CHAPTER_2_ABAP_DEV_TOOLS: Chapter = {
  id: 'ch2',
  title: '2. ABAP Development Tools (ADT)',
  lessons: [
    {
        id: 'l2-1',
        title: 'ADT & Eclipse Overview',
        duration: 20,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'ABAP Development Tools (ADT), commonly known as "ABAP in Eclipse," is a set of plugins for the Eclipse IDE that provides the modern, state-of-the-art development environment for S/4HANA.',
            purpose: 'To offer a far more powerful and efficient development experience compared to the classic ABAP Workbench (SE80). It is mandatory for creating modern S/4HANA artifacts like CDS Views and AMDPs.',
            configurationSteps: [
              '1. Install a compatible version of the Eclipse IDE.',
              '2. In Eclipse, go to "Help" > "Install New Software...".',
              '3. Add the SAP software repository URL (e.g., https://tools.hana.ondemand.com/).',
              '4. Select "ABAP Development Tools" from the list and complete the installation.',
              '5. Create an "ABAP Project" in Eclipse to connect to your S/4HANA backend system.',
            ],
            integrationNotes: 'ADT connects directly to the ABAP application server, allowing you to edit and activate development objects in real-time, just like in the SAP GUI.',
            updatesS4HANA: 'This is the standard and required IDE for all serious S/4HANA development.',
        },
    },
    {
        id: 'l2-2',
        title: 'Key Features and Advantages',
        duration: 20,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'ADT provides a rich set of features that dramatically improve developer productivity.',
            purpose: 'To provide a modern coding experience.',
            configurationSteps: [
                '<b>Advanced Source Code Editor:</b> Offers syntax highlighting, code completion (Ctrl+Space), "pretty printer", and real-time syntax checking.',
                '<b>Quick Fixes & Refactoring:</b> ADT can automatically fix common errors (e.g., add a missing variable declaration) and allows for safe renaming of variables, methods, and classes across a project.',
                '<b>Element Info (F2):</b> Provides detailed information about any variable, method, or object just by hovering over it.',
                '<b>Integrated Debugger & Testing:</b> The debugger and ABAP Unit test framework are seamlessly integrated into the IDE.',
                '<b>Multi-Screen Editing:</b> Open multiple objects in parallel tabs, a significant improvement over the single-session mode of the classic GUI editor.',
            ],
            integrationNotes: 'While you can have both SAP GUI and ADT open, it is best practice to perform all coding and object creation within ADT.',
            updatesS4HANA: 'Learning ADT is not optional; it is a core competency for an S/4HANA developer.',
        },
    }
  ],
  quiz: {
    id: 'abap-q2',
    title: 'ADT Quiz',
    questions: [
      { question: 'What is the primary IDE used for ABAP Development Tools (ADT)?', options: ['Visual Studio Code', 'Eclipse', 'NetBeans'], correctAnswer: 1 },
      { question: 'Which of the following is a key advantage of ADT over the classic ABAP Workbench?', options: ['It does not require a system connection', 'It offers advanced features like code completion and refactoring', 'It is only for functional consultants'], correctAnswer: 1 },
      { question: 'Which modern S/4HANA development objects can ONLY be created in ADT?', options: ['Classic reports', 'CDS Views and AMDPs', 'Function modules'], correctAnswer: 1 },
    ]
  }
};
