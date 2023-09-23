import { IsString, IsNumber } from 'class-validator';

export class convertCurrenciesDTO {
  @IsString()
  currencyFrom: string;

  @IsString()
  currencyTo: string;

  @IsNumber()
  amount: number;
}
