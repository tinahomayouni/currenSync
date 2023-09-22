import { Module } from '@nestjs/common';
import { CurrencyController } from '../controller/currency.controller';
import { CurrencyService } from '../service/currency.service';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
