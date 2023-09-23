import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class convertCurrenciesDTO {
  @IsNotEmpty()
  @IsString()
  currencyFrom: string;

  @IsNotEmpty()
  @IsString()
  currencyTo: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
