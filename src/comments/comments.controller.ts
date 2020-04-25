import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {AuthGuard} from "../util/auth.gaurd";
import {ValidationPipe} from "../util/Validation.pipe";
import {CommentsDto} from "./comments.dto";
import {User} from "../users/user.decorator";

@Controller('/api/v1/comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {
    }

    @Get('/event/:id')
    showCommentsByEvent(@Param('id') eventId: string) {
        return this.commentsService.getByEvent(eventId);
    }

    @Get('/user/:id')
    showCommentsByUser(@Param('id') userId: string) {
        return this.commentsService.getByUser(userId);
    }

    @Post('/event/:id')
    @UseGuards(new AuthGuard())
    createComment(@Body(new ValidationPipe()) comment: CommentsDto, @Param('id') eventId: string, @User('id') userId: string) {
        return this.commentsService.create(eventId, userId, comment);
    }

    @Get('/:id')
    getCommentById(@Param('id') commentId: string) {
        return this.commentsService.show(commentId);
    }

}
