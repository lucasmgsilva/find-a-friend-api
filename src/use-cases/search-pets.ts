import { PetsRepository } from "@/repositories/pets-repository";
import { Age, EnergyLevel, Environment, IndependenceLevel, Pet, Size } from "@prisma/client";

interface SearchPetsUseCaseRequest {
    city: string
    state?: string
    age?: Age
    size?: Size
    energy_level?: EnergyLevel
    independence_level?: IndependenceLevel
    environment?: Environment
    page: number
}

interface SearchPetsUseCaseResponse {
    pets: Pet[];
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) { }

    async execute(
        {
            city,
            state,
            age,
            size,
            energy_level,
            independence_level,
            environment,
            page
        }: SearchPetsUseCaseRequest
    ): Promise<SearchPetsUseCaseResponse> {
        const pets = await this.petsRepository.searchMany(
            city,
            state,
            age,
            size,
            energy_level,
            independence_level,
            environment,
            page
        );

        return { pets };
    }
}