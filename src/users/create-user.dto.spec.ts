import { validate } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

describe("CreateUserDto", () => {
  let dto: CreateUserDto;
  beforeEach(() => {
    dto = new CreateUserDto();
    dto.email = "test@test.com";
    dto.name = "Piotr";
    dto.password = "1234A@";
  });
  it("should validate complete valid data", async () => {
    // when
    const errors = await validate(dto);
    // then
    expect(errors.length).toBe(0);
  });

  it("should fail on invalid", async () => {
    // given
    dto.email = "test";
    dto.name = "";
    dto.password = "test";

    // when
    const errors = await validate(dto);

    // then
    expect(errors.length).toBe(3);
    expect(errors[0].property).toBe("email");
    expect(errors[0].constraints).toHaveProperty("isEmail");
    expect(errors[1].property).toBe("name");
    expect(errors[1].constraints).toHaveProperty("isNotEmpty");
    expect(errors[2].property).toBe("password");
    expect(errors[2].constraints).toHaveProperty("minLength");
  });

  const testPassword = async (password: string, message: string) => {
    dto.password = password;
    const errors = await validate(dto);
    const passwordError = errors.find((error) => error.property === "password");
    expect(passwordError).not.toBeUndefined();
    const messages = Object.values(passwordError?.constraints ?? {});
    expect(messages).toContain(message);
  };

  it("should fail without 1 uppercase letter", async () => {
    await testPassword(
      "abcdef",
      "Password must contain at least 1 uppercase letter",
    );
  });
  it("should fail without at least 1 number", async () => {
    await testPassword("abdefaA", "Password must contain at least 1 number");
  });
  it("should fail without at least 1 special character", async () => {
    await testPassword(
      "abdefaA1",
      "Password must contain at least 1 special character",
    );
  });
});
