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
    const pets = this.pets.filter((pet) => {
      return pet.age === age &&
        pet.size === size &&
        pet.energy_level === energy_level &&
        pet.independence_level === independence_level &&
        pet.environment === environment;
    });

    return pets.slice((page - 1) * 20, page * 20)
  }
}
