import { AdoptionRequirement, Photo, Prisma } from "@prisma/client";
import { AdoptionRequirementsRepository } from "../adoption-requirements";
import { randomUUID } from "node:crypto";

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository {
  public adoptionRequirements: AdoptionRequirement[] = [];

  async create(data: Prisma.AdoptionRequirementUncheckedCreateInput) {
    const adoptionRequirement: AdoptionRequirement = {
      id: randomUUID(),
      pet_id: data.pet_id,
      requirement: data.requirement,
    };

    this.adoptionRequirements.push(adoptionRequirement);

    return adoptionRequirement;
  }
}
