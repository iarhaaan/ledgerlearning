import type { Chapter } from '../../../types';

export const CHAPTER_11_MESSAGE_DETERMINATION: Chapter = {
  id: 'ch11',
  title: '11. Message Determination (Output)',
  lessons: [
    {
        id: 'l11-1',
        title: 'Output Determination for Purchasing',
        duration: 15,
        details: {
            tCode: 'NACE',
            sproPath: 'N/A',
            definition: 'Message (or Output) Determination is the process by which the system automatically finds and processes outputs for purchasing documents, primarily the Purchase Order. An output can be a printed document, a fax, an email, or an EDI/IDoc message to a vendor.',
            purpose: 'To automate the communication of purchasing documents to suppliers. For example, when a PO is saved and released, the system can automatically email a PDF copy to the vendor.',
            integrationNotes: 'Like pricing, this functionality uses the condition technique (Condition Tables, Access Sequences, Output Types, and a Procedure).',
            updatesS4HANA: 'The classic output determination using NACE is still available for compatibility. However, the new, recommended approach is Business Rule Framework plus (BRFplus), which is more flexible and powerful.',
        },
    },
    {
        id: 'l11-2',
        title: 'Configuration Steps',
        duration: 20,
        details: {
            tCode: 'NACE',
            sproPath: 'Materials Management > Purchasing > Messages',
            definition: 'The configuration involves setting up the components of the condition technique for the "EF" application (Purchase Order).',
            purpose: 'To define the rules that govern when an output is generated, what form it uses, and how it is transmitted.',
            configurationSteps: [
              '1. <b>Condition Tables:</b> Define the key combination for which to find an output (e.g., PO Doc Type / Purchasing Org).',
              '2. <b>Access Sequences:</b> Define the search strategy for the condition tables.',
              '3. <b>Output Types (Message Types):</b> Define the output itself (e.g., NEU for new PO printout). Here you assign the print program and form (e.g., SAPscript, Smart Form).',
              '4. <b>Message Determination Schema (Procedure):</b> Assign the output types to a procedure, which is then assigned to the PO document type.',
              '5. <b>Condition Records (MN04):</b> Create the master data that links the key combination (e.g., a specific vendor) to an output type and transmission medium (e.g., Print, Email).',
            ],
            updatesS4HANA: 'For the new S/4HANA Output Management, configuration is done in SPRO under Cross-Application Components and then in the OPD (Output Parameter Determination) app, which uses BRF+ decision tables.',
        },
    },
  ],
  quiz: {
    id: 'mm-q11',
    title: 'Message Determination Quiz',
    questions: [
      { question: 'What is the classic transaction code for configuring output determination?', options: ['MIRO', 'OBYC', 'NACE'], correctAnswer: 2 },
      { question: 'What is the purpose of transaction MN04?', options: ['To create a purchase order', 'To create the master data (condition records) for message determination', 'To configure the message procedure'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the new recommended technology for output management?', options: ['Condition Technique', 'Business Rule Framework plus (BRF+)', 'User Exits'], correctAnswer: 1 },
    ]
  }
};
