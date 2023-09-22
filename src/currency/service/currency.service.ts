import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  private conversionRates: Record<string, number> = {
    USD_TO_EUR: 0.94,
    EUR_TO_USD: 1.06,
    // Add more conversion rates as needed
  };

  async convertCurrency(
    currencyFrom: string,
    currencyTo: string,
    amount: number,
  ): Promise<{ result: number } | { error: string }> {
    if (!currencyFrom || !currencyTo || !amount) {
      return { error: 'Invalid query parameters.' };
    }

    const rateKey = `${currencyFrom.toUpperCase()}_TO_${currencyTo.toUpperCase()}`;
    const conversionRate = this.conversionRates[rateKey];

    if (currencyFrom == currencyTo || !conversionRate) {
      return {
        error: `Conversion rate not available for ${currencyFrom} to ${currencyTo}`,
      };
    }

    return { result: amount * conversionRate };
  }
}
