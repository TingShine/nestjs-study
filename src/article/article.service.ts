import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article>{
    constructor(@InjectRepository(Article) repo: Repository<Article>) {
        super(repo)
    }
}
