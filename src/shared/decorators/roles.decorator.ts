import { SetMetadata } from '@nestjs/common'

export enum Role {
    Guest = "guest",
    User = "user",
    Admin = "admin",
    SuperAdmin = "superAdmin"
}

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)