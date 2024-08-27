import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RecipeService } from '@/services/recipe.service';
import { CreateRecipeDto, UpdateRecipeDto } from '@/dtos/recipe.dto';

export class RecipeController {
  public recipeService = Container.get(RecipeService);

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const { id }: any = req.user;
      const data: CreateRecipeDto = req.body;

      const recipeData = await this.recipeService.createRecipe(data);

      res.status(201).json({ data: recipeData, message: 'create recipe successfull' });
    } catch (error) {
      next(error);
    }
  };

  public fetchRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.query;

      console.log(data);
      const page = data.page ? Number(data.page) : 1;
      const page_size = data.page_size ? Number(data.page_size) : 5;

      const recipeData = await this.recipeService.fetchAll({ page, page_size });

      res.status(201).json({ data: recipeData, message: 'all recipes fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  // public fetchUserRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const { user_id } = req.params;
  //     const recipeData = await this.recipeService.fetchUserRecipe(user_id);
  //     res.status(201).json({ data: recipeData, message: 'user recipes fetched successfully' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public fetchRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { recipe_id } = req.params;
      const recipeData = await this.recipeService.fetchOne(recipe_id);
      res.status(201).json({ data: recipeData, message: 'recipe fetched successfully' });
    } catch (error) {
      next(error);
    }
  };
  public updateRecipe = async (req: Request & { file: any }, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { recipe_id } = req.params;
      const data: UpdateRecipeDto = req.body;
      const file = req.file ? req.file.filename : null;

      const recipeData = await this.recipeService.updateOne(recipe_id, { ...data, file });
      res.status(201).json({ data: recipeData, message: 'recipe updated successfully' });
    } catch (error) {
      next(error);
    }
  };
  public deleteRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { recipe_id } = req.params;
      const recipeData = await this.recipeService.deleteOne(recipe_id);
      res.status(201).json({ data: recipeData, message: 'recipe deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
