import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import {ArticleSubscriber} from "../subscribers/article.subscriber";
@Injectable()
export class Database implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      // subscribers: [ArticleSubscriber],
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      dropSchema: false,
      // logging: true,
      entities: ['dist/**/*.entity.{js,ts}']
    }
  }
}