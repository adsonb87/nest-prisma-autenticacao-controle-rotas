/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AllExceptionsFilter } from './auth/errors/all-exceptions.filter';
import {
  AuthMiddleware,
  AuthorizationMiddleware,
  AuthorizationMiddlewarePerifs,
} from './auth/middlewares/auth.middleware';
import { RotasController } from './rotas/rotas.controller';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, AuthModule],
  controllers: [AppController, RotasController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(AuthMiddleware).forRoutes(''); // Aplica a todos os endpoints
    consumer.apply(AuthMiddleware).forRoutes('');
    consumer.apply(AuthorizationMiddleware).forRoutes('/api/v1/usuario'); // Aplica somente às rotas do UserController
    consumer.apply(AuthorizationMiddlewarePerifs).forRoutes('/api/v1/rotas'); // Aplica somente às rotas do UserController
  }
}
