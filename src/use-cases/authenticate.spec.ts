import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { AuthenticateUseCase } from "./authenticate";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { compare, hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);
  });

  it("should be able to authenticate", async () => {
    await organizationsRepository.create({
      responsible_name: "John Doe",
      email: "john@doe.com",
      cep: "12346-321",
      address: "Groove Street",
      whatsApp: "(11) 99999-9999",
      password_hash: await hash("123456", 6),
    })

    const { organization } = await sut.execute({
      email: "john@doe.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await organizationsRepository.create({
      responsible_name: "John Doe",
      email: "john@doe.com",
      cep: "12346-321",
      address: "Groove Street",
      whatsApp: "(11) 99999-9999",
      password_hash: await hash("123456", 6),
    })

    await expect(sut.execute({
      email: "wrong@email.com",
      password: "123456",
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  })

  it('should not be able to authenticate with wrong email', async () => {
    await organizationsRepository.create({
      responsible_name: "John Doe",
      email: "john@doe.com",
      cep: "12346-321",
      address: "Groove Street",
      whatsApp: "(11) 99999-9999",
      password_hash: await hash("123456", 6),
    })

    await expect(sut.execute({
      email: "john@doe.com",
      password: "123123",
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  })
});
