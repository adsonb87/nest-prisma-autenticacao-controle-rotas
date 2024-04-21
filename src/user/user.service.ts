/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltRounds = 10; // Ajuste o custo do hash de acordo com seu ambiente

    try {
      const retornoEmail = await this.repository.findUnique(
        createUserDto.email,
      );
      if (createUserDto.password.length < 6) {
        throw new NotFoundError(`Password deve conter no mínimo 6 caracteres.`);
      } else if (retornoEmail) {
        throw new NotFoundError(`Email já cadastrado.`);
      } else {
        const hashedPassword = await bcrypt.hash(
          createUserDto.password,
          saltRounds,
        );
        const createdUser = await this.repository.create({
          ...createUserDto,
          password: hashedPassword,
        });

        // Não é uma prática segura retornar a senha, é melhor remover o campo antes de retornar o objeto
        return {
          ...createdUser,
          password: undefined,
        };
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async createPerfis() {
    //const perfis = ['ADMIN', 'USER', 'DEV', 'BUSCA'];

    // await this.repository.createPerfis(perfis[0]);
    // await this.repository.createPerfis(perfis[1]);
    // await this.repository.createPerfis(perfis[2]);
    // await this.repository.createPerfis(perfis[3]);

    return await this.repository.findPerfis();
  }

  async findByEmail(email: string) {
    const user = await this.repository.findUnique(email);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return user;
  }

  async findAll() {
    const user = await this.repository.findAll();

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return user;
  }

  async findOne(id: number) {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
