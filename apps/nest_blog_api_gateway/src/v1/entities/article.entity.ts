import {AbstractEntity} from "./abstract-entity";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,

} from "typeorm";
import {Injectable} from "@nestjs/common";
import * as slugify from "slug";
import {User} from "./user.entity";
import {Comment} from "./comment.entity";
import {Tag} from "./tag.entity";

@Injectable()
@Entity("articles")
export class Article extends AbstractEntity<Article> {
    @Column({unique: true, nullable:true})
    slug: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    body: string

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true }) + '-' + Date.now() ;
    }

    @ManyToMany(() => User, user => user.favoriteArticles, {onDelete: "CASCADE"})
    favoriteUsers: User[];

    @JoinTable({
        name: 'article_tag',
        joinColumn: {
            name: 'article_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id'
        }
    })
    @ManyToMany(() => Tag, tag => tag.articles, {cascade: true, onDelete: "CASCADE"})
    tags: Tag[];

    @ManyToOne(() => User, user => user.articles, {onDelete: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user: User

    @OneToMany(() => Comment, comment => comment.article, {cascade: true, onDelete: "CASCADE"})
    comments: Comment[]

    @Column('bigint', {nullable: true})
    user_id: number

    @Column('simple-array')
    tagList: string[]

    withFavorite(follower: User) {
        if (!this) {
            return
        }
        let is_favorited_by_you = false
        if (this.favoriteUsers) {
             is_favorited_by_you = this.favoriteUsers.filter((user) => {
                return user.id == follower.id
            }).length > 0
        }


        const article = {...this.toJSON(), is_favorited_by_you}

        return {article}
    }


// @JoinTable({
//     name: 'article_tags',
//     joinColumn: {
//         name: 'article_id',
//         referencedColumnName: 'id'
//     },
//     inverseJoinColumn: {
//         name: 'tag_id',
//         referencedColumnName: 'id'
//     }
// })
// @ManyToMany(() => User, user => user.followings, {onDelete: "CASCADE"})
}
