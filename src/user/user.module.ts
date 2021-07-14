import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoginModule } from './login/login.module';
import { User } from './entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
  controllers: [ UserController],
  imports: [TypeOrmModule.forFeature([User]), LoginModule],
  providers: [UserService]
})
export class UserModule {}
