/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.prisma.user.create({
        data: createUserDto,
        include: { perfil: true },
      });

      return createdUser;
    } catch (error) {
      throw new NotFoundError(`${error.message}`);
    }
  }

  async createPerfis(perfis) {
    try {
      return await this.prisma.perfil.create({
        data: {
          nome: perfis,
        },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
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

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { perfil: true },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return user;
  }

  async findUnique(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { perfil: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: { perfil: true },
    });

    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
      include: { perfil: true },
    });

    return deletedUser;
  }
}
