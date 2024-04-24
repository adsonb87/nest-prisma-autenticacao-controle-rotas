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
    if (req.path != '/api/v1/login') {
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
    } else {
      next();
    }
  }
}

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request & { user: UserPayload }, res: Response, next: NextFunction) {
    const userRole = req.user.perfil.nome;

    // Verifica se o usuário é admin ou user
    if (
      userRole === 'ADMIN' ||
      (userRole === 'USER' && req.method === 'GET') ||
      (userRole === 'BUSCA' && req.method === 'GET')
    ) {
      next();
    } else {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}

@Injectable()
export class AuthorizationMiddlewarePerifs implements NestMiddleware {
  use(req: Request & { user: UserPayload }, res: Response, next: NextFunction) {
    const userRole = req.user.perfil.nome;

    if (
      (userRole === 'ADMIN' && req.path === '/admin' && req.method === 'GET') ||
      (userRole === 'DEV' && req.path === '/dev' && req.method === 'GET') ||
      (userRole === 'BUSCA' && req.path === '/busca' && req.method === 'GET') ||
      (userRole === 'USER' && req.path === '/user' && req.method === 'GET')
    ) {
      next();
    } else {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}
