"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const conflict_interceptor_1 = require("./common/errors/interceptors/conflict.interceptor");
const database_interceptor_1 = require("./common/errors/interceptors/database.interceptor");
const unauthorized_interceptor_1 = require("./common/errors/interceptors/unauthorized.interceptor");
const notfound_interceptor_1 = require("./common/errors/interceptors/notfound.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.enableShutdownHooks();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Documentação com Swagger - Multleads')
        .setDescription('O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalInterceptors(new conflict_interceptor_1.ConflictInterceptor());
    app.useGlobalInterceptors(new database_interceptor_1.DatabaseInterceptor());
    app.useGlobalInterceptors(new unauthorized_interceptor_1.UnauthorizedInterceptor());
    app.useGlobalInterceptors(new notfound_interceptor_1.NotFoundInterceptor());
    await app.listen(process.env.PORT || 3200);
}
bootstrap();
//# sourceMappingURL=main.js.map