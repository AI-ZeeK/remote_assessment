import { Category, PrismaClient, User } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { CreateCategoryDto } from '@/dtos/category.dto';
import status from 'http-status';

@Service()
export class CategoryService {
  public category = new PrismaClient().category;

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    try {
      const category: Category = await this.category.findUnique({ where: { title: data.title } });
      if (category) throw new HttpException(409, `The cateory:-${category.title} already exists`);

      return this.category.create({
        data,
      });
    } catch (error) {
      throw new HttpException(status.BAD_REQUEST, `Something went wrong: ${error.message}`);
    }
  }

  async categories(): Promise<Category[]> {
    return this.category.findMany();
  }
}
