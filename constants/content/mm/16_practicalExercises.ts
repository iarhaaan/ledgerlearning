import type { Chapter } from '../../../types';

export const CHAPTER_17_PRACTICAL_EXERCISES: Chapter = {
  id: 'ch17',
  title: '17. End-to-End Case Study',
  lessons: [
    {
      id: 'l17-1',
      title: 'Exercise: Run the Full P2P Cycle',
      duration: 45,
      details: {
        definition: 'This exercise will walk you through the entire Procure-to-Pay cycle for a stock material, from creating the purchase requisition to posting the vendor payment.',
        purpose: 'To provide hands-on experience and solidify understanding of the core MM and FI integration points.',
        configurationSteps: [
          '<b>Step 1: Create Purchase Requisition (ME51N):</b> Create an internal request for 10 units of a specified raw material.',
          '<b>Step 2: Create Purchase Order (ME21N):</b> Convert the approved purchase requisition into a formal Purchase Order for a specified vendor.',
          '<b>Step 3: Post Goods Receipt (MIGO):</b> Imagine the goods have arrived. Post the goods receipt with reference to the Purchase Order. Check the material document and the FI accounting document (Inventory DR, GR/IR CR).',
          '<b>Step 4: Post Invoice Verification (MIRO):</b> Imagine the vendor invoice has arrived. Post the invoice with reference to the Purchase Order. Check the FI accounting document (GR/IR DR, Vendor CR).',
          '<b>Step 5: Post Outgoing Payment (F-53):</b> As an FI user, post the outgoing payment to the vendor to clear the open payable.',
          '<b>Step 6: Review PO History (ME23N):</b> Go back and display the Purchase Order. Review the "Purchase Order History" tab to see the complete chain of documents (GR and Invoice).',
        ],
        integrationNotes: 'This exercise demonstrates the seamless integration between MM (Steps 1-4) and FI (Steps 4-5).',
        updatesS4HANA: 'The transaction codes are the same in S/4HANA, but you could also perform these steps using the equivalent Fiori apps.',
      },
    },
  ],
};
