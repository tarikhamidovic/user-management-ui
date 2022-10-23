import { Permission } from "./permission.enum";

export interface AppUser {
    id: number,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    status: string,
    permissions: Permission[]
}
