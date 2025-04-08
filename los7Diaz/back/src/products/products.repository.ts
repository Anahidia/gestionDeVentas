import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json'
import { Product } from 'src/entities/prducts.entity';
import { Category } from 'src/entities/categorys.entity';


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository:Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository:Repository<Category>
  ){}

async  getProducts():Promise<Product[]> {
 let products =await this.productsRepository.find({
  relations:{
    category:true
  }
 })
 return products;
  }
 async getProductsById(id:string){
   const product= this.productsRepository.findOneBy({id})
   if(!product) throw new NotFoundException(`product whit id ${id} not found`)

   return product
  }


  async createProduct() {
    const categories = await this.categoriesRepository.find();
  
    for (const element of data) {
      // Buscar la categoría en la lista obtenida de la base de datos
      const categoryName = element.category; // Aquí 'category' es un string
      let category;
  
      if (categoryName) {
        category = categories.find((cat) => cat.name === categoryName);
  
        if (!category) {
          console.warn(`Category '${categoryName}' not found in the database for product: ${element.name}.`);
        }
      } else {
        console.warn(`No category provided for product: ${element.name}.`);
      }
  
      // Si la categoría es null, asignar 'uncategorized'
      if (!category) {
        category = categories.find((cat) => cat.name === 'uncategorized');
  
        if (!category) {
          console.log(`Creating default 'uncategorized' category.`);
          category = await this.categoriesRepository.save({
            name: 'uncategorized',
          });
          categories.push(category); // Actualizar la lista de categorías
        }
      }
  
      const product = new Product();
      product.name = element.name;
      product.price = element.price;
      product.stock = element.stock;
      product.category = category;
  
      try {
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['price', 'stock', ], ['name'])
          .execute();
        console.log(`Product '${product.name}' added/updated successfully.`);
      } catch (error) {
        console.error(`Failed to add/update product: ${product.name}`, error);
      }
    }
  
    return 'Productos agregados';
  }
  

  async upDateProducts(id:string,product:Product){
  await this.productsRepository.update(id,product)
  const updateProduct=await this.productsRepository.findOneBy({id})
  if(!updateProduct) throw new NotFoundException(`product whit id ${id} not found`)

  return updateProduct
  }


}