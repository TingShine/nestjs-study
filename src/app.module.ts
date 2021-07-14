import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NetworkModule } from './shared/network/network.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { TfidfService } from './tfidf/tfidf.service';
import { TfidfModule } from './tfidf/tfidf.module';
import { WordcountModule } from './wordcount/wordcount.module';

const TypeOrm = TypeOrmModule.forRoot({
  type: 'mysql',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: "",
  autoLoadEntities: true,
  synchronize: true
})

@Module({
  imports: [TypeOrm, ArticleModule, UserModule, NetworkModule, WordcountModule],
  controllers: [AppController],
  providers: [AppService, TfidfService],
})
export class AppModule {
}
