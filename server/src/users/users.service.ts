import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

interface CreatedItemResponse {
  id: number;
  email: string;
  name: string;
  nickname: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number): Promise<CreatedItemResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }
}
