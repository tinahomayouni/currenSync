import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from '../service/currency.service';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'; // Import Swagger decorators
import { ConvertCurrenciesDTO } from '../Dtos/covertCurrencies.request.dtos';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert') //http://localhost:3000/currency/convert?currency-from=USD&currency-to=EUR&amount=100
  @ApiOperation({ summary: 'Convert currency' }) // add text beside api url as description
  @ApiResponse({
    status: 200,
    description: 'Currency conversion result',
  })
  async convertCurrency(@Query() query: ConvertCurrenciesDTO) {
    const { currencyFrom, currencyTo, amount } = query;
    const convertedAmount = await this.currencyService.convertCurrency(
      currencyFrom,
      currencyTo,
      amount,
    );
    console.log('CurrencyController');
    return {
      currencyFrom,
      currencyTo,
      amount,
      convertedAmount,
    };
  }
  @Get('currencies') // http://localhost:3000/currency/currencies
  async listCurrencies() {
    const currencies = await this.currencyService.listCurrencies();
    return currencies;
  }
}
