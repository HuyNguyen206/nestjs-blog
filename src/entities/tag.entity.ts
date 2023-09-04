import {Column, Entity, ManyToMany} from "typeorm";
import {AbstractEntity} from "./abstract-entity";
import {Article} from "./article.entity";

@Entity('tags')
export class Tag extends AbstractEntity<Tag>{
    @Column()
    name: string

    @ManyToMany(() => Article, article => article.tags, {onDelete: "CASCADE"})
    articles: Article[];
}
