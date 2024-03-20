import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcrypt";
import { $Enums, Organization, Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";

interface CreatePetUseCaseRequest {
  name: string,
  about?: string,
  age: $Enums.Age,
  size: $Enums.Size,
  energy_level: $Enums.EnergyLevel,
  independence_level: $Enums.IndependenceLevel,
  environment: $Enums.Environment,
  organization_id: string,
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      organization_id,
    });

    return {
      pet,
    };
  }
}
