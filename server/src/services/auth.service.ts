import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';

@Service()
export class AuthService {
  public users = new PrismaClient().user;

  public async signup(data: CreateUserDto): Promise<User & { token: string }> {
    console.log(1, data);
    const isUser = await this.users.findUnique({ where: { email: data.email } });
    if (isUser) throw new HttpException(409, `This email ${data.email} already exists, proceed to login`);

    console.log(2);
    const hashedPassword = await hash(data.password, 10);
    const createUserData: User = await this.users.create({
      data: {
        email: data.email.toLowerCase(),
        firstname: data.firstname.toLowerCase(),
        lastname: data.lastname.toLowerCase(),
        password: hashedPassword,
      },
    });
    const { token } = this.createToken(createUserData);
    return { ...createUserData, token };
  }

  public async login(userData: LoginDto): Promise<User & { token: string }> {
    const isUser: User = await this.users.findUnique({ where: { email: userData.email.toLowerCase() } });
    if (!isUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, isUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password does not match');

    const { token } = this.createToken(isUser);

    return { ...isUser, token };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 1000;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}
