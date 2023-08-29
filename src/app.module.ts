import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Database } from "./config/database";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: Database
    }),
    AuthModule,
    UserModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AppModule {
}
