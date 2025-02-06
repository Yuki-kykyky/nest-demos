import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { TypedConfigService } from "../config/typed-config.service";
import { AuthConfig } from "../config/auth.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: TypedConfigService) => ({
        secret: config.get<AuthConfig>("auth")?.jwt.secret,
        signOptions: {
          expiresIn: config.get<AuthConfig>("auth")?.jwt.expiresIn,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class UserModule {}
