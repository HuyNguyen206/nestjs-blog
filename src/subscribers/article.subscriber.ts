import {DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import {Article} from "../entities/article.entity";
import * as slugify from "slug";
import {Logger} from "@nestjs/common";

@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {
    private readonly logger = new Logger(ArticleSubscriber.name);

    constructor(public datasource: DataSource) {
        datasource.subscribers.push(this)
    }
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
        console.log('after insert for' + JSON.stringify(event.entity))

    }
}