import { Perfil } from '@prisma/client';
export declare class UserFromJwt {
    id: number;
    email: string;
    name: string;
    idperfil: number;
    perfil: Perfil;
}
