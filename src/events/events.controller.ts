import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import {EventsService} from "./events.service";
import {EventsDto} from "./events.dto";
import {ValidationPipe} from "../util/Validation.pipe";
import {AuthGuard} from "../util/auth.gaurd";
import {User} from "../users/user.decorator";

@Controller('/api/v1/events')
export class EventsController {

    constructor(private eventService: EventsService) {
    }

    @Get()
    showAllEvents() {
        return this.eventService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    createEvent(@User('id') id: string, @Body(new ValidationPipe()) event: EventsDto) {
        return this.eventService.create(id, event)
    }

    @Get(':id')
    showEventById(@Param('id') id: string) {
        return this.eventService.read(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    updateEvent(@User('id') userId: string, @Param('id') eventId: string, @Body(new ValidationPipe()) event: EventsDto) {
        return this.eventService.update(userId, eventId, event);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    removeEvent(@Param('id') id: string, @User('id') userId: string) {
        return this.eventService.remove(id, userId);
    }
}
