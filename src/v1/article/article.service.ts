import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "../entities/article.entity";
import {In, Like, Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {CreatedArticleDto, FindAllQuery, FindFeedQuery, UpdateArticleDto} from "../dto/article.dto";
import {Comment} from "../entities/comment.entity";
import {Tag} from "../entities/tag.entity";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(User) private readonly useRepo: Repository<User>
    ) {
    }

    findBySlug(slug: string) {
        return this.articleRepository.findOne({where: {slug}});
    }

    async store(articleData: CreatedArticleDto, user: User) {
        const article = this.articleRepository.create(articleData);
        if (article.comments.length) {
            article.comments = articleData.comments.map(com => new Comment(com))
        }

        if (article.tags.length) {
            article.tags = articleData.tags.map(tag => new Tag(tag))
        }

        article.user = user;

        return await article.save()
    }

    async update(slug: string, articleData: UpdateArticleDto, currentUser: User) {
        const article = await this.findBySlug(slug);
        if (!currentUser.canUpdate(article)) {
            throw new ForbiddenException('You do not have permission to update article')
        }

        return await this.articleRepository.update({slug}, articleData)
    }

    async delete(slug: string, currentUser: User) {
        const article = await this.findBySlug(slug);
        if (!currentUser.canUpdate(article)) {
            throw new ForbiddenException('You do not have permission to update article')
        }

        return await this.articleRepository.remove(article)
    }

    async findAll(user: User, query: FindAllQuery){
        const findOptions = {
            skip: query?.skip || 0,
            take: query?.take || 10,
            where: {}
        }
        if (query?.author) {
            findOptions.where['user'] =  {username: query.author}
        }

        if (query?.favoritedBy) {
            findOptions.where['favoriteUsers'] = {username:  query.favoritedBy}
        }

        if (query?.tag) {
            findOptions.where['tagList'] = Like(`%${query.tag}%`)
        }

        return await this.articleRepository.find(findOptions)
    }

    async findFeed(user: User, query: FindFeedQuery){
        const {followings} = await this.useRepo.findOne({where: {id: user.id}, relations: ['followings']})
        const followingIds = followings.map(following =>  {
            return following.id
        })
        const findOptions = {...query, where: {user_id: In(followingIds)}, relations: ['user']}

        return await this.articleRepository.find(findOptions)
    }

    async favorite(user: User, slug: string) {
        const article = await this.articleRepository.findOne({
            where: {slug},
            relations: ['favoriteUsers']
        })

        article.favoriteUsers.push(user)

        return await article.save()
    }

    async unfavorite(user: User, slug: string) {
        const article = await this.articleRepository.findOne({
            where: {slug},
            relations: ['favoriteUsers']
        })

        article.favoriteUsers = article.favoriteUsers.filter(favoriteUser => {
            return favoriteUser.id !== user.id
        })

        return await article.save()
    }
}
