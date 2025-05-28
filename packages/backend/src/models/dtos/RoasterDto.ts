import { ImagesEntity } from "../entities/ImageEntry";
import { RoasterEntity } from "../entities/RoasterEntity";

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class RoasterDto {
    public id: number;

    public name: string;
    public country: string;
    public city: string;
    public link: string;
    public visited: Date;
    public description: string;
    public rating: number;

    public images: ImagesEntity[];

    // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
    public constructor({ id, name, description, rating, city, country, link, visited, images }: RoasterEntity) {
        this.id = id;

        this.name = name;
        this.description = description;
        this.rating = rating;
        this.city = city;
        this.country = country;
        this.link = link;
        this.visited = visited;

        this.images = images;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(roasterEntity: RoasterEntity) {
        return new RoasterDto(roasterEntity);
    }
}
