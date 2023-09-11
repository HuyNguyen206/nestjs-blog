import {AbstractEntity} from "./abstract-entity";
import {BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {Exclude} from "class-transformer";
import * as bcrypt from "bcryptjs";
import {Injectable} from "@nestjs/common";
import {Article} from "./article.entity";
import {User} from "./user.entity";

@Injectable()
@Entity("comments")
export class Comment extends AbstractEntity<Comment> {
    @Column()
    body: string;

    @ManyToOne(() => User, user => user.comments, {onDelete: "CASCADE"})
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Article, article => article.comments, {onDelete: "CASCADE"})
    @JoinColumn({name: 'article_id'})
    article: Article

    @Column({type: 'bigint', nullable: true})
    user_id: number

    @Column({type: 'bigint', nullable: true})
    article_id: number
}
