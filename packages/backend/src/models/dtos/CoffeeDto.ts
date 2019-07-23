import { CoffeeEntity } from '../entities/CoffeeEntity';
import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity } from '../entities/CoffeeAttrsEntity';

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class CoffeeDto {
    public id: number;
    public name: string;
    public imageStrings: string[];
    public description: string;
    public rating: number;
    public origin: CoffeeOriginEntity;
    public kind: CoffeeKindEntity;
    public roasted: CoffeeRoastedEntity;
    public bitter: number;
    public ownDescription: string;
    public sour: number;
    public taste: number;
    public tasteKind: number;
    public woody: number;

    // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
    public constructor({
        id,
        name,
        // images,
        description,
        origin,
        rating,
        kind,
        roasted,
        bitter,
        ownDescription,
        sour,
        taste,
        tasteKind,
        woody,
    }: CoffeeEntity) {
        this.id = id;
        this.name = name;
        this.imageStrings = [];
        this.description = description;
        this.rating = rating;
        this.origin = origin;
        this.kind = kind;
        this.roasted = roasted;
        this.bitter = bitter;
        this.ownDescription = ownDescription;
        this.sour = sour;
        this.taste = taste;
        this.tasteKind = tasteKind;
        this.woody = woody;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(coffeeEntity: CoffeeEntity) {
        return new CoffeeDto(coffeeEntity);
    }
}
