export const SAMPLE_ITEMS_HOME = [
  {
    itemNo: 1,
    name: "FUTURE DEVELOPMENT",
    totalQuantity: 1,
    expiryDate: "2023-07-24",
  },
  {
    itemNo: 2,
    name: "FUTURE DEVELOPMENT",
    totalQuantity: 5,
    expiryDate: "2023-07-16",
  },
  {
    itemNo: 3,
    name: "FUTURE DEVELOPMENT",
    totalQuantity: 2,
    expiryDate: "2023-07-14",
  },
];

export const SAMPLE_ITEMS_BATCHES = [
  {
    itemNo: 1,
    name: "Dynamo Liquid Detergent 2.5L",
    quantity: 1,
    purchaseDate: "2023-02-04",
    expiryDate: "2024-07-24",
    purchasedFrom: "Cold Storage",
    price: 8.9,
  },
  {
    itemNo: 2,
    name: "Dettol Hand Wash Refill 225mL",
    quantity: 3,
    purchaseDate: "2023-01-01",
    expiryDate: "2025-07-07",
    purchasedFrom: "Amazon SG",
    price: 2,
  },
  {
    itemNo: 2,
    name: "Dettol Hand Wash Refill 225mL",
    quantity: 2,
    purchaseDate: "2023-04-06",
    expiryDate: "2025-12-09",
    purchasedFrom: "NTUC FairPrice",
    price: 1.9,
  },
  {
    itemNo: 3,
    name: "Fresh Milk Meiji 1.8L",
    quantity: 2,
    purchaseDate: "2023-06-26",
    expiryDate: "2023-07-14",
    purchasedFrom: "NTUC FairPrice",
    price: 5.3,
  },
];

export const SAMPLE_ITEM_DETAIL = [
  {
    itemNo: 2,
    name: "Dettol Hand Wash Refill 225mL",
    lowInventoryAlert: true,
    inventoryThreshold: 1,
    expiryDateAlert: true,
    daysBeforeExpiryDate: 7,
    itemDetails: [
      {
        purchaseDate: "2023-04-06",
        quantity: 2,
        expiryDate: "2025-12-09",
        purchasedFrom: "NTUC FairPrice",
        price: 1.9,
      },
      {
        purchaseDate: "2023-01-01",
        quantity: 3,
        expiryDate: "2025-07-07",
        purchasedFrom: "Amazon SG",
        price: 2,
      },
    ],
    checkoutRecord: [
      {
        purchaseDate: "2023-01-01",
        checkoutDate: "2023-06-15",
        quantity: 1,
      },
      {
        purchaseDate: "2023-01-01",
        checkoutDate: "2023-05-10",
        quantity: 1,
      },
      {
        purchaseDate: "2023-01-01",
        checkoutDate: "2023-04-03",
        quantity: 1,
      },
    ],
  },
];

export const SAMPLE_CATEGORIES = [
  "All",
  "Food",
  "Beverages",
  "Oral Hygine",
  "Cleaning Supplies",
  "Health Supplement",
];
