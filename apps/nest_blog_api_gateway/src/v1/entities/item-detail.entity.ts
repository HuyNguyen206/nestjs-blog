import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {AbstractEntity} from "../../../../../base/abstract-entity";
import {Item} from "./item.entity";

@Entity('item_detail')
export class ItemDetail extends AbstractEntity<ItemDetail>{
    @Column()
    name: string

    @Column()
    description: string

    @Column()
    rating: number

    @OneToOne(() => Item, {cascade: true})
    @JoinColumn({name: 'item_id'})
    item: Item

    @Column({type: 'bigint'})
    item_id:number

    // constructor(itemDetail?: Partial<ItemDetail>) {
    //     super();
    //     if (!itemDetail) {
    //         return
    //     }
    //     Object.assign(this, itemDetail)
    // }
}
