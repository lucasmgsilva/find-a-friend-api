import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { RegisterUseCase } from "./register";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { compare } from "bcrypt";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterUseCase(organizationsRepository);
  });

  it("should be able to register", async () => {
    const { organization } = await sut.execute({
      responsible_name: "John Doe",
      email: "john@doe.com",
      address: "Groove Street",
      number: "123",
      neighborhood: "Santos",
      cep: "12345-321",
      city: "São Paulo",
      state: "SP",
      whatsApp: "(11) 99999-9999",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const password = "123456";

    const { organization } = await sut.execute({
      responsible_name: "John Doe",
      email: "john@doe.com",
      address: "Groove Street",
      number: "123",
      neighborhood: "Santos",
      cep: "12346-321",
      city: "São Paulo",
      state: "SP",
      whatsApp: "(11) 99999-9999",
      password,
    });

    const isPasswordCorrectlyHashed = await compare(
      password,
      organization.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "john@doe.com";

    await sut.execute({
      responsible_name: "John Doe",
      email: email,
      address: "Groove Street",
      number: "123",
      neighborhood: "Santos",
      cep: "12346-321",
      city: "São Paulo",
      state: "SP",
      whatsApp: "(11) 99999-9999",
      password: "123456",
    });

    await expect(
      sut.execute({
        responsible_name: "John Doe",
        email: email,
        address: "Groove Street",
        number: "123",
        neighborhood: "Santos",
        cep: "12346-321",
        city: "São Paulo",
        state: "SP",
        whatsApp: "(11) 99999-9999",
        password: "123456",
      })
    ).rejects.toThrow(UserAlreadyExistsError);
  });
});
