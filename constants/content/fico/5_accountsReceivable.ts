import type { Chapter } from '../../../types';

export const CHAPTER_5_ACCOUNTS_RECEIVABLE: Chapter = {
  id: 'ch5',
  title: '5. Account Receivable Configurations & Operation',
  lessons: [
    {
      id: 'l5-1',
      title: 'Create Customer Groups/Number Ranges',
      duration: 15,
      details: {
        tCode: 'OBD2 (Groups), XDN1 (Ranges), OBAR (Assign)',
        sproPath: 'Financial Accounting > Accounts Receivable and Accounts Payable > Customer Accounts > Master Data > Preparations for Creating Customer Master Data',
        definition: 'Customer Account Groups classify customers (e.g., domestic, export). They control master data fields and number ranges.',
        purpose: 'To structure and control customer master data creation, ensuring consistency and proper numbering.',
        configurationSteps: ['Define a 4-character account group, configure its field status, create a number range in XDN1, and assign it to the group in OBAR.'],
        integrationNotes: 'The field status for Sales Area data is controlled by the SD configuration for account groups.',
        updatesS4HANA: 'This configuration is still required. Similar to vendors, it links to the Business Partner (BP) roles and groupings during master data creation.',
      },
    },
    {
        id: 'l5-2',
        title: 'Create Customer Master',
        duration: 20,
        details: {
          tCode: 'BP (Business Partner)',
          sproPath: 'N/A',
          definition: 'In S/4HANA, the Business Partner (BP) is the single point of entry for creating customer master records. Classic transactions like XD01/FD01 are obsolete.',
          purpose: 'To maintain all customer information (general, company code, sales area data) in one central object. You create a BP and extend it to roles like "FI Customer" and "Customer".',
          configurationSteps: ['Go to T-Code BP. Create a new Organization or Person. Fill in General Data. Then, add the "FI Customer" role for company code data and the "Customer" role for sales area data.'],
          integrationNotes: 'Customer-Vendor Integration (CVI) settings ensure the BP data synchronizes correctly with the underlying customer master tables.',
          updatesS4HANA: 'This is a mandatory change. Using T-Code BP for customer creation is a fundamental shift from SAP ECC.',
        },
    },
    {
        id: 'l5-3',
        title: 'Sales Invoice Posting',
        duration: 15,
        details: {
          tCode: 'FB70 (FI Invoice), VF01 (SD Billing Document)',
          sproPath: 'N/A',
          definition: 'This is the process of recording a customer invoice. FB70 is a direct FI posting, while VF01 creates an invoice from a sales order or delivery, which is the standard integrated process.',
          purpose: 'To create a receivable against the customer and recognize revenue.',
          configurationSteps: ['In FB70, enter customer, date, amount, and revenue G/L account. In VF01, reference the sales order or delivery document.'],
          integrationNotes: 'Creating a billing document in VF01 automatically generates an FI document, debiting the customer and crediting revenue, based on the VKOA account determination.',
          updatesS4HANA: 'These transactions are still available. The Fiori app "Create Billing Documents" is the modern alternative to VF01.',
        },
    },
     {
        id: 'l5-4',
        title: 'Incoming Payment',
        duration: 15,
        details: {
          tCode: 'F-28',
          sproPath: 'N/A',
          definition: 'This manual process involves posting the payment received from a customer and clearing the corresponding open invoice item(s).',
          purpose: 'To record the receipt of funds and clear the customer\'s outstanding receivable.',
          configurationSteps: ['Enter bank data, customer account, and amount. Select the open items to clear and post the document.'],
          integrationNotes: 'This transaction updates the customer sub-ledger and the general ledger (Bank and Customer Reconciliation accounts).',
          updatesS4HANA: 'F-28 is still valid. The Fiori app "Post Incoming Payments" provides a modern UI for this process.',
        },
    },
     {
        id: 'l5-5',
        title: 'Customer Credit Memo',
        duration: 10,
        details: {
          tCode: 'FB75',
          sproPath: 'N/A',
          definition: 'A Customer Credit Memo is posted to credit a customer account, for example, for returned goods or to correct an overcharge.',
          purpose: 'To reduce the total amount a customer owes. It creates a credit posting on the customer account.',
          configurationSteps: ['The screen is similar to FB70, but it posts a credit to the customer account.'],
          integrationNotes: 'In the integrated process, a credit memo is typically created from a returns order or a credit memo request in SD.',
          updatesS4HANA: 'This transaction is still available. Fiori apps like "Create Credit Memos" are also available.',
        },
    },
    {
        id: 'l5-6',
        title: 'Advance Payments (Special G/L)',
        duration: 20,
        details: {
          tCode: 'F-29 (Post Down Payment)',
          sproPath: 'Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Down Payment Received',
          definition: 'Advance payments or down payments from customers are managed using Special G/L Transactions. These postings are tracked in a separate special G/L account.',
          purpose: 'To record payments received from a customer before goods are delivered or services are rendered, without distorting the normal receivables balance.',
          configurationSteps: ['Configure an alternative reconciliation account for customer down payments in T-Code OBYR.'],
          integrationNotes: 'After the final invoice is posted, the down payment must be manually cleared against it.',
          updatesS4HANA: 'The process remains the same. The Fiori app "Manage Customer Down Payment Requests" provides a modern interface.',
        },
    },
    {
        id: 'l5-7',
        title: 'Dunning',
        duration: 30,
        details: {
          tCode: 'FBMP (Configuration), F150 (Run)',
          sproPath: 'Financial Accounting > Accounts Receivable and Accounts Payable > Business Transactions > Dunning',
          definition: 'Dunning is the process of systematically reminding customers of their overdue invoices. The Dunning Program can automatically generate and send out reminder letters based on predefined rules.',
          purpose: 'To manage and escalate the collection process for overdue receivables in an automated and structured way.',
          configurationSteps: [
              "Configuration in FBMP involves defining a Dunning Procedure:",
              "1. <b>Dunning Levels:</b> Define escalation levels (e.g., Level 1: reminder, Level 2: final notice).",
              "2. <b>Dunning Charges:</b> Specify fees to be charged at each level.",
              "3. <b>Dunning Texts:</b> Assign the form/letter for each dunning level.",
              "The procedure is then assigned in the customer master record.",
          ],
          integrationNotes: 'The dunning run updates the dunning level in the customer master and generates correspondence.',
          updatesS4HANA: 'FBMP and F150 are still used. S/4HANA also offers SAP Collections Management, which is a more advanced and proactive tool for managing receivables than the reactive Dunning process.',
        },
    },
  ],
  quiz: {
    id: 'fico-q5',
    title: 'Accounts Receivable Quiz',
    questions: [
      { question: 'Which transaction code is used to run the Dunning program?', options: ['FBMP', 'F-28', 'F150'], correctAnswer: 2 },
      { question: 'The standard SD billing document is created using which transaction?', options: ['FB70', 'VF01', 'F-29'], correctAnswer: 1 },
      { question: 'In S/4HANA, what is the mandatory transaction for creating customer master data?', options: ['XD01', 'BP', 'FD01'], correctAnswer: 1 },
      { question: 'In S/4HANA, the more advanced tool for managing customer collections is called...', options: ['Dunning', 'Credit Management', 'SAP Collections Management'], correctAnswer: 2 },
    ]
  }
};