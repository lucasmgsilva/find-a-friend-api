import { Age, EnergyLevel, Environment, IndependenceLevel, Pet, Prisma, Size } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository
  implements PetsRepository
{
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      organization_id: data.organization_id,
    };

    this.pets.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async searchMany(
    city: string,
    state: string,
    age: Age,
    size: Size,
    energy_level: EnergyLevel,
    independence_level: IndependenceLevel,
    environment: Environment,
    page: number
  ) {
    const filteredPets = this.pets.filter((pet) => {
      if (age && pet.age !== age) {
        return false;
      }

      if (size && pet.size !== size) {
        return false;
      }

      if (energy_level && pet.energy_level !== energy_level) {
        return false;
      }

      if (independence_level && pet.independence_level !== independence_level) {
        return false;
      }

      if (environment && pet.environment !== environment) {
        return false;
      }

      return true;
    });

    return filteredPets.slice((page - 1) * 20, page * 20)
  }
}
