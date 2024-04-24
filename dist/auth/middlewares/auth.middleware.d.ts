import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserPayload } from '../models/UserPayload';
export declare class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare class AuthorizationMiddleware implements NestMiddleware {
    use(req: Request & {
        user: UserPayload;
    }, res: Response, next: NextFunction): void;
}
export declare class AuthorizationMiddlewarePerifs implements NestMiddleware {
    use(req: Request & {
        user: UserPayload;
    }, res: Response, next: NextFunction): void;
}
