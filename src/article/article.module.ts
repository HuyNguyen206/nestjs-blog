import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Article} from "../entities/article.entity";
import {User} from "../entities/user.entity";
import {Comment} from "../entities/comment.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Article, User, Comment])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
