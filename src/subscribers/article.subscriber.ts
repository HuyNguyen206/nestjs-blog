import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import {Article} from "../entities/article.entity";
import * as slugify from "slug";

@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {
    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return Article
    }

    /**
     * Called before post insertion.
     */
    async afterInsert(event: InsertEvent<Article>) {
        console.log(123)

    }
}