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
    /**
     * @swagger
     * /api/recipes:
     *   post:
     *     summary: Create a new recipe
     *     tags: [Recipes]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateRecipeDto'
     *     responses:
     *       201:
     *         description: Created recipe
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Recipe'
     */
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRecipeDto), this.recipe.create);
    /**
     * @swagger
     * /api/recipes:
     *   get:
     *     summary: Fetch all recipes
     *     tags: [Recipes]
     *     responses:
     *       200:
     *         description: List of recipes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Recipe'
     */
    this.router.get(`${this.path}`, this.recipe.fetchRecipes);
    /**
     * @swagger
     * /api/recipes:
     *   get:
     *     summary: Fetch all recipes
     *     tags: [Recipes]
     *     responses:
     *       200:
     *         description: List of recipes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Recipe'
     */
    this.router.get(`${this.path}/:recipe_id`, this.recipe.fetchRecipe);
    /**
     * @swagger
     * /api/recipes/{recipe_id}:
     *   put:
     *     summary: Update a recipe
     *     tags: [Recipes]
     *     parameters:
     *       - in: path
     *         name: recipe_id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateRecipeDto'
     *     responses:
     *       200:
     *         description: Updated recipe
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Recipe'
     */
    this.router.put(`${this.path}/:recipe_id`, ValidationMiddleware(UpdateRecipeDto), this.recipe.updateRecipe);

    /**
     * @swagger
     * /api/recipes/{recipe_id}:
     *   delete:
     *     summary: Delete a recipe
     *     tags: [Recipes]
     *     parameters:
     *       - in: path
     *         name: recipe_id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Recipe deleted successfully
     */
    this.router.delete(`${this.path}/:recipe_id`, this.recipe.deleteRecipe);
  }
}
