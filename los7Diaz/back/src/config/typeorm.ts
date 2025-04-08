
import { registerAs } from '@nestjs/config'
import{config as dotenvConfig}from 'dotenv'
import { Category } from 'src/entities/categorys.entity'
import { Product } from 'src/entities/prducts.entity'
import { Sale } from 'src/entities/sales.entity'
import { SalesDay } from 'src/entities/salesDay.entity'
import { SaleDetail } from 'src/entities/salesDetails.entity'
import { User } from 'src/entities/user.entiti'
import { DataSource, DataSourceOptions } from 'typeorm'


dotenvConfig({path:'.development.env'})

const config={
    type: "postgres",
    host: process.env.DB_HOST ,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [User,Product,Category,Sale,SaleDetail,SalesDay],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities:true,
    synchronize: true,
    dropSchema:true,
}

export default registerAs('typeorm',()=>config)
export const connectionSource=new DataSource(config as DataSourceOptions)         