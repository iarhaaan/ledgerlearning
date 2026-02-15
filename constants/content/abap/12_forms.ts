import type { Chapter } from '../../../types';

export const CHAPTER_12_FORMS: Chapter = {
  id: 'ch12',
  title: '12. SAP Forms',
  lessons: [
    {
      id: 'l12-1',
      title: 'Sapscript (Legacy)',
      duration: 15,
      details: {
        tCode: 'SE71',
        sproPath: 'N/A',
        definition: 'Sapscript is the original, first-generation SAP tool for designing and printing business forms. It uses a line-based editor and a procedural scripting language.',
        purpose: 'To define the layout for printed documents like invoices and purchase orders.',
        integrationNotes: 'A print program (an ABAP report) is written to select the data and call standard Sapscript function modules to process the form.',
        updatesS4HANA: 'Sapscript is considered obsolete. While it is still supported for backward compatibility, no new development should be done using this technology.',
      },
    },
    {
        id: 'l12-2',
        title: 'Smart Forms',
        duration: 25,
        details: {
            tCode: 'SMARTFORMS',
            sproPath: 'N/A',
            definition: 'Smart Forms is the second-generation SAP form technology, introduced as a successor to Sapscript. It provides a more graphical layout designer and improved logic capabilities.',
            purpose: 'To design and print business documents with more ease and flexibility than Sapscript. When a Smart Form is activated, the system automatically generates a function module.',
            configurationSteps: [
              '1. Use the graphical designer to create the layout with windows, tables, and text elements.',
              '2. Define the form interface for passing data from the print program.',
              '3. The print program calls the generated function module, passing the application data.',
            ],
            integrationNotes: 'Smart Forms offer significant advantages over Sapscript, including easier table creation and conditional processing.',
            updatesS4HANA: 'Smart Forms are still widely used and fully supported in S/4HANA. However, for new form developments, Adobe Forms is the recommended strategic solution.',
        },
    },
    {
        id: 'l12-3',
        title: 'SAP Interactive Forms by Adobe (Adobe Forms)',
        duration: 25,
        details: {
            tCode: 'SFP',
            sproPath: 'N/A',
            definition: 'Adobe Forms is the modern, strategic form technology in SAP. It uses the Adobe LiveCycle Designer (a separate tool integrated with the ABAP Workbench) to create the form layout and an XML-based interface to pass data.',
            purpose: 'To provide the most powerful and flexible form design capabilities, including support for interactive forms (where users can fill in data online/offline), dynamic tables, and complex scripting.',
            configurationSteps: [
              '1. In T-Code SFP, create an interface that defines the data structure.',
              '2. Create the form layout using the Adobe LiveCycle Designer.',
              '3. Bind the data from the interface to the fields on the form layout.',
              '4. The ABAP print program calls a function module for the processed form.',
            ],
            updatesS4HANA: 'This is the standard and default form technology for S/4HANA, especially for the new Output Management framework (BRF+).',
        },
    },
  ],
  quiz: {
    id: 'abap-q12',
    title: 'Forms Quiz',
    questions: [
      { question: 'Which form technology is considered obsolete and should not be used for new development?', options: ['Sapscript', 'Smart Forms', 'Adobe Forms'], correctAnswer: 0 },
      { question: 'In S/4HANA, what is the modern, recommended technology for creating forms?', options: ['Sapscript', 'Smart Forms', 'Adobe Forms'], correctAnswer: 2 },
      { question: 'Which transaction code is used for the Smart Forms tool?', options: ['SE71', 'SMARTFORMS', 'SFP'], correctAnswer: 1 },
    ]
  }
};