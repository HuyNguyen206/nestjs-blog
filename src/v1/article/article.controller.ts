import {
    Body,
    Controller,
    Post,
    Request,
    Put,
    Param,
    Delete,
    HttpCode,
    Get,
    HttpStatus, Query, Logger, InternalServerErrorException
} from '@nestjs/common';
import {ArticleService} from './article.service';
import {ArticleResponse, CreatedArticleDto, FindAllQuery, FindFeedQuery, UpdateArticleDto} from "../dto/article.dto";
import {ResponseObject} from "../dto/response.model";
import {ApiBearerAuth} from "@nestjs/swagger";
import {Public} from "../../auth/guards/public.guard";

@Controller()
export class ArticleController {
    private logger = new Logger('ArticleController')
    constructor(private readonly articleService: ArticleService) {
    }

    @Get('/feed')
    @ApiBearerAuth()
    async findFeed(@Request() req, @Query() query: FindFeedQuery)
        : Promise<ResponseObject<'articles', ArticleResponse[]> & ResponseObject<'articles_count', number>> {
        this.logger.verbose(`User ${req.user.username} retrieve all the article with filter: ${JSON.stringify(query)}` )

        const articles = await this.articleService.findFeed(req.user, query)

        return {articles: articles, articles_count: articles.length}
    }

    @Post('/:slug/favorite')
    @ApiBearerAuth()
    async favorite(@Request() req, @Param('slug') slug: string) {
        return await this.articleService.favorite(req.user, slug)
    }

    @Delete('/:slug/unfavorite')
    @ApiBearerAuth()
    async unfavorite(@Request() req, @Param('slug') slug: string) {
        return await this.articleService.unfavorite(req.user, slug)
    }

    @Get('/:slug')
    @ApiBearerAuth()
    async findBySlug(@Param('slug') slug: string, @Request() req) {
        const article = await this.articleService.findBySlug(slug)

        return article.withFavorite(req.user)
    }

    @Get()
    @Public()
    findAll(@Request() req, @Query() query: FindAllQuery) {
        this.logger.verbose(`User retrieve all the article with filter: ${JSON.stringify(query)}` )

        return this.articleService.findAll(req.user, query)
    }

    @Post()
    @ApiBearerAuth()
    async store(@Body() articleDto: CreatedArticleDto, @Request() req) {
        try {
            const article = await this.articleService.store(articleDto, req.user)
            return article.withFavorite(req.user)
        }catch (err) {
            this.logger.error(err.message, err.stack)

            throw new InternalServerErrorException(err.message)
        }

    }

    @Put('/:slug')
    @ApiBearerAuth()
    update(@Param('slug') slug: string, @Body() articleDto: UpdateArticleDto, @Request() req) {
        return this.articleService.update(slug, articleDto, req.user)
    }

    @Delete('/:slug')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    delete(@Param('slug') slug: string, @Request() req) {
        return this.articleService.delete(slug, req.user)
    }
}
