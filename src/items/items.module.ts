import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Item} from "../entities/item.entity";
import {ItemDetail} from "../entities/item-detail.entity";
import {ArticleSubscriber} from "../subscribers/article.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemDetail])],
  controllers: [ItemsController],
  providers: [ItemsService, ArticleSubscriber],
})
export class ItemsModule {}
