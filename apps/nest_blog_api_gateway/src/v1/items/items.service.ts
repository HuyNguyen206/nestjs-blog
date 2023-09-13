import { Injectable } from '@nestjs/common';
import {CreateItemDto, UpdateItemDto} from "../dto/item.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Item} from "../entities/item.entity";
import {EntityManager, Repository} from "typeorm";
import {ItemDetail} from "../entities/item-detail.entity";


@Injectable()
export class ItemsService {

  constructor(
      private readonly  entityManager: EntityManager,
      @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
  ) {}
 async create(createItemDto: CreateItemDto) {
     const itemDetail = await this.entityManager.transaction(async () => {
          const item = new Item()
          Object.assign(item, createItemDto)

          const itemDetail = new ItemDetail()
          Object.assign(itemDetail, createItemDto.itemDetail)
          itemDetail.item = item
          return await itemDetail.save()
      })

     return this.itemRepo.findOne({where: {id: itemDetail.item_id}, relations: ['itemDetail']})
  }

  findAll() {
    return this.itemRepo.find({relations: ['itemDetail']});
  }

  async findOne(id: number) {
    return this.itemRepo.findOne({where: {id: id}});
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
      const item = await this.findOne(id)
      Object.assign(item, updateItemDto)

      return item.save()
  }

  remove(id: number) {
    return this.itemRepo.delete(id)
  }
}
