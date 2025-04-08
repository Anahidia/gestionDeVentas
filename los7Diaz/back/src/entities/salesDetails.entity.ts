import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { Product } from './prducts.entity';
import { Sale } from './sales.entity';
  @Entity('sale_details')
export class SaleDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.details)
  @JoinColumn()
  sale: Sale;

  
}
