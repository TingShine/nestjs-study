import { Module } from '@nestjs/common';
import { TfidfController } from './tfidf.controller';
import { TfidfService } from './tfidf.service';

@Module({
  controllers: [TfidfController],
  providers: [TfidfService]
})
export class TfidfModule {}
