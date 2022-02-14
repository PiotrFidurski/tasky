type CompareArg = { sortDate: Date };

export function sortByDate(a: CompareArg, b: CompareArg) {
  return a.sortDate <= b.sortDate ? -1 : 1;
}
