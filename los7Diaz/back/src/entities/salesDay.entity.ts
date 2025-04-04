import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
import { Sale } from './sales.entity';

  @Entity('sales_day')
export class SalesDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Sale, (sale) => sale.id)
  sales: Sale[];

  @Column('decimal')
  totalDay: number;
}
