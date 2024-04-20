import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetUseCase } from "./get-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { createOrganizationInMemory } from "@/utils/create-organization-in-memory";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetPetUseCase;

describe("Get Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get pet by id", async () => {
    const { organization } = await createOrganizationInMemory(organizationsRepository)

    const createdPet = await petsRepository.create({
      name: "Lessie",
      about: "Hiperativa e bagunceira, mas muito carinhosa",
      age: 'YOUNG',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      independence_level: 'MEDIUM',
      environment: 'MEDIUM',
      organization_id: organization.id
    })


    const { pet } = await sut.execute({
      id: createdPet.id
    })

    expect(pet.id).toEqual(createdPet.id);
  });

  it('should not be able to get pet with wrong id', async () => {
    const { organization } = await createOrganizationInMemory(organizationsRepository)

    await petsRepository.create({
      name: "Lessie",
      about: "Hiperativa e bagunceira, mas muito carinhosa",
      age: 'YOUNG',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      independence_level: 'MEDIUM',
      environment: 'MEDIUM',
      organization_id: organization.id
    })

    expect(async () => await sut.execute({
      id: 'wrong-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  })
});
