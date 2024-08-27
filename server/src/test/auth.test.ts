import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';
import { CreateUserDto } from '@/dtos/users.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

describe('AuthController', () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    authController = new AuthController();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up a user and return 201 status with user data', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
    };

    mockRequest = {
      body: userData,
    };

    // Mock the AuthService methods
    const authService = Container.get(AuthService);
    jest.spyOn(authService, 'signup').mockResolvedValue({
      id: 'mockId',
      ...userData,
      token: 'mockToken',
      created_at: new Date(),
      updated_at: new Date(),
    });

    await authController.signUp(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: { ...userData, token: 'mockToken' },
      message: 'signup successfull',
    });
  });

  it('should return 409 if email already exists', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
    };

    mockRequest = {
      body: userData,
    };

    // Mock the AuthService to throw an exception for existing email
    const authService = Container.get(AuthService);
    jest.spyOn(authService, 'signup').mockRejectedValue(new Error('This email already exists'));

    await authController.signUp(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'This email already exists',
    });
  });
});
