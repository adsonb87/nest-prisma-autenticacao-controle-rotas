"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const NotFoundError_1 = require("../../common/errors/types/NotFoundError");
let UsersRepository = exports.UsersRepository = class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            const createdUser = await this.prisma.user.create({
                data: createUserDto,
                include: { perfil: true },
            });
            return createdUser;
        }
        catch (error) {
            throw new NotFoundError_1.NotFoundError(`${error.message}`);
        }
    }
    async createPerfis(perfis) {
        try {
            return await this.prisma.perfil.create({
                data: {
                    nome: perfis,
                },
            });
        }
        catch (error) {
            throw new NotFoundError_1.NotFoundError(`${error}`);
        }
    }
    async findPerfis() {
        return await this.prisma.perfil.findMany({ include: { User: true } });
    }
    async findAll() {
        return await this.prisma.user.findMany({
            include: { perfil: true },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { perfil: true },
        });
        if (!user) {
            throw new NotFoundError_1.NotFoundError('Usuário não encontrado.');
        }
        return user;
    }
    async findUnique(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { perfil: true },
        });
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            include: { perfil: true },
        });
        return updatedUser;
    }
    async remove(id) {
        const deletedUser = await this.prisma.user.delete({
            where: { id },
            include: { perfil: true },
        });
        return deletedUser;
    }
};
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map