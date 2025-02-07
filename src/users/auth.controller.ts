import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { CreateUserDto } from "./create-user.dto";
import { User } from "./user.entity";
import { LoginDto } from "./login.dto";

@Controller("users")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post("login")
  public async login(@Body() loginDto: LoginDto): Promise<string> {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
