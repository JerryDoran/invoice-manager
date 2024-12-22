import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type FormatCurrencyProps = {
  amount: number;
  currency: 'USD' | 'EUR';
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency({ amount, currency }: FormatCurrencyProps) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
