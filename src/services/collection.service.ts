import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../dtos/collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const collection = this.collectionRepository.create(createCollectionDto);
    return this.collectionRepository.save(collection);
  }

  async findAll(): Promise<Collection[]> {
    return this.collectionRepository.find({
      relations: ['productCollections', 'productCollections.product'],
    });
  }

  async findOne(id: string): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { collection_id: id },
      relations: ['productCollections', 'productCollections.product'],
    });

    if (!collection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }

    return collection;
  }

  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    const collection = await this.findOne(id);
    Object.assign(collection, updateCollectionDto);
    return this.collectionRepository.save(collection);
  }

  async remove(id: string): Promise<void> {
    const collection = await this.findOne(id);
    await this.collectionRepository.remove(collection);
  }
}
