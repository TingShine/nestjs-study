import { Injectable, CanActivate, ExecutionContext  } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { Reflector } from '@nestjs/core'
import { Role, ROLES_KEY } from '../decorators/roles.decorator'

interface IRequest {
    Authorization?: string
    [key: string]: any
}

@Injectable()
export class AuthGard implements CanActivate {
    private readonly authService: AuthService = new AuthService()

    private reflector: Reflector = new Reflector()

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: IRequest = context.switchToHttp().getRequest()
        const { authorization } = request.headers

        // 判断是否为guest，则不需要认证即可校验通过
        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(), context.getClass()
        ]) || []
        if(requireRoles.includes(Role.Guest)) {
            return true
        }

        // 权限校验
        if(authorization) {
            const user = await this.authService.validate(authorization)
            const { role } = user
            // 需要超级管理员身份
            if(requireRoles.includes(Role.SuperAdmin) && role !== Role.SuperAdmin) {
                return false
            }
            // 需要普通管理员身份
            if(requireRoles.includes(Role.Admin) && role !== Role.SuperAdmin && role !== Role.SuperAdmin) {
                return false
            }
            // 需要普通用户身份
            if(requireRoles.includes(Role.User) && role === Role.Guest) {
                return false
            }
            if(user) {
                request.user = user
                return true
            }
        }
        return false
    }
}