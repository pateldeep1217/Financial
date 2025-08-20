import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// The main App component for the interactive financial sheet.
export default function App() {
  // A comprehensive lookup object for definitions to display on hover.
  const definitions = {
    revenues:
      "Total income generated from the primary business operations, such as room rentals.",
    roomRentalCosts:
      "Expenses directly tied to operating and maintaining guest rooms, like staffing and supplies.",
    deskClerks:
      "Front desk agents who handle check-ins, check-outs, and guest services.",
    nightAudit:
      "The overnight team that balances the day's financial transactions and prepares reports.",
    housekeeping:
      "The team responsible for cleaning and maintaining guest rooms and public areas.",
    execHousekeepingMgmtWages:
      "Salaries for management staff who oversee the housekeeping department.",
    deskClerkPayrollTaxes:
      "Taxes paid by the employer on the wages of desk clerks.",
    nightAuditorPayrollTaxes:
      "Taxes paid by the employer on the wages of night auditors.",
    housekeeperPayrollTaxes:
      "Taxes paid by the employer on the wages of housekeepers.",
    maidPayrollTaxes:
      "Taxes paid by the employer on the wages of maids/housekeepers.",
    roomsPaperProducts:
      "Consumable paper items provided to guests, such as toilet paper and tissues.",
    roomsPlasticProducts:
      "Consumable plastic items provided to guests, such as toiletries and cups.",
    soap: "Cost of soap and other hygiene products provided in guest rooms.",
    complimentaryProducts:
      "Free items provided to guests, like coffee, tea, or snacks.",
    other: "A catch-all for various small expenses not listed elsewhere.",
    cleaningSupplies:
      "Products used for general cleaning throughout the hotel.",
    laundrySupplies: "Detergents and other supplies used for hotel laundry.",
    softWaterCosts:
      "Expenses related to the softening of water for laundry and plumbing.",
    towels:
      "Cost of purchasing and replacing towels for guest rooms and public areas.",
    linen: "Cost of purchasing and replacing bed sheets and other linen.",
    lightBulbs: "Cost of light bulbs for the entire property.",
    carpets: "Cost of replacing or repairing carpets in the hotel.",
    roomsCashShortOver:
      "Accounting for small discrepancies between cash counted and cash recorded.",
    commissions:
      "Fees paid to online travel agencies or booking agents for reservations.",
    miscIncExpense:
      "Miscellaneous income or expenses not categorized elsewhere.",
    banquetOperatingCosts:
      "Expenses directly related to providing banquet and event services.",
    salesAndMarketing:
      "Costs for promoting the hotel and its services, including advertising and sales staff.",
    repairsAndMaintenance:
      "Costs for fixing and maintaining the hotel property and equipment.",
    rmPayroll: "Wages for staff in the repairs and maintenance department.",
    rmPayrollTaxes:
      "Taxes paid by the employer on the wages of repairs and maintenance staff.",
    plumbing:
      "Costs for repairing or maintaining the hotel's plumbing systems.",
    electrical:
      "Costs for repairing or maintaining the hotel's electrical systems.",
    paintRelated: "Expenses for paint and supplies for hotel maintenance.",
    smallTools: "Cost of small tools used by the maintenance staff.",
    maintenanceItems: "General items and parts for upkeep of the property.",
    serviceContracts:
      "Ongoing costs for service agreements, such as elevator or HVAC maintenance.",
    hvac: "Costs related to the heating, ventilation, and air conditioning systems.",
    refrigeration: "Costs for maintaining refrigeration units in the hotel.",
    locks: "Costs related to the maintenance or replacement of door locks.",
    painting: "Cost of labor for painting projects.",
    buildings: "Costs for structural and exterior maintenance of the building.",
    parkingLot: "Expenses for maintaining the hotel's parking lot.",
    grounds: "Costs for landscaping and maintaining the exterior grounds.",
    pool: "Expenses for maintaining the hotel's swimming pool.",
    furnishingsRooms: "Cost of furniture and decor for guest rooms.",
    furnishings: "Cost of furniture and decor for public areas.",
    contractLabor: "Costs for external labor hired for specific projects.",
    publicAreas:
      "Costs for maintaining areas accessible to the public, like the lobby or hallways.",
    banquetRooms: "Costs for maintaining banquet and event rooms.",
    laundryEquipment: "Costs for maintaining laundry equipment.",
    otherEquipment: "Costs for maintaining other hotel equipment.",
    snowRemoval: "Cost of removing snow from the property.",
    pestControl: "Costs for pest extermination and prevention services.",
    trashRemoval: "Fees for trash and recycling collection.",
    utilities: "Costs for public services such as electricity, gas, and water.",
    waterExpense: "Cost of water usage.",
    electricExpense: "Cost of electricity usage.",
    gasExpense: "Cost of natural gas usage.",
    generalAndAdministrative:
      "Overhead costs not tied to a specific department, like office supplies and management salaries.",
    gaPayroll: "Wages for general and administrative staff.",
    gaPayrollTaxes:
      "Taxes paid by the employer on general and administrative staff wages.",
    gaInsurance:
      "Insurance costs for the general and administrative department.",
    gaEmployeeIncentiveCost: "Costs for employee bonuses and incentives.",
    postage: "Costs for sending mail and packages.",
    flowersHotel: "Cost of flowers for hotel decor.",
    decorations: "Cost of seasonal or event decorations.",
    otherOfficeSupplies: "Cost of general office supplies.",
    payrollProcessingFees: "Fees paid to a company to process payroll.",
    copierPaperAndSupplies:
      "Cost of paper and supplies for copiers and printers.",
    monthlyBankCharges: "Fees charged by the bank for account services.",
    masterCardVisa: "Transaction fees paid to credit card companies.",
    memberships: "Fees for business memberships or associations.",
    donations: "Charitable contributions made by the business.",
    travelCosts: "Costs for employee travel.",
    businessMeals: "Costs for meals incurred during business activities.",
    accountingFees: "Fees paid for accounting and auditing services.",
    otherProfessional:
      "Fees for other professional services, such as legal counsel.",
    managementFees: "Fees paid to a management company to operate the hotel.",
    regionalOperationsManager:
      "Salary for a manager who oversees multiple hotel properties.",
    insurance: "General business insurance costs.",
    realEstateTaxes: "Property taxes on the hotel's land and building.",
    ohPteTaxExpense: "Taxes for a specific jurisdiction or type of business.",
    workersCompensationIns:
      "Insurance that covers employees who are injured on the job.",
    roomsLicenses: "Fees for licenses required to operate the hotel.",
    poolLicenses: "Fees for licenses required to operate the hotel's pool.",
    liquorLicenses: "Fees for licenses required to sell alcoholic beverages.",
    cityIncomeTaxExpense: "Taxes on business income paid to the city.",
    simpleMatch:
      "Employer's matching contribution to employee retirement plans.",
    otherInsTaxesLicenses:
      "Other miscellaneous insurance, tax, or license fees.",
    seminars: "Costs for employee training and professional development.",
    uniforms: "Cost of employee uniforms.",
    printingAndOfficeSupplies: "Cost of printed materials and office supplies.",
    otherExpenses:
      "A catch-all for various small expenses not listed elsewhere.",
    depreciation:
      "The non-cash expense of an asset losing value over time, such as furniture or equipment.",
    amortization:
      "The non-cash expense of an intangible asset (like a loan or patent) losing value over time.",
    interestExpense: "The cost of borrowing money for business operations.",
    otherIncome:
      "Income from sources other than the hotel's primary operations, such as vending machines or laundry services.",
  };

  // Initial financial data, stored in a ref to be able to reset.
  const initialData = useRef({
    revenues: 1820206,
    expenses: {
      roomRentalCosts: {
        amount2024: 582846,
        amount2023: 597079,
        items: {
          deskClerks: { amount2024: 145215, amount2023: 138237 },
          nightAudit: { amount2024: 61199, amount2023: 63340 },
          housekeeping: { amount2024: 184328, amount2023: 188651 },
          execHousekeepingMgmtWages: { amount2024: 43424, amount2023: 39543 },
          deskClerkPayrollTaxes: { amount2024: 11920, amount2023: 11179 },
          nightAuditorPayrollTaxes: { amount2024: 5225, amount2023: 5313 },
          housekeeperPayrollTaxes: { amount2024: 6350, amount2023: 5977 },
          maidPayrollTaxes: { amount2024: 13375, amount2023: 13831 },
          roomsPaperProducts: { amount2024: 9126, amount2023: 8195 },
          roomsPlasticProducts: { amount2024: 2480, amount2023: 5475 },
          soap: { amount2024: 8093, amount2023: 7844 },
          complimentaryProducts: { amount2024: 3871, amount2023: 4250 },
          other: { amount2024: 24716, amount2023: 25050 },
          cleaningSupplies: { amount2024: 5066, amount2023: 8588 },
          laundrySupplies: { amount2024: 14133, amount2023: 14764 },
          softWaterCosts: { amount2024: 101, amount2023: 466 },
          towels: { amount2024: 2663, amount2023: 4723 },
          linen: { amount2024: 3388, amount2023: 7817 },
          lightBulbs: { amount2024: 390, amount2023: 349 },
          carpets: { amount2024: 9591, amount2023: 8478 },
          roomsCashShortOver: { amount2024: 1119, amount2023: -1339 },
          commissions: { amount2024: 33707, amount2023: 52129 },
          miscIncExpense: { amount2024: -6634, amount2023: -15781 },
        },
      },
      banquetOperatingCosts: { amount2024: 31896, amount2023: 37895 },
      salesAndMarketing: { amount2024: 150478, amount2023: 158893 },
      repairsAndMaintenance: {
        amount2024: 177604,
        amount2023: 192133,
        items: {
          rmPayroll: { amount2024: 58273, amount2023: 62252 },
          rmPayrollTaxes: { amount2024: 4542, amount2023: 4410 },
          other: { amount2024: 242, amount2023: 160 },
          plumbing: { amount2024: 1674, amount2023: 5222 },
          electrical: { amount2024: 124, amount2023: 4423 },
          paintRelated: { amount2024: 102, amount2023: 2113 },
          smallTools: { amount2024: 24, amount2023: 0 },
          maintenanceItems: { amount2024: 6089, amount2023: 5159 },
          serviceContracts: { amount2024: 32668, amount2023: 31649 },
          hvac: { amount2024: 9204, amount2023: 3403 },
          refrigeration: { amount2024: 0, amount2023: 969 },
          locks: { amount2024: 0, amount2023: 940 },
          painting: { amount2024: 0, amount2023: 1030 },
          buildings: { amount2024: 1078, amount2023: 815 },
          parkingLot: { amount2024: 3935, amount2023: 1321 },
          grounds: { amount2024: 11263, amount2023: 12208 },
          pool: { amount2024: 8379, amount2023: 17795 },
          furnishingsRooms: { amount2024: 1207, amount2023: 966 },
          furnishings: { amount2024: 0, amount2023: 1528 },
          contractLabor: { amount2024: 11436, amount2023: 13492 },
          publicAreas: { amount2024: 8114, amount2023: 4111 },
          banquetRooms: { amount2024: 2127, amount2023: 929 },
          laundryEquipment: { amount2024: 960, amount2023: 1923 },
          otherEquipment: { amount2024: 3119, amount2023: 2477 },
          snowRemoval: { amount2024: 772, amount2023: 735 },
          pestControl: { amount2024: 5395, amount2023: 5191 },
          trashRemoval: { amount2024: 6877, amount2023: 6812 },
        },
      },
      utilities: {
        amount2024: 65438,
        amount2023: 57204,
        items: {
          waterExpense: { amount2024: 4413, amount2023: 4355 },
          electricExpense: { amount2024: 51884, amount2023: 44578 },
          gasExpense: { amount2024: 9141, amount2023: 8271 },
        },
      },
      generalAndAdministrative: {
        amount2024: 436780,
        amount2023: 415161,
        items: {
          gaPayroll: { amount2024: 64829, amount2023: 62125 },
          gaPayrollTaxes: { amount2024: 5136, amount2023: 4894 },
          gaInsurance: { amount2024: 294, amount2023: 650 },
          gaEmployeeIncentiveCost: { amount2024: 17201, amount2023: 9263 },
          postage: { amount2024: 247, amount2023: 42 },
          flowersHotel: { amount2024: 472, amount2023: 1191 },
          decorations: { amount2024: 230, amount2023: 470 },
          otherOfficeSupplies: { amount2024: 2858, amount2023: 2652 },
          payrollProcessingFees: { amount2024: 3049, amount2023: 4158 },
          copierPaperAndSupplies: { amount2024: 3944, amount2023: 7984 },
          other: { amount2024: 7492, amount2023: 1099 },
          monthlyBankCharges: { amount2024: 199, amount2023: 185 },
          masterCardVisa: { amount2024: 67848, amount2023: 60067 },
          memberships: { amount2024: 1609, amount2023: 1176 },
          donations: { amount2024: 1, amount2023: 150 },
          travelCosts: { amount2024: 1318, amount2023: 1271 },
          businessMeals: { amount2024: 268, amount2023: 540 },
          accountingFees: { amount2024: 13230, amount2023: 13080 },
          otherProfessional: { amount2024: 6425, amount2023: 5972 },
          managementFees: { amount2024: 96193, amount2023: 96873 },
          regionalOperationsManager: { amount2024: 12840, amount2023: 15220 },
          insurance: { amount2024: 49064, amount2023: 47420 },
          realEstateTaxes: { amount2024: 55315, amount2023: 55034 },
          ohPteTaxExpense: { amount2024: 7000, amount2023: 0 },
          workersCompensationIns: { amount2024: 0, amount2023: 1982 },
          roomsLicenses: { amount2024: 161, amount2023: 75 },
          poolLicenses: { amount2024: 659, amount2023: 0 },
          liquorLicenses: { amount2024: 2844, amount2023: 2844 },
          cityIncomeTaxExpense: { amount2024: 2930, amount2023: 1504 },
          simpleMatch: { amount2024: 8102, amount2023: 7946 },
          otherInsTaxesLicenses: { amount2024: 2628, amount2023: 4236 },
          seminars: { amount2024: 171, amount2023: 0 },
          uniforms: { amount2024: 2082, amount2023: 3265 },
          printingAndOfficeSupplies: { amount2024: 141, amount2023: 1693 },
        },
      },
      otherExpenses: { amount2024: 28161, amount2023: 33071 },
      depreciation: { amount2024: 116815, amount2023: 143894 },
      amortization: { amount2024: 0, amount2023: 821 },
      interestExpense: { amount2024: 12745, amount2023: 17218 },
    },
    otherIncome: 6677,
    // Historical data added here
    incomeHistory: {
      2019: {
        occupancy: "64.34%",
        adr: 93.9,
        revpar: 60.42,
        room: 1210216,
        foodBeverage: 50706,
        other: 15744,
        totalIncome: 1276677,
      },
      2020: {
        occupancy: "52.57%",
        adr: 91.08,
        revpar: 47.88,
        room: 1071304,
        foodBeverage: 29451,
        other: 14504,
        totalIncome: 1115261,
      },
      2021: {
        occupancy: "66.41%",
        adr: 96.25,
        revpar: 63.92,
        room: 1427087,
        foodBeverage: 48088,
        other: 22946,
        totalIncome: 1498122,
      },
      2022: {
        occupancy: "77.33%",
        adr: 95.98,
        revpar: 74.23,
        room: 1618760,
        foodBeverage: 55394,
        other: 16743,
        totalIncome: 1690898,
      },
      2023: {
        occupancy: "74.44%",
        adr: 108.78,
        revpar: 80.98,
        room: 1767873,
        foodBeverage: 50791,
        other: 19071,
        totalIncome: 1837736,
      },
      2024: {
        occupancy: "71.09%",
        adr: 111.85,
        revpar: 79.52,
        room: 1761602,
        foodBeverage: 48459,
        other: 1838,
        totalIncome: 1825080,
      },
    },
  });

  // State for the financial data, which is now mutable.
  const [financialData, setFinancialData] = useState(initialData.current);
  // State to hold the totals and net income, which are calculated dynamically.
  const [totals, setTotals] = useState({
    totalExpenses2024: 0,
    netIncome2024: 0,
  });

  // New state to manage the visibility of the historical data modal.
  const [showHistoricalModal, setShowHistoricalModal] = useState(false);

  // Helper function to format numbers as currency with commas.
  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Helper function to format numbers as currency with decimal points.
  const formatDecimal = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Helper function to calculate and update totals.
  const calculateTotals = () => {
    let totalExpenses2024 = 0;

    // Sum all expense categories for 2024.
    for (const key in financialData.expenses) {
      if (financialData.expenses[key].amount2024 !== undefined) {
        totalExpenses2024 += financialData.expenses[key].amount2024;
      }
    }

    const netIncome2024 =
      financialData.revenues - totalExpenses2024 + financialData.otherIncome;

    setTotals({
      ...totals,
      totalExpenses2024,
      netIncome2024,
    });
  };

  // Effect to re-calculate totals whenever financial data changes.
  useEffect(() => {
    calculateTotals();
  }, [financialData]);

  // Handle changes to the input fields.
  const handleInputChange = (e, category, subcategory) => {
    const { value } = e.target;
    // Remove non-numeric characters (like '$' and ',') before parsing.
    const cleanedValue = value.replace(/[$,]/g, "");
    const numValue = isNaN(parseFloat(cleanedValue))
      ? 0
      : parseFloat(cleanedValue);

    setFinancialData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (subcategory) {
        newData.expenses[category].items[subcategory].amount2024 = numValue;
      } else {
        newData.expenses[category].amount2024 = numValue;
      }
      // Recalculate parent category total if a subcategory is edited.
      if (subcategory) {
        newData.expenses[category].amount2024 = Object.values(
          newData.expenses[category].items
        ).reduce((sum, item) => sum + item.amount2024, 0);
      }
      return newData;
    });
  };

  // Handle revert click for a single item.
  const handleRevertClick = (category, subcategory) => {
    setFinancialData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      const originalValue = subcategory
        ? initialData.current.expenses[category].items[subcategory].amount2024
        : initialData.current.expenses[category].amount2024;

      if (subcategory) {
        newData.expenses[category].items[subcategory].amount2024 =
          originalValue;
        // Recalculate parent total after reverting a sub-item
        newData.expenses[category].amount2024 = Object.values(
          newData.expenses[category].items
        ).reduce((sum, item) => sum + item.amount2024, 0);
      } else {
        newData.expenses[category].amount2024 = originalValue;
      }
      return newData;
    });
  };

  // Handle click to reset all data.
  const handleReset = () => {
    setFinancialData(initialData.current);
  };

  // Render a single financial row.
  const renderRow = (
    label,
    amount2024,
    editable = false,
    category = "",
    subcategory = ""
  ) => {
    const key = subcategory || category;
    const hasDefinition = definitions[key] !== undefined;
    const originalValue = subcategory
      ? initialData.current.expenses[category].items[subcategory].amount2024
      : initialData.current.expenses[category].amount2024;
    const isEdited = amount2024 !== originalValue;

    return (
      <div
        key={key}
        className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 py-2 sm:py-3"
      >
        <div className="flex-1 text-left flex items-center mb-1 sm:mb-0">
          <span className="font-semibold text-sm sm:text-base">{label}</span>
          {hasDefinition && (
            <span className="relative inline-block ml-2 group cursor-pointer text-gray-400 hover:text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Tooltip that is now responsive to prevent overflow on mobile */}
              <span className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-sm p-2 text-xs text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:left-full md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:mb-0 md:ml-2">
                {definitions[key]}
              </span>
            </span>
          )}
        </div>
        <div className="flex items-center w-full sm:w-auto">
          {editable ? (
            <div className="flex flex-col sm:flex-row items-end sm:items-center w-full space-y-1 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                className="w-full text-right font-mono p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={formatCurrency(amount2024)}
                onChange={(e) => handleInputChange(e, category, subcategory)}
              />
              {isEdited && (
                <button
                  onClick={() => handleRevertClick(category, subcategory)}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Revert to original value"
                  title="Revert to original value"
                >
                  Revert
                </button>
              )}
            </div>
          ) : (
            <span className="text-right font-mono text-sm sm:text-base">
              {formatCurrency(amount2024)}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Render a main category with a collapsible list of items.
  const renderCategory = (category) => {
    const { amount2024, items } = financialData.expenses[category];
    const categoryName = category
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    // Do not sort the items; maintain the original order from the data structure.
    const itemKeys = items ? Object.keys(items) : [];

    return (
      <div
        key={category}
        className="bg-white rounded-lg p-3 sm:p-4 mb-3 shadow-xl"
      >
        <div className="flex items-center justify-between pb-2 border-b-2 border-indigo-200">
          <h2 className="text-base sm:text-lg font-bold text-indigo-700">
            {categoryName}
          </h2>
          <span className="font-mono text-base sm:text-lg">
            {formatCurrency(amount2024)}
          </span>
        </div>
        <div className="mt-2 pl-0 sm:pl-4">
          {itemKeys.map((key) => {
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            return renderRow(label, items[key].amount2024, true, category, key);
          })}
        </div>
      </div>
    );
  };

  const TotalsPanel = () => {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-xl mb-4 md:mb-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700">
            Summary
          </h2>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs sm:text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Reset All
          </button>
        </div>

        <div className="flex flex-col space-y-1 mt-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700 text-sm">
              Total Expenses
            </span>
            <span className="font-mono text-sm">
              {formatCurrency(totals.totalExpenses2024)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700 text-sm">
              Other Income
            </span>
            <span className="font-mono text-sm">
              {formatCurrency(financialData.otherIncome)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-base sm:text-lg">
              Net Income (Loss)
            </span>
            <span
              className={`font-mono text-lg sm:text-xl ${
                totals.netIncome2024 < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {formatCurrency(totals.netIncome2024)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowHistoricalModal(true)}
          className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm"
        >
          View Historical Data
        </button>
      </div>
    );
  };

  // Separate component for the historical data modal.
  const HistoricalDataModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const history = financialData.incomeHistory;

    return createPortal(
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-4xl max-h-full overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-extrabold text-indigo-700 mb-6">
            Historical Income & Performance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(history).map((year) => (
              <div
                key={year}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Year {year}
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupancy:</span>{" "}
                    <span className="font-semibold text-gray-800">
                      {history[year].occupancy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ADR:</span>{" "}
                    <span className="font-semibold text-gray-800">
                      {formatDecimal(history[year].adr)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RevPAR:</span>{" "}
                    <span className="font-semibold text-gray-800">
                      {formatDecimal(history[year].revpar)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room:</span>{" "}
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(history[year].room)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Food/Beverage:</span>{" "}
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(history[year].foodBeverage)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Other:</span>{" "}
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(history[year].other)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300 font-bold">
                    <span>Total Income:</span>{" "}
                    <span>{formatCurrency(history[year].totalIncome)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans text-gray-800 overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-8">
        <div className="md:flex-1">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center md:text-left text-indigo-700">
              Financial Performance Analysis
            </h1>
            <p className="text-center md:text-left text-gray-600 text-sm mt-1">
              Edit the 2024 expense numbers to see how they impact your profit
              in real time. Hover over the 'i' icon for definitions!
            </p>
          </div>

          {/* Main content area */}
          <div className="md:hidden">
            <TotalsPanel />
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-xl mb-3">
            <h2 className="text-base sm:text-lg font-bold text-indigo-700 mb-2">
              Income
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-2">
              <span className="flex-1 font-semibold text-gray-700 text-sm">
                Revenues
              </span>
              <span className="font-mono text-sm text-right">
                {formatCurrency(financialData.revenues)}
              </span>
            </div>
          </div>

          {renderCategory("roomRentalCosts")}
          {renderCategory("repairsAndMaintenance")}
          {renderCategory("utilities")}
          {renderCategory("generalAndAdministrative")}

          {/* Other expenses */}
          <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 shadow-xl">
            <h2 className="text-base sm:text-lg font-bold text-indigo-700 mb-2">
              Other Expenses
            </h2>
            {renderRow(
              "Banquet operating costs",
              financialData.expenses.banquetOperatingCosts.amount2024,
              true,
              "banquetOperatingCosts"
            )}
            {renderRow(
              "Sales and marketing",
              financialData.expenses.salesAndMarketing.amount2024,
              true,
              "salesAndMarketing"
            )}
            {renderRow(
              "Other expenses",
              financialData.expenses.otherExpenses.amount2024,
              true,
              "otherExpenses"
            )}
            {renderRow(
              "Depreciation",
              financialData.expenses.depreciation.amount2024,
              true,
              "depreciation"
            )}
            {renderRow(
              "Amortization",
              financialData.expenses.amortization.amount2024,
              true,
              "amortization"
            )}
            {renderRow(
              "Interest expense",
              financialData.expenses.interestExpense.amount2024,
              true,
              "interestExpense"
            )}
          </div>
        </div>

        {/* Desktop sidebar - sticky on medium screens and up */}
        <div className="hidden md:block md:w-80 md:sticky md:top-8 md:self-start">
          <TotalsPanel />
        </div>
      </div>
      <HistoricalDataModal
        isOpen={showHistoricalModal}
        onClose={() => setShowHistoricalModal(false)}
      />
    </div>
  );
}
