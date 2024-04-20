import { Prisma, $Enums, Pet, Age, Size, EnergyLevel, IndependenceLevel, Environment } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet;
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            },
        });

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
        const pets = await prisma.pet.findMany({
            include: {
                organization: true,
            },
            where: {
                organization: {
                    city,
                    state,
                },
                age,
                size,
                energy_level,
                independence_level,
                environment,
            },
            skip: (page - 1) * 20,
            take: 20,
        });

        return pets;
    }
}