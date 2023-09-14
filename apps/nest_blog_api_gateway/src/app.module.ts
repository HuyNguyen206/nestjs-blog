import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";
import {AppV1Module} from "./v1/app-v1.module";
// import databaseConfig from "../config/database.config";
import {ScheduleModule} from "@nestjs/schedule";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {UserRegisterEvent} from "./events/user.register.event";
import {UserRegisterListener} from "./listeners/user.register.listener";
import {CronGeneral} from "./crons/cron.general";
import databaseConfig from "../../../config/database.config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {BOOKING_SERVICE_NAME} from "@app/common/types/grpc_booking_service";
import * as path from "path";


@Module({
    imports: [
        ClientsModule.register([
            {
                name: BOOKING_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    package: BOOKING_SERVICE_NAME,
                    protoPath: path.join(__dirname, '../grpc_booking_service.proto')
                }
            }
        ]
        ),
        EventEmitterModule.forRoot({

        }),
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [
                databaseConfig
            ]
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => (configService.get('database')),
            inject: [ConfigService],
            // useClass: Database
        }),
        AppV1Module
    ],
    controllers: [AppController],
    providers: [
        CronGeneral,
        UserRegisterEvent,
        UserRegisterListener,
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }
    ]
})
export class AppModule {
}
