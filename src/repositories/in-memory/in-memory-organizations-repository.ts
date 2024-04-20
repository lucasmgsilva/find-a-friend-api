import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      email: data.email,
      address: data.address,
      number: data.number,
      neighborhood: data.neighborhood,
      cep: data.cep,
      city: data.city,
      state: data.state,
      whatsApp: data.whatsApp,
      password_hash: data.password_hash,
    };

    this.organizations.push(organization);

    return organization;
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find(
      (organization) => organization.email === email
    );

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findById(id: string) {
    const organization = this.organizations.find(
      (organization) => organization.id === id
    );

    if (!organization) {
      return null;
    }

    return organization;
  }
}
