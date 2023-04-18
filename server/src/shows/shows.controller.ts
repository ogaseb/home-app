import { Controller, Get } from "@nestjs/common";
import { ShowsService } from "./shows.service";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller({ path: "shows" })
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get("/all")
  async login(): Promise<any> {
    const data = await this.showsService.getAllShows();
    return {
      data,
      message: "success",
    };
  }
}
