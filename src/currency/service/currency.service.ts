import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currency } from '../../entity/currency.entity'; // Adjust the path as needed
import { InjectRepository } from '@nestjs/typeorm';
import { CurrenciesResponseDto } from '../Dtos/currencies.response.dtos';

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
    const conversionRateManual = this.conversionRates[rateKey];
    console.log(rateKey, conversionRateManual);

    if (currencyFrom === currencyTo || !conversionRateManual) {
      return {
        error: `Conversion rate not available for ${currencyFrom} to ${currencyTo}`,
      };
    }

    const convertedAmount = amount * conversionRateManual;
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

  async listCurrencies(): Promise<string[]> {
    const currencies = await this.currencyRepository.find({
      select: ['currencyFrom'],
    });

    // Extract the "currencyFrom" property from each object and convert to an array of strings
    const uniqueCurrencies = currencies.map(
      (currency) => currency.currencyFrom,
    );

    return uniqueCurrencies;
  }
}
