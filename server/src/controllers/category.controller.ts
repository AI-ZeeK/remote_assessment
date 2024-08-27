import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RecipeService } from '@/services/recipe.service';
import { CategoryService } from '@/services/category.service';
import { Category } from '@prisma/client';

export class CategoryController {
  public categoryService = Container.get(CategoryService);

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: Category = req.body;
      const data: Category = await this.categoryService.createCategory({ title: categoryData.title.toLocaleLowerCase() });

      res.status(201).json({ data, message: 'category created successfully' });
    } catch (error) {
      next(error);
    }
  };
  public fetchCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: Category[] = await this.categoryService.categories();
      res.status(201).json({ data, message: 'All categories fetched successfully' });
    } catch (error) {
      next(error);
    }
  };
}
