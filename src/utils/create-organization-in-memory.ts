import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { RegisterUseCase } from "@/use-cases/register";

export async function createOrganizationInMemory(organizationsRepository: OrganizationsRepository) {
    let sut: RegisterUseCase = new RegisterUseCase(organizationsRepository);

    const { organization } = await sut.execute({
        responsible_name: "John Doe",
        email: "john@doe.com",
        cep: "12346-321",
        address: "Groove Street",
        whatsApp: "(11) 99999-9999",
        password: "123456",
    });

    return {
        organization
    }
}