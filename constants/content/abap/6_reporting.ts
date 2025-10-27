import type { Chapter } from '../../../types';

export const CHAPTER_7_REPORTING: Chapter = {
  id: 'ch7',
  title: '7. Reporting',
  lessons: [
    {
        id: 'l6-1',
        title: 'Classical Reports',
        duration: 15,
        details: {
            tCode: 'SE38',
            sproPath: 'N/A',
            definition: 'A classical report is the most basic type of report. It generates a single, static list of data. The user cannot interact with the output list.',
            purpose: 'To display data in a simple, list-based format. This is suitable for basic data dumps or simple print lists.',
            configurationSteps: [
                'A report program uses a series of processing blocks called "events".',
                ' - `INITIALIZATION`: Runs once before the selection screen is shown.',
                ' - `AT SELECTION-SCREEN`: Runs when the user interacts with the selection screen.',
                ' - `START-OF-SELECTION`: The main event where data is selected from the database.',
                ' - `END-OF-SELECTION`: Runs after all data has been selected.',
                'The `WRITE` statement is used to format and display the output.',
            ],
            integrationNotes: 'Classical reports are largely obsolete for complex reporting but are good for understanding the basic structure of an ABAP program.',
            updatesS4HANA: 'For any new report development, ALV or Fiori Analytical Apps are the standard. Classical reports are considered legacy.',
        },
    },
    {
        id: 'l6-2',
        title: 'Interactive Reports',
        duration: 20,
        details: {
            tCode: 'SE38',
            sproPath: 'N/A',
            definition: 'An interactive report allows the user to interact with the output list. The user can click on a line or field in the basic list to navigate to a more detailed secondary list.',
            purpose: 'To provide a drill-down capability. A user can see a summary list first, and then click to see the detailed data for a specific item.',
            configurationSteps: [
                'You create a basic list using `WRITE`.',
                'In the `AT LINE-SELECTION` event, you write the code that will be executed when the user double-clicks a line.',
                'This event typically selects more detailed data based on the line the user clicked and displays a secondary list.',
                'You can have up to 20 secondary lists.',
            ],
            integrationNotes: 'System variables like `sy-lisel` hold the content of the selected line, which you can use to fetch the detailed data.',
            updatesS4HANA: 'This technique is also considered legacy. The drill-down functionality provided by ALV is far more powerful and user-friendly.',
        },
    },
    {
        id: 'l6-3',
        title: 'ABAP List Viewer (ALV)',
        duration: 25,
        details: {
            tCode: 'SE38',
            sproPath: 'N/A',
            definition: 'The ABAP List Viewer (ALV) is a powerful and flexible framework provided by SAP to display data in a standardized grid or list format.',
            purpose: 'To quickly create powerful and user-friendly reports. ALV provides many built-in functions out-of-the-box, such as sorting, filtering, subtotals, column selection, and exporting to Excel, without the developer having to code them.',
            configurationSteps: [
                '1. Select your data into an internal table.',
                '2. Create a "Field Catalog", which is an internal table that defines the properties of each column to be displayed (e.g., column text, position, format).',
                '3. Call a standard ALV function module (like `REUSE_ALV_GRID_DISPLAY`) or use the ALV object model (`CL_SALV_TABLE`), passing your data table and field catalog to it.',
            ],
            integrationNotes: 'There are different ALV technologies, from the older function modules to the more modern object-oriented SALV model. The `CL_SALV_TABLE` class is the recommended approach for new developments.',
            updatesS4HANA: 'ALV is still extremely relevant and widely used for custom reports that are displayed in the SAP GUI. For Fiori apps, the equivalent is using UI5 controls like the Smart Table, which is often powered by a CDS View and an OData service.',
        },
    },
  ],
  quiz: {
    id: 'abap-q7',
    title: 'Reporting Quiz',
    questions: [
      { question: 'Which event in a report program is typically used for the main data selection?', options: ['INITIALIZATION', 'START-OF-SELECTION', 'AT LINE-SELECTION'], correctAnswer: 1 },
      { question: 'What is the main advantage of using ALV?', options: ['It provides many built-in functions like sorting and filtering automatically', 'It is the only way to select data from the database', 'It is required for all programs'], correctAnswer: 0 },
      { question: 'The drill-down capability from a summary list to a detail list is a feature of which type of report?', options: ['Classical Report', 'Interactive Report', 'ALV Report'], correctAnswer: 1 },
      { question: 'In modern ABAP, what is the recommended way to create an ALV grid?', options: ['Using the `REUSE_ALV_GRID_DISPLAY` function module', 'Using the `WRITE` statement', 'Using the `CL_SALV_TABLE` class'], correctAnswer: 2 },
    ]
  }
};
