import { Injectable } from '@nestjs/common';
import {DeepPartial} from "typeorm";
import { FilterQuery, Model} from "mongoose";

@Injectable()
export class BaseMongoService<T> {
  constructor(private _model: Model<T>) {
  }
  create(entityLike: DeepPartial<T>) {
    const createdEntity = new this._model(entityLike)

    return createdEntity.save()
  }

  findAll(FilterQuery: FilterQuery<T>) {
    return this._model.find(FilterQuery).exec()
  }

  findOne(FilterQuery: FilterQuery<T>) {

    return this._model.findOne(FilterQuery)
  }

  update(FilterQuery: FilterQuery<T>, updateEntity:  DeepPartial<T>) {
    return this._model.findOneAndUpdate(FilterQuery, updateEntity)
  }

  remove(FilterQuery: FilterQuery<T>) {
    return this._model.findOneAndRemove(FilterQuery)
  }
}
