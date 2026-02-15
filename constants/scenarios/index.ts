export interface Scenario {
    id: string;
    title: string;
    module: 'FICO' | 'MM' | 'SD' | 'ABAP' | 'S4HANA' | 'BASIS';
    type: 'REQUIREMENT' | 'BUG_FIX' | 'BLUEPRINT' | 'OUTAGE';
    difficulty: 'Junior' | 'Mid' | 'Senior' | 'Expert';
    description: string;
    options: {
        id: string;
        text: string;
        isCorrect: boolean;
        feedback: string;
    }[];
    explanation: string;
}

export const SCENARIOS: Scenario[] = [
    // --- FICO SCENARIOS ---
    {
        id: 'fico-01',
        title: 'Low Value Asset Procurement',
        module: 'FICO',
        type: 'REQUIREMENT',
        difficulty: 'Mid',
        description: 'Client Requirement: "We are buying 500 laptops for our sales team. We want to track which employee uses which laptop, but we do not want to create a separate Asset Master Record for each laptop because it is too much administrative work. How should we handle this?"',
        options: [
            {
                id: 'opt1',
                text: 'Create one Asset Master Record and post all 500 laptops to it. Track assignment in an Excel sheet outside SAP.',
                isCorrect: false,
                feedback: 'This saves time initially but makes inventory tracking and individual retirement impossibly hard later. Not a scalable solution.'
            },
            {
                id: 'opt2',
                text: 'Use the "Group Asset" functionality to group them for depreciation, but create individual sub-numbers for tracking.',
                isCorrect: true,
                feedback: 'Correct! Using Asset Sub-numbers (e.g., 1000-0, 1000-1...) is the standard way to manage identical components of a complex asset or similar low-value assets. It allows individual tracking while sharing depreciation terms.'
            },
            {
                id: 'opt3',
                text: 'Tell the client they must create 500 individual main Asset Numbers.',
                isCorrect: false,
                feedback: 'This is technically possible but ignores the client’s request to reduce administrative work. A consultant should offer a more efficient standard solution.'
            }
        ],
        explanation: 'Asset Sub-numbers are designed exactly for this purpose. They minimize data entry (inheriting from the main number) while allowing individual tracking of location and personnel assignment.'
    },
    {
        id: 'fico-02',
        title: 'Payment Run Blocked (F110)',
        module: 'FICO',
        type: 'BUG_FIX',
        difficulty: 'Junior',
        description: 'Automatic Payment Program (F110): The user ran the proposal, but Vendor 1001 is missing from the list. The error log says "Vendor 1001 is blocked for payment by user SAPUSER".',
        options: [
            {
                id: 'opt1',
                text: 'The vendor master data has a "Payment Block" set in the Company Code data (FK02).',
                isCorrect: false,
                feedback: 'A master data block would appear as a specific block code (e.g., "A" for Invoice Verification). The error message specifically mentions a "user".'
            },
            {
                id: 'opt2',
                text: 'Another user (or the same user) is currently editing the vendor master record or an invoice for this vendor.',
                isCorrect: false,
                feedback: 'Record locking usually gives a "Locked by user" message, but F110 proposal specific blocks are often due to another proposal run.'
            },
            {
                id: 'opt3',
                text: 'The vendor is currently included in another Payment Proposal that has not been deleted or paid yet.',
                isCorrect: true,
                feedback: 'Correct! SAP prevents double payments by locking a vendor if they exist in an active (open) payment proposal. You must delete the old proposal to release the vendor.'
            }
        ],
        explanation: 'This is the #1 reason for "Missing Vendors" in F110. Always check if an old, abandoned proposal exists for the same vendor.'
    },
    {
        id: 'fico-03',
        title: 'GR/IR Clearing Account Balance',
        module: 'FICO',
        type: 'BUG_FIX',
        difficulty: 'Senior',
        description: 'Month-End Closing: The GR/IR Clearing Account (Goods Receipt/Invoice Receipt) has a huge credit balance that is not clearing. The business says "We received the goods 6 months ago, but the vendor never sent the invoice and likely never will."',
        options: [
            {
                id: 'opt1',
                text: 'Post a manual Journal Entry (FB50) debiting GR/IR and crediting Other Income to clear the balance.',
                isCorrect: false,
                feedback: 'Never manually post to the GR/IR account! It is an "Open Item Managed" automatic account. Manual postings wreck the clearing references.'
            },
            {
                id: 'opt2',
                text: 'Use transaction MR11 (Maintain GR/IR Clearing Account) to clear the specific purchase order line items.',
                isCorrect: true,
                feedback: 'Correct! MR11 is the dedicated tool for clearing quantity differences between GR and IR. It posts the necessary adjustment document automatically.'
            },
            {
                id: 'opt3',
                text: 'Reverse the Goods Receipt (MIGO 102) to remove the liability.',
                isCorrect: false,
                feedback: 'You cannot reverse a Goods Receipt if the goods were physically consumed 6 months ago. That would falsify inventory records.'
            }
        ],
        explanation: 'MR11 is essential for maintaining hygiene in the GR/IR account. Manual journal entries on automatic reconciliation accounts are a "cardinal sin" in SAP FICO.'
    },
    {
        id: 'fico-04',
        title: 'Foreign Currency Valuation Error',
        module: 'FICO',
        type: 'BUG_FIX',
        difficulty: 'Mid',
        description: 'FAGL_FC_VAL: The valuation run fails with error "Account 160000: Expense account for valuation not defined".',
        options: [
            {
                id: 'opt1',
                text: 'Create the G/L account 160000 in FS00.',
                isCorrect: false,
                feedback: 'The account 160000 likely exists (it is the one being valued). The error says the *target* expense account is missing.'
            },
            {
                id: 'opt2',
                text: 'Go to OBA1 (KDF Transaction) and define the "Exchange Rate Difference Realized" accounts for the currency.',
                isCorrect: false,
                feedback: 'Valuation is about "Unrealized" gains/losses. OBA1 KDF handles realized. Close, but not exact.'
            },
            {
                id: 'opt3',
                text: 'Go to OBA1 (KDF Transaction) and define the "Valuation Loss 1" and "Valuation Gain 1" accounts for the reconciliation account.',
                isCorrect: true,
                feedback: 'Correct! Foreign Currency Valuation needs specific G/L accounts mapped to post the unrealized gain/loss adjustment.'
            }
        ],
        explanation: 'OBA1 is the heart of FX configuration. You must map the Adjustment Account (Balance Sheet) and the Gain/Loss Accounts (P&L).'
    },

    // --- MM SCENARIOS ---
    {
        id: 'mm-01',
        title: 'The Case of the Blocked Invoice',
        module: 'MM',
        type: 'BUG_FIX',
        difficulty: 'Junior',
        description: 'System Error: A user receives error "M8082 - Price too high (tolerance limit of 10 USD exceeded)" when trying to post an invoice (MIRO). The PO price was $100, but the Invoice is $115.',
        options: [
            {
                id: 'opt1',
                text: 'Change the price in the Purchase Order (ME22N) to $115 to match the invoice.',
                isCorrect: false,
                feedback: 'Never change a signed legal document (PO) just to make an invoice post, unless the PO was actually wrong. This bypasses controls.'
            },
            {
                id: 'opt2',
                text: 'Check OMR6 (Tolerance Limits) for Tolerance Key "PP" and advise the business to either approve the variance or reject the invoice.',
                isCorrect: true,
                feedback: 'Correct! The system is doing its job. As a consultant, you should check the configuration (OMR6) to confirm the limit is intended, then advise the business process owner to make a decision.'
            },
            {
                id: 'opt3',
                text: 'Deactivate the error message M8082 in transaction OBA5.',
                isCorrect: false,
                feedback: 'Dangerous! Disabling standard error messages removes critical financial controls. This should never be the first solution.'
            }
        ],
        explanation: 'Tolerance Limits are a key control in P2P. A consultant must distinguish between a "System Error" (bug) and a "System Control" (feature). This is a feature, not a bug.'
    },
    {
        id: 'mm-02',
        title: 'Release Strategy Not Triggering',
        module: 'MM',
        type: 'BUG_FIX',
        difficulty: 'Mid',
        description: 'Support Ticket: "I created a Purchase Order for $50,000, which should trigger approval Strategy S1 (Manager Level), but the Release Strategy tab is missing entirely from the PO header."',
        options: [
            {
                id: 'opt1',
                text: 'The user does not have authorization to see the Release Strategy tab.',
                isCorrect: false,
                feedback: 'Authorization would prevent *releasing*, but normally wouldn\'t hide the tab if the strategy was triggered. The tab appears if a strategy applies.'
            },
            {
                id: 'opt2',
                text: 'Check the Classification characteristics values (CL20N) and ensure the PO data matches the Strategy criteria (e.g., Plant, Material Group, Value).',
                isCorrect: true,
                feedback: 'Correct! Release Strategies are based on "Characteristics" (Plant, Purch Org, Net Value). If even one criteria doesn\'t match (e.g., wrong currencies), the strategy won\'t trigger.'
            },
            {
                id: 'opt3',
                text: 'The PO value is too high for Strategy S1.',
                isCorrect: false,
                feedback: 'If it was too high, it should trigger S2 (Director Level). If NO strategy triggers, it means the combination of data didn\'t match ANY configured rule.'
            }
        ],
        explanation: 'Debugging Release Strategies is 99% checking CL20N/CL24N connectivity. A common issue is "Currency Conversion" - if the characteristic is in USD but PO is in EUR, the check might fail.'
    },
    {
        id: 'mm-03',
        title: 'Split Valuation Requirement',
        module: 'MM',
        type: 'REQUIREMENT',
        difficulty: 'Senior',
        description: 'Client Requirement: "We buy the same chemical \'Acetone\' from Domestic vendors ($10/kg) and Import ($15/kg). We need to track the inventory cost separately for domestic vs import, but sell it under one material code."',
        options: [
            {
                id: 'opt1',
                text: 'Create two Material Codes: "Acetone-Domestic" and "Acetone-Import".',
                isCorrect: false,
                feedback: 'This creates a nightmare for Sales and Planning. They don\'t care where it came from; they just want "Acetone".'
            },
            {
                id: 'opt2',
                text: 'Use Split Valuation. Configure Valuation Types "DOMESTIC" and "IMPORT" and activate them for the material.',
                isCorrect: true,
                feedback: 'Correct! Split Valuation allows one Material Number to have multiple accounting views (Moving Avg Prices) based on a batch characteristic or valuation type.'
            },
            {
                id: 'opt3',
                text: 'Use Batch Management with FIFO valuation.',
                isCorrect: false,
                feedback: 'Batch Management tracks tracing, but standard valuation is still usually at the Plant level unless you specifically activate Split Valuation.'
            }
        ],
        explanation: 'Split Valuation is the standard solution for distinct costing of identical materials based on origin, status (New vs Refurbished), or quality.'
    },

    // --- SD SCENARIOS ---
    {
        id: 'sd-01',
        title: 'Missing Pricing Condition',
        module: 'SD',
        type: 'BUG_FIX',
        difficulty: 'Mid',
        description: 'Support Ticket: "Our sales order is missing the PR00 (Base Price) automatically. We have to type it in manually every time."',
        options: [
            {
                id: 'opt1',
                text: 'Check if a valid Condition Record exists for PR00 (VK11) for the current date and sales area.',
                isCorrect: true,
                feedback: 'Correct! The most common reason for missing pricing is simply missing master data (VK11).'
            },
            {
                id: 'opt2',
                text: 'Check the Pricing Procedure determination (OVKK) to see if the correct procedure is assigned.',
                isCorrect: false,
                feedback: 'If the procedure was wrong, you likely wouldn\'t see the PR00 condition *at all* or seeing a completely different set of conditions. If just the *value* is missing, it\'s usually records.'
            },
            {
                id: 'opt3',
                text: 'The Access Sequence for PR00 is broken.',
                isCorrect: false,
                feedback: 'Possible, but highly unlikely in a running system unless someone changed configuration recently. Always check Master Data first.'
            }
        ],
        explanation: 'Always follow the "Consultant\'s Triangle": Check Master Data first, then Configuration, then Code. 90% of pricing issues are missing VK11 records.'
    },
    {
        id: 'sd-02',
        title: 'Revenue Account Determination Error',
        module: 'SD',
        type: 'BUG_FIX',
        difficulty: 'Senior',
        description: 'Billing Error (VF01): "Account determination error for chart of accounts INT, transaction VKOA". The system cannot find the GL account for revenue.',
        options: [
            {
                id: 'opt1',
                text: 'Manually enter the G/L account in the billing document.',
                isCorrect: false,
                feedback: 'You cannot manually enter G/L accounts in a standard SD billing document. It *must* be determined automatically.'
            },
            {
                id: 'opt2',
                text: 'Check VKOA (Account Determination) for the combination of Cust.Acct.Group, Material.Acct.Group, and Account Key (ERL).',
                isCorrect: true,
                feedback: 'Correct! Revenue account determination depends on the assignment table in VKOA. Check if the material master (Sales View 2) has the correct Account Assignment Group.'
            },
            {
                id: 'opt3',
                text: 'The Customer Master is missing the Reconciliation Account.',
                isCorrect: false,
                feedback: 'Close, but that would cause an error regarding the *Customer* line item (A/R), not the *Revenue* line item (Sales).'
            }
        ],
        explanation: 'VKOA is the bridge between SD and FI. The error usually means the Material Master or Customer Master has a new "Account Assignment Group" that hasn\'t been mapped in configuration.'
    },
    {
        id: 'sd-03',
        title: 'Delivery Split Unexpectedly',
        module: 'SD',
        type: 'BUG_FIX',
        difficulty: 'Mid',
        description: 'Support Ticket: "I created one Sales Order with 2 line items. When I created the Delivery (VL01N), the system created TWO separate deliveries. Why?"',
        options: [
            {
                id: 'opt1',
                text: 'Check the Shipping Point and Ship-to Party address on the line items.',
                isCorrect: true,
                feedback: 'Correct! SAP validates "Header Fields". If Item 1 ships from Point A and Item 2 from Point B, or they have different Ship-to partners or Incoterms, they CANNOT be on the same delivery note.'
            },
            {
                id: 'opt2',
                text: 'The material availability dates are different.',
                isCorrect: false,
                feedback: 'Different dates usually just schedule the delivery for the later date (Complete Delivery) or create partials, but the primary cause of a *forced* split is header data mismatch.'
            },
            {
                id: 'opt3',
                text: 'The user double-clicked the save button.',
                isCorrect: false,
                feedback: 'Unlikely. SAP transactions are usually transactional.'
            }
        ],
        explanation: 'The "Split Analysis" tool in VL01N is a consultant\'s best friend here. It will tell you exactly which field (ZUKRL) caused the split.'
    },


    // --- BASIS / GENERAL SCENARIOS ---
    {
        id: 'basis-01',
        title: 'Transport Request Error RC=8',
        module: 'BASIS',
        type: 'OUTAGE',
        difficulty: 'Junior',
        description: 'Deployment: You imported a transport to QC, but it failed with Return Code 8 (RC=8). The log says "Syntax Error in Program Z_REPORT".',
        options: [
            {
                id: 'opt1',
                text: 'Ignore it. RC=8 is just a warning.',
                isCorrect: false,
                feedback: 'RC=0 is Success. RC=4 is Warning. RC=8 is Error (Imported but activation failed). RC=12 is Fatal. You cannot ignore an 8.'
            },
            {
                id: 'opt2',
                text: 'Resend the same transport again.',
                isCorrect: false,
                feedback: 'If the code has a syntax error, sending it again won\'t fix the code. You need to fix the source.'
            },
            {
                id: 'opt3',
                text: 'Check if a dependent object (e.g., a database table or include) is missing from the transport or was not yet transported.',
                isCorrect: true,
                feedback: 'Correct! Syntax errors during transport usually mean "I am referencing something that doesn\'t exist here yet". You likely missed a dependency in your transport list.'
            }
        ],
        explanation: 'Transport sequencing is critical. If Program A uses Table B, and you transport A before B, A will fail with a syntax error.'
    },
    {
        id: 'abap-01',
        title: 'DUMP: TIME_OUT',
        module: 'ABAP',
        type: 'BUG_FIX',
        difficulty: 'Junior',
        description: 'Performance: A background job running a custom report cancelled with a short dump "TIME_OUT". behavior.',
        options: [
            {
                id: 'opt1',
                text: 'Increase the system parameter "rdisp/max_wprun_time" to allow infinite runtime.',
                isCorrect: false,
                feedback: 'Bad practice. Infinite runtimes clog up the system processes. The program is likely inefficient.'
            },
            {
                id: 'opt2',
                text: 'Tell the developer to optimize the code (e.g., use "FOR ALL ENTRIES", proper indices, avoid nested loops).',
                isCorrect: true,
                feedback: 'Correct! TIME_OUT means the program ran longer than the allowed limit (usually 10-15 mins for dialog, longer for background). The root cause is usually inefficient "Select inside Loop" logic.'
            },
            {
                id: 'opt3',
                text: 'Run it in the foreground instead.',
                isCorrect: false,
                feedback: 'Foreground (Dialog) limits are even stricter than background limits. This will crash even faster.'
            }
        ],
        explanation: 'Performance tuning is a key skill. A TIME_OUT is almost always a "Select * inside a Loop" or a missing database index.'
    }
];
