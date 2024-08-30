import request from 'supertest';
import { App } from '../app';
import { RecipeRoute } from '../routes/recipe.route';
import { Container } from 'typedi';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '@prisma/client';

const mockRecipeService = {
  createRecipe: jest.fn(),
  fetchAll: jest.fn(),
  fetchOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  findUnique: jest.fn(),
};

beforeAll(() => {
  Container.set(RecipeService, mockRecipeService);
});

jest.mock('../services/recipe.service', () => {
  return {
    RecipeService: jest.fn(() => mockRecipeService),
  };
});

describe('Recipe Route', () => {
  let app: App;
  let server: any;
  beforeAll(() => {
    app = new App([new RecipeRoute()]);
    server = app.getServer().listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a recipe successfully', async () => {
    const now = new Date().toISOString();

    const mockRecipe: Recipe = {
      id: '1',
      title: 'Test Recipe',
      description: 'This is a test recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      file: 'somefile.txt',
      category_id: '123',
      instructions: 'Step 1: Do this. Step 2: Do that.',
      created_at: new Date(now),
      updated_at: new Date(now),
    };

    mockRecipeService.createRecipe.mockResolvedValue(mockRecipe);

    const res = await request(app.getServer()).post('/api/recipes').send({
      title: 'Test Recipe',
      description: 'This is a test recipe',
      ingredients: 'ingredient1, ingredient2',
      instructions: 'Step 1: Do this. Step 2: Do that.',
      file: 'somefile.txt',
      category_id: '123',
    });

    const responseBody = res.body.data;

    expect(res.statusCode).toBe(201);

    expect(responseBody.title).toBe('Test Recipe');
    expect(responseBody.description).toBe('This is a test recipe');
    expect(responseBody.ingredients).toEqual(['ingredient1', 'ingredient2']);
    expect(responseBody.file).toBe('somefile.txt');
    expect(responseBody.category_id).toBe('123');
    expect(responseBody.instructions).toBe('Step 1: Do this. Step 2: Do that.');
    expect(responseBody.created_at).toBe(new Date(now).toISOString());
    expect(responseBody.updated_at).toBe(new Date(now).toISOString());
    expect(res.body.message).toBe('create recipe successfull');
  });

  it('should fetch all recipes successfully', async () => {
    const now1 = new Date();
    const now2 = new Date();
    const mockRecipes: Recipe[] = [
      {
        id: '1',
        title: 'Test Recipe 1',
        description: 'Description 1',
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: 'Step 1',
        file: '',
        category_id: '',
        created_at: now1,
        updated_at: now1,
      },
      {
        id: '2',
        title: 'Test Recipe 2',
        description: 'Description 2',
        ingredients: ['ingredient3', 'ingredient4'],
        instructions: 'Step 2',
        file: '',
        category_id: '',
        created_at: now2,
        updated_at: now2,
      },
    ];

    mockRecipeService.fetchAll.mockResolvedValue(mockRecipes);

    const res = await request(app.getServer()).get('/api/recipes');

    const responseBody = res.body.data.map((item: Recipe) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    }));

    expect(res.statusCode).toBe(201);
    expect(responseBody).toEqual(mockRecipes);
    expect(res.body.message).toBe('all recipes fetched successfully');
  });

  it('should delete a recipe successfully', async () => {
    const mockRecipe = {
      id: '1',
      title: 'Test Recipe',
      description: 'This is a test recipe',
      ingredients: 'ingredient1, ingredient2',
      instructions: 'Step 1: Do this. Step 2: Do that.',
    };

    mockRecipeService.deleteOne.mockResolvedValue(mockRecipe);

    const res = await request(app.getServer()).delete('/api/recipes/1');

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toEqual(mockRecipe);
    expect(res.body.message).toBe('recipe deleted successfully');
  });

  it('should update a recipe successfully', async () => {
    const now = new Date().toISOString();

    const mockOriginalRecipe: Recipe = {
      id: '1',
      title: 'Original Recipe Title',
      description: 'Original Description',
      ingredients: ['ingredient1', 'ingredient2'],
      file: 'originalfile.txt',
      category_id: '123',
      instructions: 'Original Instructions',
      created_at: new Date(now),
      updated_at: new Date(now),
    };

    const mockUpdatedRecipe: Recipe = {
      id: '1',
      title: 'Updated Recipe Title',
      description: 'Updated Description',
      ingredients: ['updatedIngredient1', 'updatedIngredient2'],
      file: 'updatedfile.txt',
      category_id: '456',
      instructions: 'Updated Instructions',
      created_at: new Date(now),
      updated_at: new Date(now),
    };

    mockRecipeService.findUnique.mockResolvedValue(mockOriginalRecipe);
    mockRecipeService.updateOne.mockResolvedValue(mockUpdatedRecipe);

    const res = await request(app.getServer()).put('/api/recipes/1').send({
      title: 'Updated Recipe Title',
      description: 'Updated Description',
      ingredients: 'updatedIngredient1, updatedIngredient2',
      instructions: 'Updated Instructions',
      file: 'updatedfile.txt',
      category_id: '456',
    });

    const responseBody = res.body.data;

    expect(res.statusCode).toBe(201);

    expect(responseBody.title).toBe('Updated Recipe Title');
    expect(responseBody.description).toBe('Updated Description');
    expect(responseBody.ingredients).toEqual(['updatedIngredient1', 'updatedIngredient2']);
    expect(responseBody.file).toBe('updatedfile.txt');
    expect(responseBody.category_id).toBe('456');
    expect(responseBody.instructions).toBe('Updated Instructions');
    expect(responseBody.created_at).toBe(new Date(now).toISOString());
    expect(responseBody.updated_at).toBe(new Date(now).toISOString());
    expect(res.body.message).toBe('recipe updated successfully');
  });

  it('should fetch a recipe by ID successfully', async () => {
    const now = new Date().toISOString();

    const mockRecipe: Recipe = {
      id: '1',
      title: 'Test Recipe',
      description: 'This is a test recipe',
      ingredients: ['ingredient1', 'ingredient2'],
      file: 'testfile.txt',
      category_id: '123',
      instructions: 'Step 1: Do this. Step 2: Do that.',
      created_at: new Date(now),
      updated_at: new Date(now),
    };

    mockRecipeService.fetchOne.mockResolvedValue(mockRecipe);

    const res = await request(app.getServer()).get('/api/recipes/1');

    expect(res.statusCode).toBe(200);

    expect(res.body.data.id).toBe(mockRecipe.id);
    expect(res.body.data.title).toBe(mockRecipe.title);
    expect(res.body.data.description).toBe(mockRecipe.description);
    expect(res.body.data.ingredients).toEqual(mockRecipe.ingredients);
    expect(res.body.data.file).toBe(mockRecipe.file);
    expect(res.body.data.category_id).toBe(mockRecipe.category_id);
    expect(res.body.data.instructions).toBe(mockRecipe.instructions);
    expect(new Date(res.body.data.created_at)).toEqual(mockRecipe.created_at);
    expect(new Date(res.body.data.updated_at)).toEqual(mockRecipe.updated_at);

    expect(res.body.message).toBe('recipe fetched successfully');
  });

  afterAll(done => {
    server.close(done);
  });
});
