import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from 'src/entities/user.entiti';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository:UserRepository,
        private readonly jwtService:JwtService,){}
      getAuthService(): string {
        return 'get all auth';
      }
    
     async signUpService(user:Partial<User>){
      const {email,pass}=user
        const foundUser=await this.userRepository.getUsersByEmmail(email)
      
       if (!email|| !pass) throw new BadRequestException('required email y password')
    
      
       if(foundUser)throw new BadRequestException('registered email')
       console.log(foundUser)
    
       //proceso de registro
    
       //1.hashear la password
    
       const hashedPass= await bcrypt.hash(pass,10)
    
       return await this.userRepository.createUser({...user,pass:hashedPass})
    
    }
    
    
      async signInService(email:string,pass:string){
       if(!email || !pass) return 'Data Required'
        const user=await this.userRepository.getUsersByEmmail(email)
       if(!user) throw new BadRequestException('invalid credentials')
    
       //comparacion de contraseñas (la de la bs vs la del cliente)
    
       const validPassword=await bcrypt.compare(pass,user.pass)
    
       if(!validPassword) throw new BadRequestException('invalid credentials')
    //firma del token
    
    const payload={
      id:user.id,
      email:user.email,
      rol:user.rol
    }
    
    //generamos token
    
    const token =this.jwtService.sign(payload)
    
    //entregamos respuesta
    
        return {
          message:'load-in user',
          token
      }}
}
