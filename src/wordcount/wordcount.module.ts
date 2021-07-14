import { Module } from '@nestjs/common';
import { WordcountService } from './wordcount.service';
import { WordcountController } from './wordcount.controller';

@Module({
  providers: [WordcountService],
  controllers: [WordcountController]
})
export class WordcountModule {}
