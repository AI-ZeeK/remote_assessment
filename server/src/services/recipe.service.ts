import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { CreateRecipeDto, FetchRecipesDto, UpdateRecipeDto } from '@/dtos/recipe.dto';
import status from 'http-status';
import { PrismaClient, Recipe } from '@prisma/client';

@Service()
export class RecipeService {
  public recipe = new PrismaClient().recipe;

  public async createRecipe(data: CreateRecipeDto): Promise<Recipe> {
    try {
      const newingredients = data.ingredients.toLowerCase().replace(/\s*,\s*/g, ',');
      const ingredients = newingredients
        .split('.')
        .join(' ')
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient !== '');
      const recipes = await this.recipe.create({
        data: {
          title: data.title.toLowerCase(),
          instructions: data.instructions.toLowerCase(),
          description: data.description.toLowerCase(),
          file: data.file,
          category: {
            connect: {
              id: data.category_id,
            },
          },
          ingredients,
          // user: {
          //   connect: {
          //     id: data.user_id,
          //   },
          // },
        },
      });
      return recipes;
    } catch (error) {
      throw new HttpException(status.BAD_REQUEST, `Something went wrong: ${error.message}`);
    }
  }
  public async fetchAll({ page_size, page }: FetchRecipesDto): Promise<{
    recipes: Recipe[];
    meta: { total_pages: number; total_count: number; current_page: number; page_size: number; has_next_page: boolean; has_previous_page: boolean };
  }> {
    try {
      console.log(112);
      const skip = (page - 1) * page_size;
      console.log(page_size, 243543, skip, page);

      const recipes = await this.recipe.findMany({
        skip,
        take: page_size,
        orderBy: {
          created_at: 'desc', // Optional: Sort by creation date or any other field
        },
        include: {
          category: true,
        },
      });
      const total_count = await this.recipe.count();
      const total_pages = Math.ceil(total_count / page_size);
      return {
        recipes,
        meta: {
          total_pages,
          total_count,
          page_size,
          current_page: page,
          has_next_page: page < total_pages,
          has_previous_page: page > 1,
        },
      };
    } catch (error) {
      throw new HttpException(status.BAD_REQUEST, `Something went wrong: ${error.message}`);
    }
  }
  // public async fetchUserRecipe(user_id: string): Promise<Recipe[]> {
  //   try {
  //     const recipes = await this.recipe.findMany({
  //       where: {
  //         user_id,
  //       },
  //     });
  //     return recipes;
  //   } catch (error) {
  //     throw new HttpException(status.BAD_REQUEST, `Something went wrong: ${error.message}`);
  //   }
  // }
  public async fetchOne(id: string): Promise<Recipe> {
    try {
      const recipes = await this.recipe.findUnique({
        where: { id },
      });
      if (!recipes) throw new HttpException(status.NOT_FOUND, `Recipe with id ${id} not found`);

      return recipes;
    } catch (error) {
      throw new HttpException(status.BAD_REQUEST, `Something went wrong: ${error.message}`);
    }
  }
  public async updateOne(id: string, data: UpdateRecipeDto): Promise<Recipe> {
    try {
      const response = await this.recipe.findUnique({
        where: { id },
      });
      if (!response) throw new HttpException(status.NOT_FOUND, `Recipe with id ${id} not found`);
      const ingredients = data.ingredients ? data.ingredients.replace(/\s*,\s*/g, ',').split(',') : response.ingredients;

      const res = await this.recipe.update({
        where: { id },
        data: {
          title: data.title ? data.title : response.title,
          ingredients: ingredients,
          instructions: data.instructions ? data.instructions : response.instructions,
          description: data.description ? data.description : response.description,
          category_id: data.category_id ? data.category_id : response.category_id,
        },
      });

      return res;
    } catch (error) {
      throw new HttpException(status.BAD_REQUEST, `Something went wrong: ${error.message}`);
    }
  }
  public async deleteOne(id: string): Promise<Recipe> {
    try {
      const recipes = await this.recipe.findUnique({
        where: { id },
      });
      if (!recipes) throw new HttpException(status.NOT_FOUND, `Recipe with id ${id} not found`);

      const res = await this.recipe.delete({
        where: { id },
      });

      return res;
    } catch (error) {
      throw new HttpException(status.BAD_REQUEST, `Something went wrong: ${error.message}`);
    }
  }
}
