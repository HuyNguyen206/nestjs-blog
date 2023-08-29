import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {instanceToPlain} from "class-transformer";

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  toJSON() {
    return instanceToPlain(this);
  }
}