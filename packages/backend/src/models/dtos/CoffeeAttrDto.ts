import { CoffeeStoreEntity } from "../entities/CoffeeStoresEntity";


export class CoffeeStoreDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CoffeeStoreEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(coffeeStoreEntity: CoffeeStoreEntity) {
        return new CoffeeStoreDto(coffeeStoreEntity);
    }
}
