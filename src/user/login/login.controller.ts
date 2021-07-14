import { Put, Req, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Res, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/shared/auth/auth.service';
import { LoginParams } from '../dto/login.dto';
import { User } from '../entity/user.entity';
import { LoginService } from './login.service'
import { Role, Roles } from 'src/shared/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('user')
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        private readonly authService: AuthService
    ) { }

    @Post("login")
    @Roles(Role.Guest)
    @HttpCode(200)
    @ApiTags("微信登录")
    wxLogin(@Body(new ValidationPipe()) data: LoginParams, @Res() res) {
        return new Observable(subscriber => {
            const { code } = data
            const observer1 = this.loginService.getSessionId(`${code}`)
            observer1.subscribe({
                next: async (value) => {
                    const { openid, errcode } = value
                    if(!openid) {
                        if(errcode === 40029) {
                            subscriber.error(new HttpException("code is invalid", HttpStatus.BAD_REQUEST))
                        } else {
                            subscriber.error(new HttpException("server error", HttpStatus.INTERNAL_SERVER_ERROR))
                        }
                        subscriber.complete()
                        return
                    }
                    const user: User = await this.loginService.findOrCreateUser(openid)
                    
                    const token = this.authService.sign({ id: user.id, role: user.role })
                    res.json({ code: 200, data: {token}, message: "Success"})
                }
            })
        })
        
    }

    @Post("refreshToken")
    @HttpCode(200)
    /** 刷新Token */
    refreshToken(@Req() req) {
        const { user } = req
        const newToken = this.authService.sign(user)
        return { token: newToken }
    }
}
