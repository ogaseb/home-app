import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller({
  path: "users",
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get(":id/auth")
  async auth(@Param("id") id: number): Promise<any> {
    // log the ticket payload in the console to see what we have
    const user = await this.userService.getUser(Number(id));

    return {
      userExist: !!user,
      message: "success",
    };
  }
}
