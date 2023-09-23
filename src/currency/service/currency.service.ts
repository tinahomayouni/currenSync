import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currency } from '../../entity/currency.entity'; // Adjust the path as needed
import { InjectRepository } from '@nestjs/typeorm';
import { currenciesResponseDto } from '../Dtos/currencies.response.dtos';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  private conversionRates: Record<string, number> = {
    USD_TO_EUR: 0.94,
    EUR_TO_USD: 1.06, // Add more conversion rates as needed
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
    console.log(rateKey, conversionRate);

    if (currencyFrom === currencyTo || !conversionRate) {
      return {
        error: `Conversion rate not available for ${currencyFrom} to ${currencyTo}`,
      };
    }

    const convertedAmount = amount * conversionRate;
    console.log(convertedAmount, 'convertedAmount');

    // Save the conversion data to the database
    const currencyEntity = new Currency();
    currencyEntity.currencyFrom = currencyFrom;
    currencyEntity.currencyTo = currencyTo;
    currencyEntity.amount = amount;
    currencyEntity.convertedAmount = convertedAmount;

    await this.currencyRepository.save(currencyEntity);
    return { result: convertedAmount };
  }

  async listCurrencies(): Promise<currenciesResponseDto[]> {
    const currencies = await this.currencyRepository.find({
      select: ['currencyFrom'],
    });

    // Use Set to remove repeated items
    const uniqueCurrencySet = new Set(currencies);

    // Convert the Set back to an array
    const uniqueCurrencyArray = Array.from(uniqueCurrencySet);

    return uniqueCurrencyArray;
  }
}
