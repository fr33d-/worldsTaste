import { CoffeeEntity } from '../entities/CoffeeEntity';
import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity } from '../entities/CoffeeAttrsEntity';

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class CoffeeDto {
    public id: number;
    public name: string;
    public description: string;
    public rating: number;
    public originId: CoffeeOriginEntity;
    public kindId: CoffeeKindEntity;
    public roastedId: CoffeeRoastedEntity;

    // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
    public constructor({ id, name, description, originId, rating, kindId, roastedId }: CoffeeEntity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.originId = originId;
        this.kindId = kindId;
        this.roastedId = roastedId;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(coffeeEntity: CoffeeEntity) {
        return new CoffeeDto(coffeeEntity);
    }
}

