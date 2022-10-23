import { AppUser } from "./app-user.model";

export interface AppUserPageRespone {
    content: AppUser[],
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number;
}
