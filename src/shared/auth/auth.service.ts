import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isJWT } from 'class-validator';
import { jwtkey } from '../config';

@Injectable()
export class AuthService {
    private readonly jwtService = new JwtService({
        secret: jwtkey,
        signOptions: {
            expiresIn: "10h"
        }
    })

    sign(payload: any): string {
        return this.jwtService.sign(payload)
    }

    /**
     * 验证用户传的token
     * @param {string} payload 用户传的token
     * @returns {boolean} 是否是数据库所存用户
     */
    async validate(payload: string) {
        if (!isJWT(payload)) {
            throw new HttpException("Token is invalid", HttpStatus.UNAUTHORIZED)
        }
        try {
            const rawData = this.jwtService.verify(payload)
            const { id, role } = rawData
            // 判断jwt是否合法
            if (!id || !role) {
                throw new HttpException("Token is invalid", HttpStatus.UNAUTHORIZED)
            }
            return { id, role}
        } catch (e) {
            Logger.error(e?.message)
            throw new HttpException("Token has been expired, please login again", HttpStatus.UNAUTHORIZED)
        }
    }
}
