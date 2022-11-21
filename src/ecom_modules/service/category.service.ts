import { Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { CategoryRepo } from '../repo';
import { CreateCategoryReq } from '../request';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  async createCategory(createCategoryReq: CreateCategoryReq) {
    const newCategory = await this.categoryRepo.create(createCategoryReq);
    return newCategory;
  }

  async getAll() {
    const res = (await this.categoryRepo.getAll()).filter(
      (category) => category.name !== '',
    );

    return { listRoom: res };
  }

  async upsert(categoryName: string) {
    const upsertCate = await this.categoryRepo.upsert({ name: categoryName });
    return upsertCate;
  }

  async truncate() {
    await this.categoryRepo.truncate();
  }
}
