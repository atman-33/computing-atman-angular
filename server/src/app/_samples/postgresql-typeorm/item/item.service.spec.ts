import { Test } from '@nestjs/testing';
import { ItemService } from './item.service';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item-status.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// TypeORM v0.3.Xでは、repository.tsが必要ないため不要
// const mockItemRepository = () => ({
//     find: jest.fn(),
//     findOne: jest.fn(),
//     createItem: jest.fn(),
//     save: jest.fn(),
//     delete: jest.fn(),
// });

const mockUser1 = {
    id: '1',
    username: 'test1',
    password: '1234',
    status: UserStatus.PREMIUM,
  };
  const mockUser2 = {
    id: '2',
    username: 'test2',
    password: '1234',
    status: UserStatus.FREE,
  };
  
  describe('ItemServiceTest', () => {
    let itemService;
    let itemRepository;
  
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        providers: [
          ItemService,
          {
            provide: getRepositoryToken(Item),
            useClass: Repository,

            // mockを利用する場合の参考コード
            // provide: ItemRepository, useFactory: mockItemRepository
          },
        ],
      }).compile();
  
      itemService = module.get<ItemService>(ItemService);
      itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
    });
  
    describe('findAll', () => {
      it('正常系', async () => {
        const expected: Item[] = [];
        jest
          .spyOn(itemRepository, 'find')
          .mockImplementation(async () => expected);
        const result = await itemService.findAll();
  
        expect(result).toEqual(expected);
      });
    });
  
    describe('findById', () => {
      it('正常系', async () => {
        const expected = {
          id: 'test-id',
          name: 'PC',
          price: 50000,
          description: '',
          status: ItemStatus.ON_SALE,
          createdAt: '',
          updatedAt: '',
          userId: mockUser1.id,
          user: mockUser1,
        };
  
        jest
          .spyOn(itemRepository, 'findOneBy')
          .mockImplementation(async () => expected);
        const result = await itemService.findById('test-id');
        expect(result).toEqual(expected);
      });
  
      it('異常系: 商品が存在しない', async () => {
        jest
          .spyOn(itemRepository, 'findOneBy')
          .mockImplementation(async () => null);
        await expect(itemService.findById('test-id')).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  
    describe('create', () => {
      it('正常系', async () => {
        const expected = {
          id: 'test-id',
          name: 'PC',
          price: 50000,
          description: '',
          status: ItemStatus.ON_SALE,
          createdAt: '',
          updatedAt: '',
          userId: mockUser1.id,
          user: mockUser1,
        };
  
        jest
          .spyOn(itemRepository, 'create')
          .mockImplementation(async () => expected);
        jest.spyOn(itemRepository, 'save').mockImplementation(async () => []);
        const result = await itemService.create(
          { name: 'PC', price: 50000, describe: '' },
          mockUser1,
        );
        expect(result).toEqual(expected);
      });
    });
  
    describe('updateStatus', () => {
      const mockItem = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      it('正常系', async () => {
        jest
          .spyOn(itemRepository, 'findOneBy')
          .mockImplementation(async () => mockItem);
        const spy = jest
          .spyOn(itemRepository, 'update')
          .mockImplementation(() => mockItem);
        await itemService.updateStatus('test-id', mockUser2);
        expect(spy).toHaveBeenCalled();
      });
  
      it('異常系: 自身の商品を購入', async () => {
        jest
          .spyOn(itemRepository, 'findOneBy')
          .mockImplementation(async () => mockItem);
        await expect(
          itemService.updateStatus('test-id', mockUser1),
        ).rejects.toThrow(BadRequestException);
      });
    });
  
    describe('delete', () => {
      const mockItem = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      it('正常系', async () => {
        jest
          .spyOn(itemRepository, 'findOneBy')
          .mockImplementation(async () => mockItem);
  
        const deleteResponse = { affected: 1 };
        const spy = jest
          .spyOn(itemRepository, 'delete')
          .mockImplementation(async () => deleteResponse);
        await itemService.delete('test-id', mockUser1);
        expect(spy).toHaveBeenCalled();
      });
  
      it('異常系: 他人の商品を削除', async () => {
        jest
          .spyOn(itemRepository, 'findOneBy')
          .mockImplementation(async () => mockItem);
        await expect(itemService.delete('test-id', mockUser2)).rejects.toThrow(
          BadRequestException,
        );
      });
    });
  });
  