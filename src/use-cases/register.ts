import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcrypt";
import { Organization } from "@prisma/client";

interface RegisterUseCaseRequest {
  responsible_name: string;
  email: string;
  address: string;
  number: string;
  neighborhood: string;
  cep: string;
  city: string;
  state: string;
  whatsApp: string;
  password: string;
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    responsible_name,
    email,
    address,
    number,
    neighborhood,
    cep,
    city,
    state,
    whatsApp,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.organizationsRepository.findByEmail(
      email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const organization = await this.organizationsRepository.create({
      responsible_name,
      email,
      address,
      number,
      neighborhood,
      cep,
      city,
      state,
      whatsApp,
      password_hash,
    });

    return {
      organization,
    };
  }
}
