import { validate } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

describe("CreateUserDto", () => {
  let dto: CreateUserDto;
  beforeEach(() => {
    dto = new CreateUserDto();
    dto.email = "test@test.com";
    dto.name = "Piotr";
    dto.password = "123456";
  });
  it("should validate complete valid data", async () => {
    // 3xA
    // Arrange
    // Act
    const errors = await validate(dto);
    // Assert
    expect(errors.length).toBe(0);
  });

  it("should fail on invalid", async () => {
    // Arrange
    dto.email = "test";
    dto.name = "";
    dto.password = "test";
    // Act
    const errors = await validate(dto);
    // Assert
    expect(errors.length).toBe(3);
    expect(errors[0].property).toBe("email");
    expect(errors[0].constraints).toHaveProperty("isEmail");
    expect(errors[1].property).toBe("name");
    expect(errors[1].constraints).toHaveProperty("isNotEmpty");
    expect(errors[2].property).toBe("password");
    expect(errors[2].constraints).toHaveProperty("minLength");
  });
});
