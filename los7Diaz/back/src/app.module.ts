import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { SalesModule } from './sales/sales.module';
import { SeedersModule } from './seeders/seeders.module';

@Module({
  imports: [UsersModule, ProductsModule, CategoryModule, SalesModule, SeedersModule],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
