import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { RecipeController } from '@/controllers/recipe.controller';
import { CreateRecipeDto, UpdateRecipeDto } from '@/dtos/recipe.dto';

export class RecipeRoute implements Routes {
  public path = '/api/recipes';
  public router = Router();
  public recipe = new RecipeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRecipeDto), this.recipe.create);
    this.router.get(`${this.path}`, this.recipe.fetchRecipes);
    this.router.get(`${this.path}/:recipe_id`, this.recipe.fetchRecipe);
    this.router.put(`${this.path}/:recipe_id`, ValidationMiddleware(UpdateRecipeDto), this.recipe.updateRecipe);
    this.router.delete(`${this.path}/:recipe_id`, this.recipe.deleteRecipe);
  }
}
