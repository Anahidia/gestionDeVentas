import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm';
  import { IsString, IsNumber, IsEmpty } from 'class-validator';
import { Category } from './categorys.entity';

  @Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Unique(['name'])
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

  @Column({ nullable: true })
  @IsString()
  imgUrl:string
}