
import type { Chapter } from '../../../types';

export const CHAPTER_5_DELIVERY_SHIPPING: Chapter = {
  id: 'ch5',
  title: '5. Delivery & Shipping',
  lessons: [
    {
        id: 'l5-1',
        title: 'Introduction to Delivery Processing',
        duration: 10,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'Delivery processing is the part of the Order-to-Cash cycle that deals with the physical shipment of goods to the customer. It is controlled by the Outbound Delivery document.',
            purpose: 'To manage all logistics activities, including picking the goods from the warehouse, packing them for shipment, and performing the goods issue.',
            configurationSteps: [],
            integrationNotes: 'Delivery processing is a core component of the Logistics Execution (LE) module and is tightly integrated with SD and MM.',
            updatesS4HANA: 'The core process is the same, but S/4HANA offers improved Fiori apps for monitoring and managing outbound deliveries, such as "Outbound Delivery Monitor".',
        },
    },
    {
        id: 'l5-2',
        title: 'Creating Outbound Delivery',
        duration: 15,
        details: {
            tCode: 'VL01N (Create), VL02N (Change), VL03N (Display)',
            sproPath: 'N/A',
            definition: 'The Outbound Delivery is the document that initiates the shipping process. It is typically created with reference to a Sales Order.',
            purpose: 'To act as the central document for all shipping activities. It contains all the necessary data for picking, packing, and goods issue.',
            configurationSteps: ['In VL01N, enter the shipping point and the sales order number. The system copies relevant data from the sales order to create the delivery document.'],
            integrationNotes: 'Creating a delivery reduces the "scheduled for delivery" quantity and makes the inventory available for picking.',
            updatesS4HANA: 'These transactions are still valid. Fiori apps like "Create Outbound Deliveries from Sales Orders" provide a modern, role-based alternative.',
        },
    },
    {
        id: 'l5-3',
        title: 'Picking Process',
        duration: 15,
        details: {
            tCode: 'N/A (within VL02N)',
            sproPath: 'N/A',
            definition: 'Picking is the process of taking goods from a storage location in the warehouse to make them available for shipment.',
            purpose: 'To prepare the goods for packing and shipping. In SAP, the picked quantity is entered into the outbound delivery document.',
            configurationSteps: ['The picking relevance is controlled by the Item Category of the delivery document. The storage location is determined automatically from the Plant and Shipping Point.'],
            integrationNotes: 'For more advanced warehouse operations, the picking process can be integrated with the Warehouse Management (WM) or Extended Warehouse Management (EWM) modules, where a Transfer Order is created to facilitate the picking.',
            updatesS4HANA: 'In S/4HANA, Extended Warehouse Management (EWM) is the strategic and embedded solution for advanced warehouse processes, replacing the older WM module.',
        },
    },
    {
        id: 'l5-4',
        title: 'Packing Process',
        duration: 10,
        details: {
            tCode: 'N/A (within VL02N)',
            sproPath: 'N/A',
            definition: 'Packing is the process of putting the picked goods into shipping containers (e.g., boxes, pallets).',
            purpose: 'To organize and protect the goods for transport. The packing information can be recorded in the outbound delivery, creating Handling Units (HUs) that can be tracked.',
            configurationSteps: ['Packing functionality must be configured for the delivery item category.'],
            integrationNotes: 'If Handling Unit Management is active, each packing container becomes a unique Handling Unit with its own number, which can be tracked throughout the logistics chain.',
            updatesS4HANA: 'Handling Unit Management is fully supported and integrated with EWM in S/4HANA.',
        },
    },
    {
        id: 'l5-5',
        title: 'Post Goods Issue (PGI)',
        duration: 20,
        details: {
            tCode: 'VL02N',
            sproPath: 'N/A',
            definition: 'Post Goods Issue (PGI) is the final step in the shipping process. It is a critical event that signifies the legal change of ownership of the goods from the company to the customer.',
            purpose: 'To record the physical departure of goods from the warehouse. This transaction has several significant impacts on the SAP system.',
            configurationSteps: ['In VL02N, after picking is complete, the user clicks the "Post Goods Issue" button.'],
            integrationNotes: `PGI triggers several key integrations:
                <br>- <b>MM Integration:</b> Reduces the physical stock in inventory.
                <br>- <b>FI/CO Integration:</b> Posts the Cost of Goods Sold (COGS) to the G/L, which is a major financial event. (Debit COGS, Credit Inventory).
                <br>- <b>SD Integration:</b> Updates the status of the sales order and makes the delivery eligible for billing.`,
            updatesS4HANA: 'The process is the same, but the resulting financial document is a single entry in the Universal Journal (ACDOCA), which simplifies reporting and eliminates FI-CO reconciliation.',
        },
    },
  ],
  quiz: {
    id: 'sd-q5',
    title: 'Delivery & Shipping Quiz',
    questions: [
      { question: 'What is the transaction code to create an outbound delivery with reference to a sales order?', options: ['VA01', 'VF01', 'VL01N'], correctAnswer: 2 },
      { question: 'Which action triggers the posting of Cost of Goods Sold (COGS) in FI?', options: ['Creating the delivery', 'Picking the goods', 'Post Goods Issue (PGI)'], correctAnswer: 2 },
      { question: 'In S/4HANA, what is the strategic, embedded solution for advanced warehouse operations?', options: ['Warehouse Management (WM)', 'Inventory Management (IM)', 'Extended Warehouse Management (EWM)'], correctAnswer: 2 },
      { question: 'What is the primary effect of PGI on the Materials Management (MM) module?', options: ['It increases stock', 'It reduces physical stock', 'It creates a purchase order'], correctAnswer: 1 },
    ]
  }
};
