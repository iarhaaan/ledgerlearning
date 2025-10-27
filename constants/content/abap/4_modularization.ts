import type { Chapter } from '../../../types';

export const CHAPTER_5_MODULARIZATION: Chapter = {
  id: 'ch5',
  title: '5. Modularization',
  lessons: [
    {
        id: 'l4-1',
        title: 'Introduction to Modularization',
        duration: 10,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'Modularization is the technique of breaking down a large program into smaller, manageable, and reusable blocks of code called modules.',
            purpose: 'To improve code readability, avoid redundancy, simplify maintenance, and promote code reuse. If you have a piece of logic that is used in multiple places, you should put it in a module and call it instead of copying and pasting the code.',
            configurationSteps: ['ABAP provides several techniques for modularization, such as Subroutines, Function Modules, and Methods within Classes.'],
            integrationNotes: 'N/A',
            updatesS4HANA: 'While subroutines and function modules are still widely used, the modern, object-oriented approach strongly favors using Methods within Classes as the primary modularization technique.',
        },
    },
    {
        id: 'l4-2',
        title: 'Subroutines (FORMs)',
        duration: 20,
        details: {
            tCode: 'SE38',
            sproPath: 'N/A',
            definition: 'A Subroutine is a block of code within a program that can be called from other parts of the same program. They are defined using `FORM...ENDFORM` and called using `PERFORM`.',
            purpose: 'To structure the code within a single program. They are useful for breaking down complex logic into smaller, more understandable pieces.',
            configurationSteps: [
                'Definition:',
                '`FORM my_subroutine USING iv_param TYPE i.`',
                '`  DATA(lv_result) = iv_param * 2.`',
                '`  WRITE lv_result.`',
                '`ENDFORM.`',
                '<br/>',
                'Call:',
                '`PERFORM my_subroutine USING 5.`',
            ],
            integrationNotes: 'Subroutines are local to the program in which they are defined. They cannot be called from other programs.',
            updatesS4HANA: 'Subroutines are considered a more traditional/obsolete technique. For new developments, using private methods within a local class is the recommended alternative.',
        },
    },
    {
        id: 'l4-3',
        title: 'Function Modules',
        duration: 25,
        details: {
            tCode: 'SE37',
            sproPath: 'N/A',
            definition: 'A Function Module is a reusable, global procedure that is stored centrally in the Function Library. Unlike subroutines, they can be called from any program in the system.',
            purpose: 'To encapsulate and reuse business logic across the entire SAP system. SAP provides thousands of standard function modules (e.g., BAPIs) for common business tasks.',
            configurationSteps: [
                'In SE37, create a Function Group (a container for function modules) first.',
                'Then create a Function Module within that group.',
                'Define the interface: `IMPORTING` parameters (inputs), `EXPORTING` parameters (outputs), `CHANGING` parameters (inputs/outputs), and `TABLES` parameters.',
                'Write the code in the "Source code" tab.',
                'Activate the function module.',
                'Call it from a program using `CALL FUNCTION \'MY_FUNCTION_MODULE\' ...`',
            ],
            integrationNotes: 'Function modules marked as "Remote-Enabled" can be called from external systems via RFC (Remote Function Call), making them a key integration tool.',
            updatesS4HANA: 'Function Modules are still very important. However, for new developments, creating public methods in global classes is often preferred. OData services are the modern way to expose logic to external systems.',
        },
    },
    {
        id: 'l4-4',
        title: 'Include Programs',
        duration: 15,
        details: {
            tCode: 'SE38',
            sproPath: 'N/A',
            definition: 'An Include Program is a piece of code that is not executable on its own. It is designed to be embedded within other programs using the `INCLUDE` statement.',
            purpose: 'To logically group related parts of a large program. For example, you can put all your data declarations in one include, all your subroutines in another, and all your event processing blocks in a third. This makes the main program much cleaner and easier to navigate.',
            configurationSteps: ['Create a program of type "INCLUDE program" in SE38. In your main program, simply write the statement `INCLUDE z_my_include_program.` at the desired location.'],
            integrationNotes: 'At runtime, the system treats the code from the include program as if it were written directly in the main program.',
            updatesS4HANA: 'Includes are still commonly used for structuring large programs, but again, using local classes can often achieve a better and more organized structure.',
        },
    },
  ],
  quiz: {
    id: 'abap-q5',
    title: 'Modularization Quiz',
    questions: [
      { question: 'Which modularization unit is local to a program and cannot be called from other programs?', options: ['Function Module', 'Subroutine', 'Class Method'], correctAnswer: 1 },
      { question: 'What is the transaction code for the Function Builder?', options: ['SE11', 'SE38', 'SE37'], correctAnswer: 2 },
      { question: 'In modern ABAP, what is generally the preferred alternative to subroutines for new development?', options: ['Include Programs', 'Private methods in a local class', 'Function Modules'], correctAnswer: 1 },
      { question: 'A "Remote-Enabled" function module can be called from where?', options: ['Only from the same program', 'From any program in the SAP system', 'From external, non-SAP systems'], correctAnswer: 2 },
    ]
  }
};
