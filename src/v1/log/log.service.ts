import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Log} from "./schemas/log.schema";
import {BaseMongoService} from "../../../base/base-mongo.service";
import { Model} from "mongoose";


@Injectable()
export class LogService extends BaseMongoService<Log>{
  constructor(@InjectModel(Log.name, 'logs') private logModel: Model<Log>) {
    super(logModel);
  }
}
