import { AbstractEntity } from "./abstract-entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { Exclude, instanceToInstance, instanceToPlain } from "class-transformer";
import * as bcrypt from "bcryptjs";

@Entity("users")
export class User extends AbstractEntity {
  @Column()
  email: string;

  @Column({unique: true})
  username: string;

  @Exclude({toPlainOnly: true})
  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }


  toJSON() {
    return instanceToPlain(this);
  }

  async isCorrectPassword(pass: string): Promise<boolean>
  {
   return await bcrypt.compare(pass,this.password)
  }
}
