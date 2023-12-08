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
import yts = require("yt-search");

@Controller({ path: "shows" })
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @UseGuards(AuthGuard)
  @Get("/all")
  async login(): Promise<{ shows: unknown; message: string }> {
    const data = await this.showsService.getAllShows();
    return {
      shows: data,
      message: "success",
    };
  }

  @UseGuards(AuthGuard)
  @Post("/add")
  async add(
    @Body("show") show,
    @Request() req: { user: { id: number } },
  ): Promise<{ show: unknown; message: string }> {
    const data = await this.showsService.addShow(show, req.user.id);
    return {
      show: data,
      message: "success",
    };
  }

  @UseGuards(AuthGuard)
  @Post("/watched")
  async watched(
    @Body("show") show,
    @Request() req: { user: { id: number } },
  ): Promise<{ show: unknown; message: string }> {
    const data = await this.showsService.watchedShow(show, req.user.id);
    return {
      show: data,
      message: "success",
    };
  }

  @UseGuards(AuthGuard)
  @Post("/youtube")
  async getYutubeSearch(
    @Body("show") show,
  ): Promise<{ data: unknown; message: string }> {
    if (!show.title) {
      return;
    }
    const data = await yts(show.title);
    return {
      data,
      message: "success",
    };
  }
}
