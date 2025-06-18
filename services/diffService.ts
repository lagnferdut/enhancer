
import { diffChars, Change } from 'diff'; // Assuming 'diff' library is installed
import { DiffResultPart } from '../types';

export const calculateDiff = (originalText: string, newText: string): DiffResultPart[] => {
  const differences = diffChars(originalText, newText);
  return differences.map((part: Change) => ({
    value: part.value,
    added: part.added,
    removed: part.removed,
    count: part.count || 0, // Ensure count is always a number
  }));
};

export const calculatePercentageChange = (originalText: string, diffResult: DiffResultPart[]): number => {
  if (!originalText || originalText.length === 0) {
    return diffResult.some(part => part.added) ? 100 : 0; // If original is empty, any addition is 100% change
  }

  let changedLength = 0;
  diffResult.forEach(part => {
    if (part.added || part.removed) {
      changedLength += part.value.length;
    }
  });
  
  const originalLength = originalText.length;
  if (originalLength === 0) return 0; // Avoid division by zero if somehow originalText became empty after first check

  const percentage = (changedLength / originalLength) * 100;
  return Math.min(percentage, 100); // Cap at 100% for sensibility
};
