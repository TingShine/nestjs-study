import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async findOrCreateUser(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(id)
        if (!user) {
            const newUser = new User()
            newUser.id = id
            return await this.usersRepository.save(newUser)
        }
        return user
    }

    async updateUser(user: User): Promise<boolean> {
        const { id } = user
        const result: UpdateResult = await this.usersRepository.update({ id }, user)
        const { affected } = result
        return affected === 1 ? true : false
    }
}