import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {EventsService} from "./events.service";
import {EventsDto} from "./events.dto";

@Controller('/api/v1/events')
export class EventsController {

    constructor(private eventService: EventsService) {
    }

    @Get()
    showAllEvents() {
        return this.eventService.showAll();
    }

    @Post()
    createEvent(@Body() event: EventsDto) {
        return this.eventService.create(event)
    }

    @Get(':id')
    showEventById(@Param('id') id: string) {
        return this.eventService.read(id);
    }

    @Put(':id')
    updateEvent(@Param('id') id: string, @Body() event: EventsDto) {
        return this.eventService.update(id, event);
    }

    @Delete(':id')
    removeEvent(@Param('id') id: string) {
        return this.eventService.remove(id);
    }
}
