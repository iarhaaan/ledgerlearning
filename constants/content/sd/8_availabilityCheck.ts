
import type { Chapter } from '../../../types';

export const CHAPTER_8_AVAILABILITY_CHECK: Chapter = {
  id: 'ch8',
  title: '8. Availability Check / ATP',
  lessons: [
    {
        id: 'l8-1',
        title: 'Availability Check (ATP) Overview',
        duration: 15,
        details: {
            tCode: 'CO09',
            sproPath: 'N/A',
            definition: 'The Availability Check, also known as Available-to-Promise (ATP), is a function that checks in real-time if a requested material will be available on the requested delivery date.',
            purpose: 'To provide a reliable delivery commitment to the customer. The system checks not only the current stock but also planned incoming stock (e.g., purchase orders, production orders) and planned outgoing stock (e.g., other sales orders).',
            configurationSteps: [],
            integrationNotes: 'ATP is a critical integration point between SD and MM/PP. The check is performed based on inventory data and planned movements from the other logistics modules.',
            updatesS4HANA: 'S/4HANA introduces Advanced ATP (aATP), which is a more powerful and flexible version of the classic ATP check, offering features like Product Allocation and Alternative-Based Confirmation.',
        },
    },
    {
        id: 'l8-2',
        title: 'Configuration of ATP',
        duration: 20,
        details: {
            tCode: 'OVZ9',
            sproPath: 'Sales and Distribution > Basic Functions > Availability Check and Transfer of Requirements > Availability Check > Availability Check with ATP Logic...',
            definition: 'The behavior of the ATP check is controlled by the combination of the Checking Group (from the material master) and the Checking Rule (from the SD transaction context).',
            purpose: 'To define the scope of the availability check. In this configuration, you specify which stock types (e.g., unrestricted, quality inspection) and which future receipts/issues (e.g., purchase orders, reservations) should be considered during the check.',
            configurationSteps: ['In OVZ9, for the combination of your Checking Group and Checking Rule, you select the checkboxes for the stock and future movements to be included in the ATP calculation.'],
            integrationNotes: 'The Checking Group is maintained in the material master (MRP 3 view), linking the material to the ATP logic.',
            updatesS4HANA: 'While this configuration is still relevant for basic ATP, the configuration for Advanced ATP (aATP) is done through a separate set of Fiori apps and is much more extensive.',
        },
    },
    {
        id: 'l8-3',
        title: 'Transfer of Requirements',
        duration: 15,
        details: {
            tCode: 'OVZG',
            sproPath: 'Sales and Distribution > Basic Functions > Availability Check and Transfer of Requirements > Transfer of Requirements > Define Requirements Classes',
            definition: 'Transfer of Requirements is the process of passing the material requirements generated from a sales order to Materials Management (MM) or Production Planning (PP).',
            purpose: 'To ensure that the sales demand is visible to the planning departments. This allows the MRP (Material Requirements Planning) run to consider sales order quantities when calculating material shortages and creating procurement proposals (e.g., planned orders).',
            configurationSteps: ['The transfer is controlled by the Requirements Class, which is determined from the material master. Within the Requirements Class, you set indicators for "Availability" and "Requirements Transfer".'],
            integrationNotes: 'This is the fundamental link that integrates sales forecasting and demand with supply chain planning.',
            updatesS4HANA: 'The concept is the same. The planning run in S/4HANA is MRP Live, which is optimized for the HANA database and can perform these calculations much faster.',
        },
    },
    {
        id: 'l8-4',
        title: 'S/4HANA Advanced ATP (aATP)',
        duration: 20,
        details: {
            tCode: 'N/A (Fiori Apps)',
            sproPath: 'N/A',
            definition: 'Advanced ATP (aATP) is the next-generation availability check functionality in S/4HANA, designed to be more powerful, flexible, and intelligent than classic ATP.',
            purpose: 'To handle complex order fulfillment scenarios in real-time. It provides enhanced capabilities to make and keep delivery promises to customers.',
            configurationSteps: [
                'aATP introduces several new features configured via Fiori apps:',
                '1. <b>Product Availability Check (PAC):</b> An enhanced version of the classic check.',
                '2. <b>Backorder Processing (BOP):</b> Intelligently re-distributes available stock among open orders based on priority rules.',
                '3. <b>Product Allocation (PAL):</b> Allows you to allocate limited stock to specific customers or regions.',
                '4. <b>Alternative-Based Confirmation (ABC):</b> Can automatically confirm an order from an alternative plant if the original plant has no stock.',
            ],
            integrationNotes: 'aATP is deeply integrated with the simplified S/4HANA data model, allowing it to perform complex checks on live data with high performance.',
            updatesS4HANA: 'aATP is a key innovation in S/4HANA Logistics and a major reason for companies to upgrade from ECC.',
        },
    },
  ],
  quiz: {
    id: 'sd-q8',
    title: 'Availability Check Quiz',
    questions: [
      { question: 'What does ATP stand for?', options: ['Available To Purchase', 'Available To Promise', 'Automated Transfer Process'], correctAnswer: 1 },
      { question: 'The behavior of the ATP check is controlled by the Checking Group and what other element?', options: ['Checking Rule', 'Checking Key', 'Checking Type'], correctAnswer: 0 },
      { question: 'What is the function that intelligently re-distributes stock among open orders in aATP called?', options: ['Product Allocation', 'Backorder Processing', 'Alternative-Based Confirmation'], correctAnswer: 1 },
      { question: 'The transfer of requirements from SD is a critical input for which other process?', options: ['Billing', 'MRP (Material Requirements Planning)', 'Credit Management'], correctAnswer: 1 },
    ]
  }
};
