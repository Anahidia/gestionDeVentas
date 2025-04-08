import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as data from "../utils/data.json"
import { Category } from "src/entities/categorys.entity";

@Injectable()
export class CategoriesRepository{
    constructor(@InjectRepository(Category)
     private CategoriesRepository:Repository<Category>  ){}

     async getCategories(){
        return await this.CategoriesRepository.find()
     }

     async addCategories(){
    data?.map(async(element)=>{
        await this.CategoriesRepository

        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({name:element.category})
        .orIgnore()
        .execute()
    })
    return 'Categoria Agregada '
     }
    }
