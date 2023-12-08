import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

const jwtFactory = {
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
            expiresIn: configService.get("JWT_EXP_D"),
        },
    }),
    inject: [ConfigService],
};

@Module({
    imports: [JwtModule.registerAsync(jwtFactory)],
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
})
export class UsersModule {}
