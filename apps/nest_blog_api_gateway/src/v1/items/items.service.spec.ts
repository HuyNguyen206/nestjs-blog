import {Test, TestingModule} from '@nestjs/testing';
import {ItemsService} from './items.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Item} from "../entities/item.entity";
import {EntityManager, Repository} from "typeorm";

describe('ItemsService', () => {
    let service: ItemsService;
    let itemRepo: Repository<Item>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ItemsService,
                {
                    provide: getRepositoryToken(Item),
                    useValue: {
                        find: jest.fn()
                    }
                },
                {
                    provide: EntityManager,
                    useValue: {}
                }
            ],
        }).compile();

        service = module.get<ItemsService>(ItemsService);
        itemRepo = module.get<Repository<Item>>(getRepositoryToken(Item));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('find all', async () => {
        await service.findAll()
        expect(itemRepo.find).toHaveBeenCalled()
    })
});
