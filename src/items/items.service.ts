import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
    private readonly items: any[] = [{ id: 1, name: 'Item One' }, { id: 2, name: 'Item Two' }];

    findAll(): any[] {
        return this.items;
    }

    create(item: any) {
        this.items.push(item);
    }
}
