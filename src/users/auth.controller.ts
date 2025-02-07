import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  SerializeOptions,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { CreateUserDto } from "./create-user.dto";
import { User } from "./user.entity";
import { LoginDto } from "./login.dto";
import { UserService } from "./user.service";
import { AuthRequest } from "./auth.request";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: "excludeAll" })
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post("login")
  public async login(@Body() loginDto: LoginDto): Promise<string> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get("/profile")
  async profile(@Request() request: AuthRequest): Promise<User> {
    const user = await this.userService.findOne(request.user.sub);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
}
