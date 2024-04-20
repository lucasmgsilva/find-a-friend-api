import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { createOrganizationInMemory } from "@/utils/create-organization-in-memory";
import { SearchPetsUseCase } from "./search-pets";

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: SearchPetsUseCase;

describe("Search Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("should be able to search pet by characteristics", async () => {
    const { organization } = await createOrganizationInMemory(organizationsRepository)

    const targetPet = await petsRepository.create({
      name: "Lessie",
      about: "Hiperativa e bagunceira, mas muito carinhosa",
      age: 'YOUNG',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      independence_level: 'MEDIUM',
      environment: 'MEDIUM',
      organization_id: organization.id
    })

    await petsRepository.create({
      name: "Princesa",
      about: "É uma cachorrinha muito dócil e brincalhona",
      age: "ADULT",
      size: "MEDIUM",
      energy_level: "MEDIUM",
      independence_level: "HIGH",
      environment: "MEDIUM",
      organization_id: organization.id
    })

    const { pets } = await sut.execute({
      city: "São Paulo",
      energy_level: "HIGH",
      page: 1,
    })

    expect(pets).toHaveLength(1);
    expect(pets[0]).toEqual(expect.objectContaining({
      name: targetPet.name,
    }));
  });
});
