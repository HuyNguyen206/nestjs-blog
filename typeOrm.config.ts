import {DataSource} from "typeorm";
import {config} from "dotenv";
import {ConfigService} from "@nestjs/config";

config();

const configService = new ConfigService()
export default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('DATABASE_HOST'),
    port: configService.getOrThrow('DATABASE_PORT'),
    database: configService.getOrThrow('DATABASE_DB'),
    username: configService.getOrThrow('DATABASE_USER'),
    password: configService.getOrThrow('DATABASE_PASSWORD'),
    entities: [
        "src/**/*.entity{.ts,.js}"
    ],
    migrations: ['migrations/*{.ts,.js}'],
    synchronize: false,

    migrationsTableName: "migrations_histories",
    migrationsRun: false,
})