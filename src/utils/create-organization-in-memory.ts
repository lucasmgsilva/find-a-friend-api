import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { RegisterUseCase } from "@/use-cases/register";

export async function createOrganizationInMemory(organizationsRepository: OrganizationsRepository) {
    let sut: RegisterUseCase = new RegisterUseCase(organizationsRepository);

    const { organization } = await sut.execute({
        responsible_name: "John Doe",
        email: "john@doe.com",
        address: "Groove Street",
        number: "123",
        neighborhood: "Santos",
        cep: "12345-321",
        city: "São Paulo",
        state: "SP",
        whatsApp: "(11) 99999-9999",
        password: "123456",
    });

    return {
        organization
    }
}