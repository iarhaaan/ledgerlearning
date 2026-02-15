
import type { Chapter } from '../../../types';

export const CHAPTER_13_S4HANA_CHANGES: Chapter = {
  id: 'ch13',
  title: '13. Key S/4HANA Changes in SD',
  lessons: [
    {
        id: 'l13-1',
        title: 'Mandatory Business Partner (BP)',
        duration: 15,
        details: {
            tCode: 'BP',
            sproPath: 'N/A',
            definition: 'In S/4HANA, the Business Partner (BP) is the single, mandatory point of entry for maintaining customer and vendor master data. The classic transactions (XD01, VD01, FK01, XK01) are obsolete.',
            purpose: 'To provide a harmonized data model. A single BP can have multiple roles (e.g., customer, vendor, contact person), eliminating data redundancy that existed in ECC.',
            integrationNotes: 'The Customer-Vendor Integration (CVI) framework is a mandatory background configuration that synchronizes the BP data with the underlying customer/vendor tables.',
            updatesS4HANA: 'This is arguably the most significant master data change for SD consultants. All customer data is created and managed through the BP transaction.',
        },
    },
    {
        id: 'l13-2',
        title: 'New Credit Management (FSCM)',
        duration: 15,
        details: {
            tCode: 'N/A',
            sproPath: 'Financial Supply Chain Management > Credit Management',
            definition: 'The classic SD Credit Management is replaced by the more powerful and flexible SAP Credit Management, which is part of Financial Supply Chain Management (FSCM).',
            purpose: 'To provide a more sophisticated, centralized, and real-time credit risk management solution. It supports automatic credit scoring, workflows for credit limit approvals, and integration with external credit agencies.',
            updatesS4HANA: 'This is a mandatory change. The old SD credit check functionality is not available in S/4HANA.',
        },
    },
    {
        id: 'l13-3',
        title: 'Advanced ATP (aATP)',
        duration: 15,
        details: {
            tCode: 'N/A (Fiori Apps)',
            sproPath: 'N/A',
            definition: 'Advanced Available-to-Promise (aATP) is the next-generation availability check in S/4HANA, offering enhanced capabilities over the classic ATP.',
            purpose: 'To handle complex order fulfillment scenarios with features like Backorder Processing (BOP), Product Allocation (PAL), and Alternative-Based Confirmation (ABC), all running on live data with high performance.',
            updatesS4HANA: 'aATP is a key innovation in S/4HANA Logistics, providing significant business value in making and keeping delivery promises.',
        },
    },
    {
        id: 'l13-4',
        title: 'New Output Management (BRF+)',
        duration: 15,
        details: {
            tCode: 'OPD',
            sproPath: 'Cross-Application Components > Output Control',
            definition: 'The classic output determination (NACE) is replaced by a new, modern framework based on Business Rule Framework plus (BRF+).',
            purpose: 'To offer a more flexible and user-friendly way to configure outputs (print, email, etc.) using decision tables and modern form technologies like Adobe Forms.',
            updatesS4HANA: 'This is the strategic, default output solution in S/4HANA, though the classic NACE is still available for compatibility.',
        },
    },
    {
        id: 'l13-5',
        title: 'Simplified Data Model & Analytics',
        duration: 15,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'Many complex SD tables and indices from ECC have been eliminated (e.g., VBOX, VBUK, VBUP). Status information is now read directly from the source documents (e.g., VBAK, LIKP, VBRK).',
            purpose: 'To simplify the data model, reduce the data footprint, and improve performance. This simplification, combined with the power of the HANA database, enables real-time analytics.',
            integrationNotes: 'Fiori Analytical Apps for SD leverage this simplified model and Core Data Services (CDS) views to provide real-time insights into sales performance without the need for separate data warehousing (BW).',
            updatesS4HANA: 'This architectural change is fundamental to the value proposition of S/4HANA.',
        },
    },
  ],
  quiz: {
    id: 'sd-q13',
    title: 'S/4HANA Changes Quiz',
    questions: [
      { question: 'What is the mandatory transaction for customer master data in S/4HANA?', options: ['XD01', 'BP', 'VD01'], correctAnswer: 1 },
      { question: 'The new Credit Management in S/4HANA is part of which component?', options: ['SD', 'FSCM', 'MM'], correctAnswer: 1 },
      { question: 'Which of these is NOT a feature of Advanced ATP (aATP)?', options: ['Backorder Processing', 'Product Allocation', 'Classic Pricing'], correctAnswer: 2 },
    ]
  }
};
