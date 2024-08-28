import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CategoryController } from '@/controllers/category.controller';
import { CreateCategoryDto } from '@/dtos/category.dto';

export class CategoryRoute implements Routes {
  public path = '/api/category';
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateCategoryDto), this.category.createCategory);
    this.router.get(`${this.path}`, this.category.fetchCategories);
  }
}
