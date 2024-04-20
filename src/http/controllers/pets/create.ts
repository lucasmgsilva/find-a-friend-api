import { OrganizationNotFoundError } from "@/use-cases/errors/organization-not-found-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { Age, EnergyLevel, Environment, IndependenceLevel, Size } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string().min(3),
        about: z.string().optional(),
        age: z.nativeEnum(Age),
        size: z.nativeEnum(Size),
        energy_level: z.nativeEnum(EnergyLevel),
        independence_level: z.nativeEnum(IndependenceLevel),
        environment: z.nativeEnum(Environment),
    })

    const {
        name,
        about,
        age,
        size,
        energy_level,
        independence_level,
        environment,
    } = createBodySchema.parse(request.body);

    const organization_id = request.user.sub

    try {
        const createPetUseCase = makeCreatePetUseCase()

        const { pet } = await createPetUseCase.execute({
            name,
            about,
            age,
            size,
            energy_level,
            independence_level,
            environment,
            organization_id
        })

        return reply.status(201).send({pet})
    } catch (err) {
        if (err instanceof OrganizationNotFoundError){
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

}