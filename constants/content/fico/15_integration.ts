import type { Chapter } from '../../../types';

export const CHAPTER_15_INTEGRATION: Chapter = {
  id: 'ch15',
  title: '15. Integration with MM & SD',
  lessons: [
    {
      id: 'l15-1',
      title: 'Integration with Material Management (P2P Cycle)',
      duration: 30,
      details: {
        tCode: 'OBYC',
        sproPath: 'Materials Management > Valuation and Account Assignment > Account Determination > Account Determination Without Wizard > Configure Automatic Postings',
        definition: 'FI-MM integration revolves around the automatic posting of financial entries during the Procure-to-Pay (P2P) cycle. The core of this integration is the automatic account determination configured in T-Code OBYC.',
        purpose: 'To ensure that logistics transactions in MM, such as Goods Receipt and Invoice Verification, are reflected accurately and automatically in the General Ledger without manual FI postings.',
        configurationSteps: ['In OBYC, you assign G/L accounts to transaction keys (e.g., BSX for inventory, WRX for GR/IR, GBB for offsetting entries) based on valuation classes assigned to materials.'],
        integrationNotes: `
          <b>Key Transaction Events and Accounting Entries:</b><br>
          1.  <b>Goods Receipt (MIGO):</b> When goods are received against a Purchase Order.
              <ul><li><i>Accounting Entry:</i> Inventory Account (Debit) | GR/IR Clearing Account (Credit).</li></ul>
          2.  <b>Invoice Verification (MIRO):</b> When the vendor invoice is posted.
              <ul><li><i>Accounting Entry:</i> GR/IR Clearing Account (Debit) | Vendor Reconciliation Account (Credit).</li></ul>
        `,
        updatesS4HANA: 'The OBYC configuration is still fundamental. However, the resulting FI document is now a single entry in the Universal Journal (ACDOCA), which includes all MM details like material number and quantity. This eliminates many reconciliation needs and provides richer reporting.',
      },
    },
    {
      id: 'l15-2',
      title: 'Integration with Sales & Distribution (O2C Cycle)',
      duration: 30,
      details: {
        tCode: 'VKOA',
        sproPath: 'Sales and Distribution > Basic Functions > Account Assignment/Costing > Revenue Account Determination > Assign G/L Accounts',
        definition: 'FI-SD integration manages the flow of data from sales activities to financial accounting, primarily for revenue and receivable recognition during the Order-to-Cash (O2C) cycle.',
        purpose: 'To ensure that when goods are shipped and customers are billed in SD, the corresponding revenue, cost of goods sold, and customer receivables are posted automatically and correctly in FI and CO.',
        configurationSteps: ['In VKOA, you create condition tables and access sequences to determine which G/L accounts are used for revenue postings based on criteria like Customer Group, Material Group, etc.'],
        integrationNotes: `
          <b>Key Transaction Events and Accounting Entries:</b><br>
          1.  <b>Post Goods Issue (PGI in VL02N):</b> When goods are shipped to the customer.
              <ul><li><i>Accounting Entry:</i> Cost of Goods Sold (COGS) Account (Debit) | Inventory Account (Credit). (This part is actually MM-FI integration via OBYC).</li></ul>
          2.  <b>Billing / Invoicing (VF01):</b> When the invoice is created for the customer.
              <ul><li><i>Accounting Entry:</i> Customer Reconciliation Account (Debit) | Sales Revenue Account (Credit).</li></ul>
        `,
        updatesS4HANA: 'VKOA configuration is still essential. The billing document posting in SD now also becomes a single line item in the Universal Journal, containing all FI, CO, and profitability (CO-PA) characteristics. This is a massive simplification for profitability analysis.',
      },
    }
  ],
  quiz: {
    id: 'fico-q15',
    title: 'Integration Quiz',
    questions: [
      { question: 'Which transaction is key for MM-FI automatic account determination?', options: ['VKOA', 'OBYC', 'OKKP'], correctAnswer: 1 },
      { question: 'During a Goods Receipt (MIGO) in the P2P cycle, which account is typically credited?', options: ['Inventory Account', 'Vendor Account', 'GR/IR Clearing Account'], correctAnswer: 2 },
      { question: 'During a Billing Document posting (VF01) in the O2C cycle, which account is typically debited?', options: ['Sales Revenue Account', 'Customer Reconciliation Account', 'Inventory Account'], correctAnswer: 1 },
      { question: 'The accounting entry for Cost of Goods Sold (COGS) is posted at which step in the O2C cycle?', options: ['Sales Order Creation', 'Post Goods Issue (PGI)', 'Billing'], correctAnswer: 1 },
    ]
  }
};