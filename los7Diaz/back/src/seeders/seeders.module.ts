import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { ProductsModule } from 'src/products/products.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[
    CategoryModule,
    ProductsModule,
  ],
  providers: [SeedersService],
  exports:[SeedersService]
})
export class SeedersModule {}
