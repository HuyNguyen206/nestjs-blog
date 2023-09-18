import {Module} from '@nestjs/common';
import {LogService} from './log.service';
import {LogController} from './log.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Log, LogSchema} from "./schemas/log.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
        name: Log.name,
        schema: LogSchema
    }], 'logs')
    ],
    controllers: [LogController],
    providers: [LogService],
})
export class LogModule {
}
