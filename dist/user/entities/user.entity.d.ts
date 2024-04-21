import { User } from '@prisma/client';
export declare class UserEntity implements User {
    id: number;
    email: string;
    password: string;
    name: string;
    idPerfil: number;
}
