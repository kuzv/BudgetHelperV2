import { CurrencyOption } from '@/types';

export const formatCurrency = (
  amount: number,
  currency?: CurrencyOption
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency?.code || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Replace the currency symbol from the formatter with our custom one
  const formatted = formatter.format(amount);
  if (currency) {
    return formatted.replace(/^\D+/, currency.symbol);
  }
  
  return formatted;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Format: May 15, 2025
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};