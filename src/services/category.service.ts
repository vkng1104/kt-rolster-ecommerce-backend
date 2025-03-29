import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['products'],
    });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['products'],
    });
  }

  async update(id: number, categoryData: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, categoryData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async getHierarchy(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return this.buildHierarchy(categories);
  }

  private buildHierarchy(
    categories: Category[],
    parentId: number = null,
  ): Category[] {
    return categories
      .filter((category) => category.parent_category_id === parentId)
      .map((category) => ({
        ...category,
        children: this.buildHierarchy(categories, category.category_id),
      }));
  }
}
