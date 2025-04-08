import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { SalesModule } from './sales/sales.module';
import { SeedersModule } from './seeders/seeders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeorm'
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true, 
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>configService.get('typeorm')
        
    }) ,
    UsersModule,
     ProductsModule,
     CategoryModule,
     SalesModule,
     SeedersModule,
     AuthModule,
     JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn:'12h'
      }
     }),
    ],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
