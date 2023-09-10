import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Database } from "./config/database";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { UserModule } from "./user/user.module";
import { ArticleModule } from "./article/article.module";
import { CommentModule } from "./comment/comment.module";
import { ItemsModule } from "./items/items.module";
import { UploadModule } from "./upload/upload.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('MAIL_HOST'),
          port: configService.getOrThrow('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.getOrThrow('MAIL_USER'),
            pass: configService.getOrThrow('MAIL_PASS')
          }
        },
        defaults: {
          from: `No reply<${configService.getOrThrow('MAIL_FROM')}>`
        },
        preview: true,
        template: {
          dir: __dirname + '/emails/templates',
          adapter: new HandlebarsAdapter(),
          options:{
            strict: true
          }
        }
      }),


    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow('THROTTLE_TTL'),
          limit: config.getOrThrow('THROTTLE_LIMIT'),
        }
      ]
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DATABASE_HOST"),
        port: configService.getOrThrow("DATABASE_PORT"),
        database: configService.getOrThrow("DATABASE_DB"),
        username: configService.getOrThrow("DATABASE_USER"),
        password: configService.getOrThrow("DATABASE_PASSWORD"),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow("SYNCHRONIZE")
      }),
      inject: [ConfigService]
      // useClass: Database
    }),
    AuthModule,
    UserModule,
    ArticleModule,
    CommentModule,
    ItemsModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {
}
