import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from '../service/currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert') // Specify the correct route path
  async convertCurrency(
    @Query('currency-from') currencyFrom: string,
    @Query('currency-to') currencyTo: string,
    @Query('amount') amount: number,
  ) {
    const convertedAmount = await this.currencyService.convertCurrency(
      currencyFrom,
      currencyTo,
      amount,
    );
    return {
      currencyFrom,
      currencyTo,
      amount,
      convertedAmount,
    };
  }
}
