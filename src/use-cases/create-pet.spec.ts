import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { createOrganizationInMemory } from "@/utils/create-organization-in-memory";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create pet", async () => {
    const { organization } = await createOrganizationInMemory()

    const { pet } = await sut.execute({
      name: "Princesa",
      about: "É uma cachorrinha muito dócil e brincalhona",
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'MEDIUM',
      independence_level: 'HIGH',
      environment: 'MEDIUM',
      organization_id: organization.id
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
