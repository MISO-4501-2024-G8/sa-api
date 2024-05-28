import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    findAll(): any[] {
        return this.itemsService.findAll();
    }

    @Post()
    create(@Body() item: any) {
        this.itemsService.create(item);
    }
}
