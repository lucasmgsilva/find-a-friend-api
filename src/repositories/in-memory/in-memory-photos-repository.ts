import { Photo, Prisma } from "@prisma/client";
import { PhotosRepository } from "../photos-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPhotosRepository
  implements PhotosRepository
{
  public photos: Photo[] = [];

  async create(data: Prisma.PhotoUncheckedCreateInput) {
    const photo: Photo = {
      id: randomUUID(),
      pet_id: data.pet_id,
      photo_url: data.photo_url,
    };

    this.photos.push(photo);

    return photo;
  }
}
