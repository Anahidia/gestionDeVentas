import { ForbiddenException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entiti';

import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
constructor(
  @InjectRepository(User)
  private usersRepository:Repository<User>
){}

 async getUsers(page:number,limit:number) {
    const skip=(page-1)*limit
    const users=await this.usersRepository.find({
      take:limit,
      skip:skip
    })
    return users.map(({pass,...userNoPasword})=>userNoPasword)
    }

  async getUsersByEmmail(email:string){
     return await this.usersRepository.findOneBy({email})
    
  }


 async getUserById(id:string){
const user= await this.usersRepository.findOne({
where:{id},
relations:{
  sales:true
}
})
if(!user) throw new NotFoundException(`product whit id ${id} not found`)


const { pass, ...userNoPass}=user

return userNoPass


  }
async createUser(user:Partial<User>):Promise<Partial<User>>{
const newUser=await this.usersRepository.save(user)
const dbUser= await this.usersRepository.findOneBy({id:newUser.id})
const {pass,...userWhithoutPassword}=dbUser
return userWhithoutPassword
}

async updateUser(id:string,upUser:User):Promise<Partial<User>>{

  await this.usersRepository.update(id,upUser)
  const upDateUser= await this.usersRepository.findOneBy({id})
  
  if(!upDateUser) throw new NotFoundException(`product whit id ${id} not found`)

  const {pass, ...userWhithoutPassword}=upDateUser
return userWhithoutPassword
}

async deleteUser(id:string){
const user= await this.usersRepository.findOneBy({id})
if(!user) throw new NotFoundException(`product whit id ${id} not found`)

this.usersRepository.remove(user)
  const {pass, ...userWhithoutPassword}=user

  return userWhithoutPassword

}
}