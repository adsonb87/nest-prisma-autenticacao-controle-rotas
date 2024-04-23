import { Perfil } from '@prisma/client';

export class UserFromJwt {
  id: number;
  email: string;
  name: string;
  idperfil: number;
  perfil: Perfil;
}
