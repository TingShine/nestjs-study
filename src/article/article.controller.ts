import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud'
import { Role, Roles } from 'src/shared/decorators/roles.decorator';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';

@Crud({
    model: {
        type: Article
    },
    routes: {
        getManyBase: {
            decorators: [Roles(Role.Guest)]
        },
        getOneBase: {
            decorators: [Roles(Role.Guest)]
        },
    },
    query: {
        limit: 100,
        alwaysPaginate: true
    }
})
@ApiTags("article")
@Controller('article')
export class ArticleController implements CrudController<Article> {
    constructor(public service: ArticleService) {}


}
