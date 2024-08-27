import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { User } from '@prisma/client';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';

jest.mock('./auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    authService = new AuthService();
    authController = new AuthController();
    req = {
      body: {
        email: 'test@example.com',
        password: 'password',
        firstname: 'John',
        lastname: 'Doe',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  it('should call signup and return user data with status 201', async () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      password: 'hashedPassword',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const userWithToken = { ...user, token: 'mockToken' };
    jest.spyOn(authService, 'signup').mockResolvedValue(userWithToken);

    await authController.signUp(req as Request, res as Response, next);

    expect(authService.signup).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: user, message: 'signup successfull' });
  });

  it('should handle errors and call next', async () => {
    const error = new Error('Signup failed');
    jest.spyOn(authService, 'signup').mockRejectedValue(error);

    await authController.signUp(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
