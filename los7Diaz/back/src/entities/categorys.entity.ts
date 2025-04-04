import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  import { IsString } from 'class-validator';
  
  
  @Entity('categories')
  export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    @IsString()
    name: string;
  }