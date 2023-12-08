import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "7d" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, UsersService],
})
export class AuthModule {}
