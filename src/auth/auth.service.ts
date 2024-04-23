/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user): Promise<UserToken> {
    //console.log('user: ' + user);

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      idperfil: user.idperfil,
      perfil: user.perfil,
    };

    //console.log('payload: ' + payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    if (!email || !password) {
      throw new UnauthorizedError(
        'Credenciais de login não fornecidas corretamente.',
      );
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError(
        'Nenhum usuário encontrado com o email fornecido.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return {
        ...user,
        password: undefined,
      };
    }

    throw new UnauthorizedError(
      'O endereço de email ou a senha fornecida está incorreto.',
    );
  }
}
