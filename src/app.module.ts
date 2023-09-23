// app.module.ts
import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/modulle/currency.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CurrencyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
