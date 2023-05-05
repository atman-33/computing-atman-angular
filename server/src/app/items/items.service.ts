import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item-dto';
import { ItemRepository } from './items.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class ItemsService {

  private items: Item[] = [];

  /**
   *
   */
  constructor(private readonly itemRepository: ItemRepository) {
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if(item.userId === user.id){
      throw new BadRequestException('You cannot purchase your own product!');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.itemRepository.save(item);
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if(item.userId !== user.id){
      // eslint-disable-next-line quotes
      throw new BadRequestException("You cannot delete someone else's item!");
    }
    await this.itemRepository.delete({ id });
  }
}
