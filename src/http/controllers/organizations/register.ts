import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        responsible_name: z.string(),
        email: z.string().email(),
        address: z.string(),
        number: z.string(),
        neighborhood: z.string(),
        cep: z.string().length(9).refine(
            cep => cep.match(/^\d{5}-\d{3}$/),
        ),
        city: z.string(),
        state: z.string().length(2),
        whatsApp: z.string().length(15).refine(
            whatsApp => whatsApp.match(/^\(\d{2}\) \d{5}-\d{4}$/),
        ),
        password: z.string().min(6),
    })

    const {responsible_name, email, address, number, neighborhood, cep, city, state, whatsApp, password} = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            responsible_name,
            email,
            address,
            number,
            neighborhood,
            cep,
            city,
            state,
            whatsApp,
            password
        })
    } catch (err) {

        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}