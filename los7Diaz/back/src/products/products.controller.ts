import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Get } from '@nestjs/common'; 
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService:ProductsService,
    ){}

 @Get()
 getProducts() {
    return this.productsService.getProductsService();
  }
 
}
