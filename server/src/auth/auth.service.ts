import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

const allowedEmails = process.env.ALLOWED_EMAILS;
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(params: { email: string; name: string; nickname: string }) {
        const { email, name, nickname } = params;

        if (!allowedEmails.includes(email)) {
            throw new UnauthorizedException(
                "Missing required property: someProperty",
            );
        }

        let user: User;
        user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: { email, name, nickname },
                select: {
                    id: true,
                    name: true,
                    nickname: true,
                    email: true,
                },
            });
        }

        const payload = {
            username: user.name,
            id: user.id,
            email: user.email,
            nickname: user.nickname,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
