import {config} from "dotenv";
import {ConfigService, registerAs} from "@nestjs/config";

config();
const configService = new ConfigService();
export default registerAs('database', () => ({
       type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        database: configService.getOrThrow('DATABASE_DB'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('SYNCHRONIZE'),
}))