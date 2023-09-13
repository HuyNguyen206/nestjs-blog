import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, HttpCode, HttpStatus} from '@nestjs/common';
import { ItemsService } from './items.service';
import {CreateItemDto, UpdateItemDto} from "../dto/item.dto";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";

@Controller()
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(
      private readonly itemsService: ItemsService,
  ) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
     this.itemsService.remove(+id);
  }
}
