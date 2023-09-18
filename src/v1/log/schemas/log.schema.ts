import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type LogDocument = HydratedDocument<Log>
@Schema()
export class Log {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop()
    created_at: Date;

    @Prop([String])
    details: string[]
}

export const LogSchema = SchemaFactory.createForClass(Log)