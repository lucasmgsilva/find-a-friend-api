import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { get } from "./get";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance){
    app.post('/pets', {preHandler: [verifyJWT]} , create)
    app.get('/pets', search)
    app.get('/pets/:id', get)
}