import {IsArray, IsDefined, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested} from "class-validator";
import {User} from "../entities/user.entity";
import {Article} from "../entities/article.entity";
import {CommentDto} from "./comment.dto";
import {Type} from "class-transformer";
import {CreateItemDetailDto} from "./item-detail.dto";
import {TagDto} from "./tag.dto";

export class CreatedArticleDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(3)
  description: string

  @IsString()
  @MinLength(3)
  body: string

  @IsArray()
  @IsString({each: true})
  tagList: string[]

  @IsOptional()
  @IsArray()
  @Type(() => CommentDto)
  @IsDefined()
  @ValidateNested()
  comments: CommentDto[]

  @IsOptional()
  @IsArray()
  @Type(() => TagDto)
  @IsDefined()
  @ValidateNested()
  tags: TagDto[]
}

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  description: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  body: string

  @IsArray()
  @IsOptional()
  @IsString({each: true})
  tagList: string[]
}

export interface FindFeedQuery {
  skip?: number;
  take?: number;
}

export interface FindAllQuery extends FindFeedQuery {
  tag?: string;
  author?: string;
  favoritedBy?: string;
}

export interface ArticleResponse{
  id:number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  created_at: Date | string;
  updated_at: Date | string;
  user_id: number;
  user: User;
}
