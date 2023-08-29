import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Put,
    Param,
    Delete,
    HttpCode,
    Get,
    HttpStatus, Query
} from '@nestjs/common';
import {ArticleService} from './article.service';
import {ArticleResponse, CreatedArticleDto, FindAllQuery, FindFeedQuery, UpdateArticleDto} from "../models/article.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ResponseObject} from "../models/response.model";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
    }

    @Get('/feed')
    @UseGuards(JwtAuthGuard)
    async findFeed(@Request() req, @Query() query: FindFeedQuery)
        : Promise<ResponseObject<'articles', ArticleResponse[]> & ResponseObject<'articles_count', number>> {
        const articles = await this.articleService.findFeed(req.user, query)

        return {articles: articles, articles_count: articles.length}
    }

    @Post('/:slug/favorite')
    @UseGuards(JwtAuthGuard)
    async favorite(@Request() req, @Param('slug') slug: string) {
        return await this.articleService.favorite(req.user, slug)
    }

    @Delete('/:slug/unfavorite')
    @UseGuards(JwtAuthGuard)
    async unfavorite(@Request() req, @Param('slug') slug: string) {
        return await this.articleService.unfavorite(req.user, slug)
    }

    @Get('/:slug')
    @UseGuards(JwtAuthGuard)
    async findBySlug(@Param('slug') slug: string, @Request() req) {
        const article = await this.articleService.findBySlug(slug)

        return  article.withFavorite(req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Request() req, @Query() query: FindAllQuery) {
        return this.articleService.findAll(req.user, query)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async store(@Body() articleDto: CreatedArticleDto, @Request() req) {
        const article = await this.articleService.store(articleDto, req.user)
        return article.withFavorite(req.user)
    }

    @Put('/:slug')
    @UseGuards(JwtAuthGuard)
    update(@Param('slug') slug: string, @Body() articleDto: UpdateArticleDto, @Request() req) {
        return this.articleService.update(slug, articleDto, req.user)
    }

    @Delete('/:slug')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('slug') slug: string, @Request() req) {
        return this.articleService.delete(slug, req.user)
    }
}