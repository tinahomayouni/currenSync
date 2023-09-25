import { Injectable, Inject, BadRequestException } from '@nestjs/common';
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
  ): Promise<number> {
    const rateKey = `${currencyFrom.toUpperCase()}_TO_${currencyTo.toUpperCase()}`;
    const conversionRateManual = this.conversionRates[rateKey];
    console.log(rateKey, conversionRateManual);

    if (currencyFrom === currencyTo || !conversionRateManual) {
      throw new BadRequestException(
        `Conversion rate not available for ${currencyFrom} to ${currencyTo}`, //handle error by nest
      );
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
    return convertedAmount;
  }

  async listCurrencies(): Promise<string[]> {
    const currencies = await this.currencyRepository.find({
      select: ['currencyFrom'],
    });

    // Use Set to remove repeated items
    const uniqueCurrencySet = new Set<string>();

    // Extract the "currencyFrom" property from each object and add it to the Set
    currencies.forEach((currency) => {
      uniqueCurrencySet.add(currency.currencyFrom);
    });

    // Convert the Set back to an array
    const uniqueCurrencyArray = Array.from(uniqueCurrencySet);

    return uniqueCurrencyArray;
  }
}
