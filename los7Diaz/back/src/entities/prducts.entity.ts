import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { IsString, IsNumber } from 'class-validator';
import { Category } from './categorys.entity';

  @Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn()
  category: Category;

  @Column('decimal')
  @IsNumber()
  price: number;

  @Column('int')
  @IsNumber()
  stock: number;

  @Column()
  @IsString()
  imgUrl:string
}