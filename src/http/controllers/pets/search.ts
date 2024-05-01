import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { Age, EnergyLevel, Environment, IndependenceLevel, Size } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchPetsParamsSchema = z.object({
        city: z.string(),
        state: z.string().optional(),
        age: z.nativeEnum(Age).optional(),
        size: z.nativeEnum(Size).optional(),
        energy_level: z.nativeEnum(EnergyLevel).optional(),
        independence_level: z.nativeEnum(IndependenceLevel).optional(),
        environment: z.nativeEnum(Environment).optional(),
        page: z.coerce.number().min(1).default(1),
    });

    const { city, state, age, size, energy_level, independence_level, environment, page } = searchPetsParamsSchema.parse(request.query);

    try {
        const searchPetsUseCase = makeSearchPetsUseCase();

        const { pets } = await searchPetsUseCase.execute({
            city,
            state,
            age,
            size,
            energy_level,
            independence_level,
            environment,
            page,
        });

        return reply.status(200).send({ pets });
    } catch (err) {
        throw err;
    }
}