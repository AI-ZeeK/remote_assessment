import { PrismaClient, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { HttpException } from '../exceptions/HttpException';
import { AuthService } from '@/services/auth.service';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    })),
  };
});

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let prismaClientMock: PrismaClient;

  beforeEach(() => {
    authService = new AuthService();
    prismaClientMock = new PrismaClient();
  });
  it('should throw an error if the email already exists', async () => {
    (prismaClientMock.user.findUnique as jest.Mock).mockResolvedValue({ email: 'test@example.com' } as User);

    await expect(authService.signup({ email: 'test@example.com', password: 'password' } as any)).rejects.toThrow(
      new HttpException(409, 'This email test@example.com already exists, proceed to login'),
    );
  });
  it('should create a new user and return the user data with a token', async () => {
    (prismaClientMock.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prismaClientMock.user.create as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      password: 'hashedPassword',
      created_at: new Date(),
      updated_at: new Date(),
    } as User);
    (hash as jest.Mock).mockResolvedValue('hashedPassword');

    const result = await authService.signup({ email: 'test@example.com', password: 'password', firstname: 'John', lastname: 'Doe' });

    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      token: expect.any(String),
    });
  });
});
