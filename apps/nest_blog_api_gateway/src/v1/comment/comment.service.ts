import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../entities/comment.entity";
import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {Article} from "../entities/article.entity";
import {CommentDto} from "../dto/comment.dto";

@Injectable()
export class CommentService {
    constructor(@InjectRepository(Comment) private commentRepo: Repository<Comment>,
                @InjectRepository(Article) private articleRepo: Repository<Article>) {
    }

    async store(user: User, slug: string, commentDto: CommentDto) {
        // const newComment = new Comment()
        const newComment = this.commentRepo.create(commentDto)
        Object.assign(newComment, commentDto)
        const article = await this.articleRepo.findOne({where: {slug}})

        newComment.article_id = article.id
        newComment.user_id = user.id

        return await newComment.save()
    }

    async index(user: User, slug: string) {
        const {comments} = await this.articleRepo.findOne({where: {slug}, relations: ['comments']})

        return comments
    }

    async delete(user: User, id: number) {
        const comment = await this.commentRepo.findOne({where: {id}})
        if (!comment) {
            throw new NotFoundException()
        }

        if (comment.user_id !== user.id)
        {
            throw new ForbiddenException()
        }

        return await comment.remove()
    }
}
