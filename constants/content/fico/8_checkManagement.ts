import type { Chapter } from '../../../types';

export const CHAPTER_8_CHECK_MANAGEMENT: Chapter = {
  id: 'ch8',
  title: '8. Check Management',
  lessons: [
    {
      id: 'l8-1',
      title: 'Creating Check Lot',
      duration: 15,
      details: {
        tCode: 'FCHI',
        sproPath: 'Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Outgoing Payments > Automatic Outgoing Payments > Payment Media > Check Management > Define Number Ranges for Checks',
        definition: 'A check lot is a range of check numbers defined in SAP that corresponds to a physical stack of pre-printed checks provided by the bank.',
        purpose: 'To enable the system to assign a unique check number to each payment document, ensuring proper tracking and control. Each lot is assigned to a House Bank and Account ID.',
        configurationSteps: ['In FCHI, specify the Company Code, House Bank, and Account ID. Then create a new lot with a number range that matches your physical checks.'],
        integrationNotes: 'This is a mandatory prerequisite for making payments using the "check" payment method in the Automatic Payment Program (F110).',
        updatesS4HANA: 'This process and transaction code remain the same in S/4HANA for classic check printing scenarios.',
      },
    },
    {
      id: 'l8-2',
      title: 'Check Register, Void and Reverse',
      duration: 15,
      details: {
        tCode: 'FCHN (Register), FCH9 (Void)',
        sproPath: 'N/A',
        definition: 'The Check Register (FCHN) is a report listing all issued checks and their status. Voiding (FCH9) is the process of cancelling a check that has been issued but not yet cashed, allowing you to provide a reason for voiding.',
        purpose: 'To track the status of all checks and to handle situations where a check is lost, damaged, or printed incorrectly. Voiding a check also reverses the associated payment document.',
        configurationSteps: ['To void, enter the check number in FCH9, select a void reason code, and enter the posting date for the reversal.'],
        integrationNotes: 'Voiding a check automatically reverses the clearing document, making the original vendor invoice an open item again.',
        updatesS4HANA: 'These transactions are still relevant and function as they do in ECC.',
      },
    },
    {
      id: 'l8-3',
      title: 'Manual and Automatic Check Creation & Printing',
      duration: 20,
      details: {
        tCode: 'F-58 (Manual), F110 (Automatic)',
        sproPath: 'N/A',
        definition: 'Checks can be created manually for single payments or automatically for bulk payments. Manual creation is done via F-58. Automatic creation is part of the Automatic Payment Program (F110). After creation, the check information is sent to a print program.',
        purpose: 'To provide flexible methods for generating check payments. The check printing process uses programs like RFFOUS_C to format the data (payee, amount, date) to fit the pre-printed check layout.',
        configurationSteps: ['In F110, after the payment run is successful, the checks can be printed from the "Printout" button. In F-58, the payment and printing happen in one step.'],
        integrationNotes: 'The print program (e.g., RFFOUS_C) is assigned to the payment method in the FBZP configuration. Variants for this program control the output.',
        updatesS4HANA: 'While still supported, check payments are becoming less common. S/4HANA payment formats are managed via DMEE or the newer Map Payment Format Data, with a focus on electronic payment files like ACH.',
      },
    }
  ],
  quiz: {
    id: 'fico-q8',
    title: 'Check Management Quiz',
    questions: [
      { question: 'What transaction code is used to create a check lot?', options: ['FCHN', 'FCH9', 'FCHI'], correctAnswer: 2 },
      { question: 'Which transaction is used for manual payment posting and check printing combined?', options: ['F110', 'F-58', 'FCHI'], correctAnswer: 1 },
      { question: 'Voiding a check using FCH9 also performs what action?', options: ['Re-issues the check with a new number', 'Reverses the associated payment document', 'Sends a notification to the bank'], correctAnswer: 1 },
    ]
  }
};