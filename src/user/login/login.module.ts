import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/shared/auth/auth.module';
import { User } from '../entity/user.entity';
import { LoginController } from './login.controller'
import { LoginService } from './login.service';
@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([User]), AuthModule],
    controllers: [LoginController],
    providers: [LoginService]
})
export class LoginModule {}
