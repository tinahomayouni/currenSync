import { Module } from '@nestjs/common';
import { CurrencyService } from '../service/currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from 'src/entity/currency.entity';
import { CurrencyController } from '../controller/currency.controller';

@Module({
  controllers: [CurrencyController],
  imports: [TypeOrmModule.forFeature([Currency])],
  providers: [CurrencyService],
})
export class CurrencyModule {}
