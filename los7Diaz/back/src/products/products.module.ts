import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categorys.entity';
import { Product } from 'src/entities/prducts.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
@Module({
  imports:[TypeOrmModule.forFeature([Product,Category])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports:[ProductsRepository]
})
export class ProductsModule {}
