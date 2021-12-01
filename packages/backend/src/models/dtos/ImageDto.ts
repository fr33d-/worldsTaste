import { ImagesEntity } from "../entities/ImageEntry";

export class ImageDto {
    public id: number;
    public name: string;
    public description: string;
    public alt: string;

    public file: string;

    public constructor({ id, name, description, alt, file }: ImagesEntity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.alt = alt;
        this.file = file;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(imageEntity: ImagesEntity) {
        return new ImageDto(imageEntity);
    }
}
