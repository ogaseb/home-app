import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ShowsService } from "./shows.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller({ path: "shows" })
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @UseGuards(AuthGuard)
  @Get("/all")
  async login(): Promise<any> {
    const data = await this.showsService.getAllShows();
    return {
      shows: data,
      message: "success",
    };
  }

  @UseGuards(AuthGuard)
  @Post("/add")
  async add(@Body("show") show, @Request() req: any): Promise<any> {
    console.log(show);
    const data = await this.showsService.addShow(show, req.user.id);
    return {
      show: data,
      message: "success",
    };
  }

  @UseGuards(AuthGuard)
  @Post("/watched")
  async watched(@Body("show") show, @Request() req: any): Promise<any> {
    const data = await this.showsService.watchedShow(show, req.user.id);
    return {
      show: data,
      message: "success",
    };
  }
}
