import type { Chapter } from '../../../types';

export const CHAPTER_14_ADVANCED_DEV_TOOLS: Chapter = {
  id: 'ch14',
  title: '14. Advanced Developer Tools & QA',
  lessons: [
    {
        id: 'l14-1',
        title: 'ABAP Debugger',
        duration: 25,
        details: {
            tCode: '/h (activate), ADT Debugger',
            sproPath: 'N/A',
            definition: 'The ABAP Debugger is the most critical tool for analyzing the runtime execution of a program to find and fix errors (bugs).',
            purpose: 'To step through code line by line, inspect the contents of variables, check program flow, and understand why a program is not behaving as expected.',
            configurationSteps: [
                '1. <b>Set a Breakpoint:</b> In the code editor, set a breakpoint where you want the execution to stop.',
                '2. <b>Run the Program:</b> The program stops at the breakpoint and the debugger perspective opens.',
                '3. <b>Navigate Code:</b> Use controls like F5 (Step Into), F6 (Step Over), F7 (Return), and F8 (Continue) to move through the code.',
                '4. <b>Inspect Data:</b> Double-click variables to see their contents in real-time.',
            ],
            integrationNotes: 'You can start the debugger for any screen by typing `/h` in the command field before triggering an action.',
            updatesS4HANA: 'The debugger in ADT for Eclipse offers a more modern user interface and advanced features like conditional breakpoints and a built-in data preview.',
        },
    },
     {
        id: 'l14-2',
        title: 'Performance Tuning & Traces',
        duration: 20,
        details: {
            tCode: 'SAT (ABAP Trace), ST05 (SQL Trace)',
            sproPath: 'N/A',
            definition: 'Performance tuning is the process of analyzing a program to find and eliminate bottlenecks. The primary tools are the SQL Trace (ST05) to analyze database access and the ABAP Trace (SAT) to analyze the runtime of the ABAP code.',
            purpose: 'To ensure custom programs run efficiently and do not put an unnecessary load on the system.',
            configurationSteps: [
              '<b>ST05 (SQL Trace):</b> Activate the trace, run your program, deactivate the trace, and then display the results. It shows you every single SQL statement executed, how long it took, and whether an index was used.',
              '<b>SAT (ABAP Trace):</b> Run the program under trace. The results provide a hierarchical view of the call stack, showing how much time was spent in each method, function module, or subroutine.',
            ],
            updatesS4HANA: 'These tools are still essential. For S/4HANA, performance tuning focuses on the "Code-to-Data" paradigm. This means that HANA-specific optimizations identified via ST05 are less about traditional database index management and more about ensuring "proper Open SQL" is used—rewriting queries to use modern CDS Views, AMDPs, or advanced Open SQL features that push complex calculations down to the database, thus minimizing data transfer.',
        },
    },
    {
        id: 'l14-3',
        title: 'Code Inspector & ABAP Test Cockpit (ATC)',
        duration: 20,
        details: {
            tCode: 'SCI (Code Inspector), ATC (ABAP Test Cockpit)',
            sproPath: 'N/A',
            definition: 'These are frameworks for static code analysis. They check custom ABAP code against a configurable set of rules for potential errors, performance issues, security vulnerabilities, and adherence to coding standards.',
            purpose: 'To automate code quality assurance. ATC is the central tool used to manage these checks across a landscape and is essential for S/4HANA readiness.',
            integrationNotes: 'ATC can be integrated into the transport system, preventing code with critical errors from being released.',
            updatesS4HANA: 'ATC is the primary tool for performing S/4HANA custom code checks, identifying required adaptations for the new data model and HANA optimizations.',
        },
    },
    {
        id: 'l14-4',
        title: 'ABAP Unit Testing',
        duration: 20,
        details: {
            tCode: 'SE80 / ADT',
            sproPath: 'N/A',
            definition: 'ABAP Unit is a framework for writing and running automated unit tests for ABAP code, primarily for methods within classes.',
            purpose: 'To allow developers to test small, isolated pieces of their code (units) to ensure they work correctly. This helps catch bugs early, simplifies regression testing, and enables safe refactoring.',
            configurationSteps: [
              'Unit tests are implemented in a special local "test class" within the main program or global class.',
              'Test methods use `CL_AUNIT_ASSERT` methods (e.g., `ASSERT_EQUALS`) to verify that the code produces the expected result.',
              'Tests can be run directly from the ADT editor.',
            ],
            updatesS4HANA: 'Writing unit tests is a core principle of modern, agile software development and is strongly encouraged for all new S/4HANA development.',
        },
    },
  ],
  quiz: {
    id: 'abap-q14',
    title: 'Advanced Dev Tools Quiz',
    questions: [
      { question: 'Which tool is used to analyze program execution line by line?', options: ['ABAP Trace (SAT)', 'ABAP Debugger', 'SQL Trace (ST05)'], correctAnswer: 1 },
      { question: 'Which tool is best for analyzing database performance and index usage?', options: ['ABAP Trace (SAT)', 'ABAP Debugger', 'SQL Trace (ST05)'], correctAnswer: 2 },
      { question: 'What is the primary tool for static code analysis and S/4HANA readiness checks?', options: ['ABAP Debugger', 'ABAP Test Cockpit (ATC)', 'ABAP Unit'], correctAnswer: 1 },
    ]
  }
};