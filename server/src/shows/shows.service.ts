import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Shows } from "@prisma/client";

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  async getAllShows(): Promise<Shows[]> {
    const shows = await this.prisma.shows.findMany();
    return shows;
  }
}
