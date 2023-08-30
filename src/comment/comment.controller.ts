import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards} from '@nestjs/common';
import { CommentService } from './comment.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CommentDto} from "../models/comment.dto";

@Controller('articles')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:slug/comments')
  async store(@Request() req, @Param('slug') slug: string,@Body() commentDto: CommentDto) {
    return await this.commentService.store(req.user, slug,  commentDto)
  }

  @Get('/:slug/comments')
  async index(@Request() req, @Param('slug') slug: string) {
    return await this.commentService.index(req.user, slug)
  }

  @Delete('/comments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() req, @Param('id') id: number) {
    return await this.commentService.delete(req.user, id)
  }
}
