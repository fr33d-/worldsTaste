import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity } from '../entities/CoffeeAttrsEntity';

export class CoffeeOriginDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CoffeeOriginEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(coffeeOriginEntity: CoffeeOriginEntity) {
        return new CoffeeOriginDto(coffeeOriginEntity);
    }
}

export class CoffeeKindDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CoffeeKindEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(coffeeKindEntity: CoffeeKindEntity) {
        return new CoffeeKindDto(coffeeKindEntity);
    }
}

export class CoffeeRoastedDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CoffeeRoastedEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(coffeeRoastedEntity: CoffeeRoastedEntity) {
        return new CoffeeRoastedDto(coffeeRoastedEntity);
    }
}