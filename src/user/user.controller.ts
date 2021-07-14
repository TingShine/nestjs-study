import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Role, Roles } from 'src/shared/decorators/roles.decorator';
import { XmlFormat } from 'src/shared/decorators/xml.decorator';
import { AuthGard } from 'src/shared/guard/auth.guard';
import { CreateUserDto } from './dto/creat-user.dto';
import { UserService } from './user.service';
import { js2xml } from 'xml-js'
import { ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller('/user')
@UseGuards(new AuthGard())
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async getUserInfo(@Req() req, @Body(new ValidationPipe()) user: CreateUserDto) {
        console.log(req.user);
        
        return "ok"
        
    }

    @Get()
    @Roles(Role.Guest)
    @XmlFormat()
    test() {
        return js2xml({"a":{"_attributes":{"x":"1.234","y":"It's"}}}, {compact: true, ignoreComment: true, spaces: 4})
    }

}
