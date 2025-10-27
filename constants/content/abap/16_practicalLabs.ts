import type { Chapter } from '../../../types';

export const CHAPTER_16_PRACTICAL_LABS: Chapter = {
  id: 'ch16',
  title: '16. Practical Labs',
  lessons: [
    {
      id: 'l16-1',
      title: 'Exercise: Build a Simple ALV Report',
      duration: 45,
      details: {
        definition: 'This exercise will guide you through the end-to-end process of creating a custom report with a selection screen and displaying the output using the modern ABAP List Viewer (ALV) object model.',
        purpose: 'To provide hands-on experience in building a common type of custom application and to practice object-oriented ABAP concepts.',
        configurationSteps: [
          '<b>Step 1: Create a Custom Table (SE11):</b> Create a simple custom "Z" table to store some data (e.g., ZEMPLOYEES with fields for ID, Name, Department). Populate it with a few entries.',
          '<b>Step 2: Create Executable Program (SE38/ADT):</b> Create a new report program.',
          '<b>Step 3: Define a Selection Screen:</b> Use the `PARAMETERS` or `SELECT-OPTIONS` statement to create an input field for the user to filter by Department.',
          '<b>Step 4: Select Data:</b> In the `START-OF-SELECTION` event, write an Open SQL `SELECT` statement to read data from your custom table into an internal table, using the user\'s input in the `WHERE` clause.',
          '<b>Step 5: Display Data using ALV:</b> Use the `CL_SALV_TABLE=>FACTORY( )` method to get an instance of the ALV class. Pass your internal table to this instance.',
          '<b>Step 6: Call the `DISPLAY( )` method:</b> This will render the ALV grid on the screen.',
          '<b>Step 7: Test:</b> Execute your report, enter a department, and verify that the output is displayed correctly in the ALV grid with all its built-in features.',
        ],
        updatesS4HANA: 'This process is identical in S/4HANA and is a fundamental skill for any ABAP developer.',
      },
    },
    {
      id: 'l16-2',
      title: 'Exercise: Build a Basic CDS View & OData Service',
      duration: 45,
      details: {
        definition: 'This exercise will demonstrate the modern, "Code-to-Data" approach by building a simple data model with a CDS View and exposing it as an OData service that can be consumed by a Fiori app.',
        purpose: 'To provide hands-on experience with core S/4HANA development technologies.',
        configurationSteps: [
          '<b>Step 1: Create a CDS View (ADT):</b> In your ABAP Development Tools (ADT) in Eclipse, create a new Data Definition. Write the CDS view to select and join data from standard SAP tables (e.g., join `SCARR` and `SPFLI` to show carrier and flight info).',
          '<b>Step 2: Add Annotations:</b> Add the annotation `@OData.publish: true` at the top of your CDS view definition. This tells the system to automatically generate an OData service for this view.',
          '<b>Step 3: Activate the CDS View:</b> Activate your data definition object.',
          '<b>Step 4: Register the Service (SAP Gateway):</b> In the SAP GUI, go to transaction `/IWFND/MAINT_SERVICE`. Find and add your newly generated service and activate it.',
          '<b>Step 5: Test the Service:</b> Use the SAP Gateway Client (`/IWFND/GW_CLIENT`) or your web browser to call the OData service URL and see the data returned in XML or JSON format.',
        ],
        integrationNotes: 'This exercise shows the foundation of how data is provided to modern Fiori applications.',
      },
    },
  ],
  quiz: {
    id: 'abap-q16',
    title: 'Practical Labs Quiz',
    questions: [
      { question: 'In the ALV exercise, which class is used to create the ALV object instance?', options: ['CL_GUI_ALV_GRID', 'REUSE_ALV_GRID_DISPLAY', 'CL_SALV_TABLE'], correctAnswer: 2 },
      { question: 'In the CDS exercise, what annotation is used to automatically generate an OData service?', options: ['@OData.publish: true', '@UI.headerInfo', '@Analytics.dataCategory'], correctAnswer: 0 },
      { question: 'What is the primary development environment for creating CDS Views?', options: ['SAP GUI (SE80)', 'ABAP Development Tools (ADT) for Eclipse', 'Visual Studio Code'], correctAnswer: 1 },
    ]
  }
};
