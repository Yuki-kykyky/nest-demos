import { validate } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

describe("CreateUserDto", () => {
  it("should validate complete valid data", async () => {
    // 3xA
    // Arrange
    const dto = new CreateUserDto();
    dto.email = "test@test.com";
    dto.name = "Piotr";
    dto.password = "123456";
    // Act
    const errors = await validate(dto);
    // Assert
    expect(errors.length).toBe(0);
  });
});
