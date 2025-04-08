import { BadRequestException, Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { User, UserRole } from 'src/entities/user.entiti';
import { RolesGuard } from 'src/guards/rol.guard';
import { isUUID } from 'class-validator';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page')page:number= 1,@Query('limit')limit:number=5){
    if(page && limit) return this.UsersService.getUserServices(page,limit);
    return this.UsersService.getUserServices(page,limit);
  }
  @Get('dashboard')
  @Roles(UserRole.ADMIN) 
  @UseGuards(AuthGuard,RolesGuard)
  getAdmin(){
    return 'datos del panel de administrador '
  }
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  @UseGuards(AuthGuard, RolesGuard)
  getUserById(@Param('id')id:string){
    if (!isUUID(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido.');
    }
    return this.UsersService.getUserByIdService(id) 
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  @UseGuards(AuthGuard, RolesGuard)
  async changeUsers(@Param('id')id:string,@Body()user:User){
    return this.UsersService.updateUserService(id,user)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  @UseGuards(AuthGuard, RolesGuard)
 
  deleteUsers(@Param('id')id:string){
    if (!isUUID(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido.');
    }
    
    return this.UsersService.deleteUserService(id)
  }
}
