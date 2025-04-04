import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
import { SaleDetail } from './salesDetails.entity';
import { User } from './user.entiti';

  @Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'idSeller' })
  seller: User;

  @OneToMany(() => SaleDetail, (detail) => detail.sale, { cascade: true })
  details: SaleDetail[];

  @Column('decimal')
  total: number;
}
