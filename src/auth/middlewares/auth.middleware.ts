import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserPayload } from '../models/UserPayload';

//middleware responsável pela validação das rotas
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      //console.log(req.user);

      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request & { user: UserPayload }, res: Response, next: NextFunction) {
    const userRole = req.user.perfil.nome;

    // Verifica se o usuário é admin ou user
    if (userRole === 'ADMIN' || (userRole === 'USER' && req.method === 'GET')) {
      next();
    } else {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}
