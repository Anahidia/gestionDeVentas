import {
     Entity, 
     PrimaryGeneratedColumn,
     Column, 
     OneToMany}
       from 'typeorm';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Sale } from './sales.entity';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  pass: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.SELLER })
  @IsEnum(UserRole)
  rol: UserRole;

  @OneToMany(() => Sale, sale => sale.seller)
  sales: Sale[];
}
