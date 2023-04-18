import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ShowsController } from "./shows.controller";
import { ShowsService } from "./shows.service";

@Module({
  controllers: [ShowsController],
  providers: [PrismaService, ShowsService],
})
export class ShowsModule {}
