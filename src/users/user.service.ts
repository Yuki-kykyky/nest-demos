import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./create-user.dto";
import { PasswordService } from "./password/password.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  public async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  // question: how to test the result of this method? can it be achieved at service level?
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(
      createUserDto.password,
    );
    // make sure to create an instance of the User entity
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    // then save it to the database
    return await this.userRepository.save(user);
  }
}
