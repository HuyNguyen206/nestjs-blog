import { Module } from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {ArticleModule} from "./article/article.module";
import {CommentModule} from "./comment/comment.module";
import {ItemsModule} from "./items/items.module";
import {AuthModule} from "../auth/auth.module";
import {RouterModule} from "@nestjs/core";
import { BookingEntryModule } from './booking-entry/booking-entry.module';

const routes = [{
  path: 'v1',
  children: [
    {path: 'users', module: UserModule},
    {path: 'articles', module: ArticleModule},
    {path: 'comments', module: CommentModule},
    {path: 'items', module: ItemsModule},
    {path: 'bookings', module: BookingEntryModule},
  ]
}]

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    UserModule,
    ArticleModule,
    CommentModule,
    ItemsModule,
    BookingEntryModule,
  ]
})
export class AppV1Module {
}
