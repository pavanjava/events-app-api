import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes} from '@nestjs/common';
import {EventsService} from "./events.service";
import {EventsDto} from "./events.dto";
import {ValidationPipe} from "../util/Validation.pipe";

@Controller('/api/v1/events')
export class EventsController {

    constructor(private eventService: EventsService) {
    }

    @Get()
    showAllEvents() {
        return this.eventService.showAll();
    }

    @Post()
    createEvent(@Body(new ValidationPipe()) event: EventsDto) {
        return this.eventService.create(event)
    }

    @Get(':id')
    showEventById(@Param('id') id: string) {
        return this.eventService.read(id);
    }

    @Put(':id')
    updateEvent(@Param('id') id: string, @Body(new ValidationPipe()) event: EventsDto) {
        return this.eventService.update(id, event);
    }

    @Delete(':id')
    removeEvent(@Param('id') id: string) {
        return this.eventService.remove(id);
    }
}
