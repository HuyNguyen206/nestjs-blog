import {AbstractEntity} from "./abstract-entity";
import {BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {Exclude} from "class-transformer";
import * as bcrypt from "bcryptjs";
import {Injectable} from "@nestjs/common";
import {Article} from "./article.entity";
import {Comment} from "./comment.entity";
import {Tag} from "./tag.entity";

@Injectable()
@Entity("users")
export class User extends AbstractEntity<User> {
    @Column()
    email: string;

    @Column({unique: true})
    username: string;

    @Exclude({toPlainOnly: true})
    @Column()
    password: string;

    @Column({nullable: true})
    bio: string;

    @Column({nullable: true})
    image?: string;

    @OneToMany(() => Comment, comment => comment.user, {onDelete: "CASCADE"})
    comments: Comment[]

    @OneToMany(() => Article, article => article.user, {onDelete: "CASCADE"})
    articles: Article[]

    @JoinTable({
        name: 'user_favorite_article',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'article_id',
            referencedColumnName: 'id'
        }
    })
    @ManyToMany(() => Article, article => article.favoriteUsers, {onDelete: "CASCADE"})
    favoriteArticles: Article[];

    @JoinTable({
        name: 'user_follow',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'follower_id',
            referencedColumnName: 'id'
        }
    })
    @ManyToMany(() => User, user => user.followings, {onDelete: "CASCADE"})
    followers: User[];

    @ManyToMany(() => User, user => user.followers, {onDelete: "CASCADE"})
    followings: User[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async isCorrectPassword(pass: string): Promise<boolean> {
        return await bcrypt.compare(pass, this.password)
    }

    withFollower(follower: User) {
        let is_following_me;
        if (this.id == follower.id) {
            is_following_me = null;
        } else {
            is_following_me = this.followings.filter((following) => {
                return following.id == follower.id
            }).length > 0
        }

        const profile = {...this.toJSON(), is_following_me}

        return {profile}
    }

    canUpdate(article: Article){
        return this.id == article.user_id
    }
}
