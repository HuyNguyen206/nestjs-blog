import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {instanceToPlain} from "class-transformer";

export abstract class AbstractEntity<T> extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // constructor(item) {
  //   super();
  //   Object.assign(this, item)
  // }

  constructor(entity?: Partial<T>) {
    super();
    if (!entity) {
      return
    }
    Object.assign(this, entity)
  }

  toJSON() {
    return instanceToPlain(this);
  }
}