import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entity/user.entity";
import { AuthService } from "./auth.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}