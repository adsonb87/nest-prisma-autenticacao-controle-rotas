import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Usuario')
@Controller('/api/v1/usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @IsPublic()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const retorno = await this.userService.create(createUserDto);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }

  @Get('/perfis')
  @IsPublic()
  async createPerfis() {
    return await this.userService.createPerfis();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const retorno = await this.userService.findOne(+id);
      if (!retorno) {
        throw new NotFoundException('Registro não encontrado');
      }
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async getMe(@CurrentUser() currentUser: UserEntity) {
    try {
      if (!currentUser) {
        throw new NotFoundException('Registro não encontrado');
      }
      return {
        message: 'sucesso',
        data: currentUser,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      return {
        message: 'erro',
        error: error.message,
      };
    }
  }

  @Get()
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const retorno = await this.userService.findAll();
      if (!retorno) {
        throw new NotFoundException('Registro não encontrado');
      }
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const retorno = await this.userService.update(+id, updateUserDto);
      console.log(retorno, HttpStatus.OK);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    try {
      const retorno = await this.userService.remove(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      // Tratamento de erro apropriado
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }
}
