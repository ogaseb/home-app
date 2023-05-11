import { Body, Controller, Post } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { AuthService } from "./auth.service";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(@Body("token") token): Promise<any> {
    console.log(token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    // log the ticket payload in the console to see what we have
    const { email, name, given_name } = ticket.getPayload();

    const data = await this.authService.login({
      email,
      name,
      nickname: given_name,
    });

    return {
      access_token: data.access_token,
      message: "success",
    };
  }
}
