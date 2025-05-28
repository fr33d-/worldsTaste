import { CoffeeStoreEntity } from "../entities/CoffeeStoresEntity";

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class CoffeeStoreDto {
    public id: number;
    public name: string;

    // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
    public constructor({ id, name }: CoffeeStoreEntity) {
        this.id = id;
        this.name = name;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(coffeeStoreEntity: CoffeeStoreEntity) {
        return new CoffeeStoreDto(coffeeStoreEntity);
    }
}
