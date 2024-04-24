import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

@Controller('/api/v1/rotas')
export class RotasController {
  @Get('/admin')
  @HttpCode(HttpStatus.FOUND)
  async buscarAdmin() {
    try {
      return {
        message: 'sucesso',
        result: 'Usuário Admin',
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }

  @Get('/user')
  @HttpCode(HttpStatus.FOUND)
  async buscarUser() {
    try {
      return {
        message: 'sucesso',
        result: 'Usuário user',
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }

  @Get('/busca')
  @HttpCode(HttpStatus.FOUND)
  async buscarBusca() {
    try {
      return {
        message: 'sucesso',
        result: 'Usuário busca',
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }

  @Get('/dev')
  @HttpCode(HttpStatus.FOUND)
  async buscarDev() {
    try {
      return {
        message: 'sucesso',
        result: 'Usuário dev',
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'erro',
        error: error.message,
      });
    }
  }
}
