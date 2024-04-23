import { Perfil } from '@prisma/client';

export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  idperfil: number;
  perfil: Perfil;
  iat?: number;
  exp?: number;
}
