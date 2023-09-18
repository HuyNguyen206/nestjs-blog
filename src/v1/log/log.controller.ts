import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create({details: ['today', 'yesterday'], ...createLogDto});
  }

  @Get()
  findAll() {
    return this.logService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne({_id: id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update({_id: id}, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove({_id: id});
  }
}
