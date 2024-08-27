import { PrismaClient } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import status from 'http-status';

const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    console.log(1, '.........');
    const Authorization = getAuthorization(req);
    console.log(Authorization, '.........');

    if (Authorization) {
      const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      console.log('....------', id);
      const { user } = new PrismaClient();
      const findUser = await user.findUnique({ where: { id } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(status.UNAUTHORIZED, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(status.UNAUTHORIZED, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(status.UNAUTHORIZED, 'Wrong authentication token'));
  }
};
