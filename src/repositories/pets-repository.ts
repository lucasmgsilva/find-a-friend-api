import { Age, EnergyLevel, Environment, IndependenceLevel, Pet, Prisma, Size } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  searchMany(
    city: string,
    state: string | undefined,
    age: Age | undefined,
    size: Size | undefined,
    energy_level: EnergyLevel | undefined,
    independence_level: IndependenceLevel | undefined,
    environment: Environment | undefined,
    page: number
  ): Promise<Pet[]>;
}
