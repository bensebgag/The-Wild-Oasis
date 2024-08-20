export const CABIN_SORT_BY = new Map([
  ["name-asc", { $natural: 1 }],
  ["name-desc", { $natural: -1 }],
  ["regularPrice-asc", { regularPrice: 1 }],
  ["regularPrice-desc", { regularPrice: -1 }],
  ["maxCapacity-asc", { maxCapacity: 1 }],
  ["maxCapacity-desc", { maxCapacity: -1 }],
]);
