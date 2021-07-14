import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { NetworkService } from "../../shared/network/network.service"
import { User } from '../entity/user.entity'

@Injectable()
export class LoginService {
    constructor(private httpService: NetworkService,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    getSessionId(code = ""): Observable<any> {
        const params = {
            js_code: code,
            appid: "",  // 小程序的appid
            secret: "",   // 小程序的secret
            grant_type: "authorization_code"
        }
        return this.httpService.get({
            url: `https://api.weixin.qq.com/sns/jscode2session`,
            params
        })
    }

    async findOrCreateUser(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(id)
        if(!user) {
            const newUser = new User()
            newUser.id = id
            return await this.usersRepository.save(newUser)
        }
        return user
    }

    async findOne(id: string, role: string): Promise<boolean> {
        const user = await this.usersRepository.findOne(id)
        if(!user) return false
        if(user.role !== role) return false
        return true
    }
    
}