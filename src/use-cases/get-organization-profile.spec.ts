import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { GetOrganizationProfileUseCase } from "./get-organization-profile";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcrypt";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetOrganizationProfileUseCase;

describe("Get Organization Profile Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetOrganizationProfileUseCase(organizationsRepository);
  });

  it("should be able to get organization profile", async () => {
    const createdOrganization = await organizationsRepository.create({
      responsible_name: "John Doe",
      email: "john@doe.com",
      address: "Groove Street",
      number: "123",
      neighborhood: "Santos",
      cep: "12345-321",
      city: "São Paulo",
      state: "SP",
      whatsApp: "(11) 99999-9999",
      password_hash: await hash("123456", 6),
    });

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    });

    expect(organization.responsible_name).toEqual("John Doe");
  });

  it("should not be able to get organization profile with wrong id", async () => {
    await expect(
      sut.execute({
        organizationId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
