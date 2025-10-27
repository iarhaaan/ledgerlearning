import type { Chapter } from '../../../types';

export const CHAPTER_8_ENHANCEMENTS: Chapter = {
  id: 'ch8',
  title: '8. Enhancement Framework',
  lessons: [
    {
        id: 'l7-1',
        title: 'Modifications vs. Enhancements',
        duration: 15,
        details: {
            definition: 'A Modification is a direct change to a standard SAP object (program, table, etc.). An Enhancement is a way to add custom functionality to a standard SAP program at predefined "hooks" without changing the original object.',
            purpose: 'To adapt the standard SAP system to meet specific business requirements. Enhancements are strongly preferred over modifications.',
            configurationSteps: [
                '<b>Modifications:</b> Require an access key from SAP. Are overwritten during system upgrades, meaning the work must be redone (SPDD/SPAU transactions). This is a high-maintenance approach and should be avoided.',
                '<b>Enhancements:</b> Use the Enhancement Framework. Custom code is stored in separate objects. They are not overwritten during upgrades, making them much more stable and lower maintenance.',
            ],
            integrationNotes: 'Always look for an enhancement point before considering a modification.',
            updatesS4HANA: 'This principle is even more important in S/4HANA. The S/4HANA extensibility model also introduces "In-App Extensibility" (e.g., custom fields via Fiori apps) and "Side-by-Side Extensibility" (building separate apps on the SAP Business Technology Platform).',
        },
    },
    {
        id: 'l7-2',
        title: 'User Exits & Customer Exits',
        duration: 20,
        details: {
            tCode: 'CMOD, SMOD',
            definition: 'These are older enhancement techniques. User Exits are subroutines (FORM...ENDFORM) in standard programs (often in includes named MV45AFZZ) that SAP leaves empty for customers to add code. Customer Exits are function modules with empty include programs that can be activated and implemented via a project in CMOD/SMOD.',
            purpose: 'To provide early forms of enhancement points.',
            integrationNotes: 'These are still found in many older programs but have been largely superseded by BAdIs and the Enhancement Framework.',
            updatesS4HANA: 'While still functional for compatibility, these should not be used for new enhancements. BAdIs are the preferred alternative.',
        },
    },
    {
        id: 'l7-3',
        title: 'Business Add-Ins (BAdIs)',
        duration: 25,
        details: {
            tCode: 'SE18 (Definition), SE19 (Implementation)',
            definition: 'A Business Add-In (BAdI) is an object-oriented enhancement technique. It consists of an interface with method definitions. SAP places calls to these BAdI interfaces at specific points in its code. Customers can then create implementation classes to add their own logic.',
            purpose: 'To provide a flexible and robust way to enhance standard code. Multiple implementations can be created for the same BAdI, and they can be filtered to only run under specific conditions (e.g., for a certain company code).',
            configurationSteps: [
                '1. Find the BAdI definition in the standard code or by searching in SE18.',
                '2. Go to SE19 and create an implementation for that BAdI definition.',
                '3. The system creates a class that implements the BAdI interface.',
                '4. Add your custom code to the methods of this class.',
                '5. Activate the implementation.',
            ],
            integrationNotes: 'There are classic BAdIs and new BAdIs that are part of the Enhancement Framework. New BAdIs are more powerful.',
            updatesS4HANA: 'BAdIs are the most common and important enhancement technique to know for both ECC and S/4HANA.',
        },
    },
    {
        id: 'l7-4',
        title: 'Implicit & Explicit Enhancements',
        duration: 20,
        details: {
            tCode: 'SE38 / SE80 / ADT',
            definition: 'These are part of the modern Enhancement Framework. An Explicit Enhancement Point is a specific location in SAP code explicitly marked by SAP as a hook for enhancement (ENHANCEMENT-POINT). An Implicit Enhancement Point exists automatically at the beginning and end of every subroutine, function module, and method.',
            purpose: 'To provide enhancement hooks even where SAP has not explicitly provided a BAdI or user exit. Implicit enhancements are particularly powerful as they allow you to add code almost anywhere.',
            configurationSteps: ['In the ABAP editor (ADT or GUI), click the "Enhance" button (spiral icon). The editor will then show all available enhancement points. You can right-click an enhancement point and choose "Create Implementation" to add your code.'],
            integrationNotes: 'These enhancements are stored separately and are not lost during upgrades.',
            updatesS4HANA: 'This framework is fully supported and is a key tool for adapting S/4HANA standard logic.',
        },
    },
  ],
  quiz: {
    id: 'abap-q8',
    title: 'Enhancements Quiz',
    questions: [
      { question: 'What is the main disadvantage of a modification?', options: ['It is hard to code', 'It can be overwritten by system upgrades', 'It is not object-oriented'], correctAnswer: 1 },
      { question: 'What is the modern, object-oriented enhancement technique that uses interfaces and implementing classes?', options: ['User Exit', 'BAdI', 'Implicit Enhancement'], correctAnswer: 1 },
      { question: 'Which transaction is used to create an implementation for a BAdI?', options: ['SE11', 'SE18', 'SE19'], correctAnswer: 2 },
      { question: 'Which type of enhancement is available at the beginning and end of almost every subroutine and method automatically?', options: ['Explicit Enhancement', 'Implicit Enhancement', 'Customer Exit'], correctAnswer: 1 },
    ]
  }
};
