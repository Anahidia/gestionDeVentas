import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/category/category.repository';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class SeedersService {
    constructor(
      
        private readonly categoriesRepository:CategoriesRepository,
   
        private readonly productsRepository: ProductsRepository

    ){}
    async seed() {
        console.log('Seeding categories...');
        await this.categoriesRepository.addCategories();

        console.log('categories added');

        console.log('Seeding products...');
        await this.productsRepository.createProduct();
        
        console.log('products added')

    }
}
