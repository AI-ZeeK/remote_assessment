import request from 'supertest';
import { App } from '../app';
import { CategoryRoute } from '../routes/category.route';
import { Container } from 'typedi';
import { CategoryService } from '../services/category.service';
import { Category } from '@prisma/client';

const mockCategoryService = {
  createCategory: jest.fn(),
  categories: jest.fn(),
};

beforeAll(() => {
  Container.set(CategoryService, mockCategoryService);
});

jest.mock('../services/category.service', () => {
  return {
    CategoryService: jest.fn(() => mockCategoryService),
  };
});

describe('Category Route', () => {
  let app: App;
  let server: any;

  beforeAll(() => {
    app = new App([new CategoryRoute()]);
    server = app.getServer().listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(done => {
    server.close(done);
  });

  it('should create a category successfully', async () => {
    const now = new Date().toISOString();
    const mockCategory: Category = {
      id: '1',
      title: 'Test Category',
      created_at: new Date(now),
      updated_at: new Date(now),
    };

    mockCategoryService.createCategory.mockResolvedValue({
      ...mockCategory,
      created_at: now,
      updated_at: now,
    });

    const res = await request(app.getServer()).post('/api/category').send({ title: 'Test Category' });
    const responseBody = res.body.data;

    expect(res.statusCode).toBe(201);
    expect(responseBody).toEqual({
      ...mockCategory,
      created_at: now,
      updated_at: now,
    });
    expect(res.body.message).toBe('category created successfully');
  });

  it('should fetch all categories successfully', async () => {
    const now1 = new Date();
    const now2 = new Date();
    const mockCategories: Category[] = [
      {
        id: '1',
        title: 'Test Category 1',
        created_at: now1,
        updated_at: now1,
      },
      {
        id: '2',
        title: 'Test Category 2',
        created_at: now2,
        updated_at: now2,
      },
    ];

    mockCategoryService.categories.mockResolvedValue(mockCategories);

    const res = await request(app.getServer()).get('/api/category');

    const responseBody = res.body.data.map((item: Category) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    }));

    expect(res.statusCode).toBe(201);
    expect(responseBody).toEqual(mockCategories);
    expect(res.body.message).toBe('All categories fetched successfully');
  });
});
