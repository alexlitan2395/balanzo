import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const dbUser = await this.prisma.user.findUnique({ where: { email } });
    if (!dbUser) return null;

    return dbUser;
  }

  async save(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        emailVerified: user.emailVerified,
      },
    });

    return new User(
      created.id,
      created.email,
      created.password,
      created.emailVerified,
      created.refreshToken,
      created.verificationCode,
      created.resetToken,
      created.resetTokenExpires,
      created.createdAt,
      created.updatedAt,
    );
  }
}
