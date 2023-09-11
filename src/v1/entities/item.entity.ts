import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {AbstractEntity} from "./abstract-entity";
import {ItemDetail} from "./item-detail.entity";

@Entity('items')
export class Item extends AbstractEntity<Item>{
    @Column()
    name: string

    // @Column()
    // quantity: number

    @Column({default: false})
    is_public: boolean

    @OneToOne(() => ItemDetail, (itemDetail) => itemDetail.item, {onDelete: "CASCADE"})
    itemDetail: ItemDetail

    // constructor(item?: Partial<Item>) {
    //     super();
    //     if (!item) {
    //         return
    //     }
    //
    //     Object.assign(this, item)
    // }
}
