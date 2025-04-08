import { Module } from '@nestjs/common';
import { Category } from 'src/entities/categorys.entity';
import { CategoryController } from 'src/category/category.controller';
import { CategoriesRepository } from 'src/category/category.repository';
import { CategoryService } from 'src/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoriesRepository],
  exports:[CategoriesRepository]
})
export class CategoryModule {}
