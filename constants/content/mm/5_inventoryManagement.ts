import type { Chapter } from '../../../types';

export const CHAPTER_5_INVENTORY_MANAGEMENT: Chapter = {
  id: 'ch5',
  title: '5. Inventory Management',
  lessons: [
    {
      id: 'l5-1',
      title: 'Goods Receipt (GR)',
      duration: 20,
      details: {
        tCode: 'MIGO',
        definition: 'A Goods Receipt is the physical movement of goods into the warehouse or plant. It is typically performed with reference to a Purchase Order.',
        purpose: 'To record the receipt of materials, which increases the stock quantity and value.',
        integrationNotes: 'Posting a GR for a PO generates a material document (in MM) and an accounting document (in FI). The typical accounting entry is Debit Inventory, Credit GR/IR Clearing Account.',
        updatesS4HANA: 'MIGO is still the primary transaction. The resulting posting is a single document in the Universal Journal (ACDOCA), simplifying reconciliation.',
      },
    },
    {
      id: 'l5-2',
      title: 'Goods Issue (GI)',
      duration: 15,
      details: {
        tCode: 'MIGO',
        definition: 'A Goods Issue is the physical movement of goods out of the warehouse or plant.',
        purpose: 'To record the consumption of materials (e.g., for a production order, for a cost center) or the shipment of goods to a customer (PGI). This decreases stock quantity and value.',
        integrationNotes: 'A GI to a cost center results in Debit Expense Account, Credit Inventory.',
        updatesS4HANA: 'MIGO remains the transaction for most goods movements.',
      },
    },
    {
      id: 'l5-3',
      title: 'Stock Transfer & Transfer Posting',
      duration: 15,
      details: {
        tCode: 'MIGO',
        definition: 'A Stock Transfer is a physical movement of stock between locations (e.g., Plant to Plant, Storage Location to Storage Location). A Transfer Posting is a logical change in stock status (e.g., from Unrestricted to Quality Inspection stock).',
        purpose: 'To manage the internal movement and status of inventory.',
        updatesS4HANA: 'Functionality remains the same.',
      },
    },
    {
      id: 'l5-4',
      title: 'Reservations',
      duration: 10,
      details: {
        tCode: 'MB21',
        definition: 'A Reservation is a request to the warehouse to keep a material ready for issue at a future date for a specific purpose (e.g., for a cost center).',
        purpose: 'To ensure material availability for a future need and to facilitate the planning of goods issues.',
        updatesS4HANA: 'Functionality remains the same.',
      },
    },
  ],
  quiz: {
    id: 'mm-q5',
    title: 'Inventory Management Quiz',
    questions: [
      { question: 'What is the main transaction for posting most goods movements like GR and GI?', options: ['ME21N', 'MB1A', 'MIGO'], correctAnswer: 2 },
      { question: 'What is the accounting impact of a Goods Receipt for a Purchase Order?', options: ['Debit GR/IR, Credit Vendor', 'Debit Inventory, Credit GR/IR', 'Debit Expense, Credit Vendor'], correctAnswer: 1 },
      { question: 'What is the difference between a stock transfer and a transfer posting?', options: ['There is no difference', 'Stock transfer is a physical move; transfer posting is a logical status change', 'Stock transfer is for finished goods; transfer posting is for raw materials'], correctAnswer: 1 },
    ]
  }
};
