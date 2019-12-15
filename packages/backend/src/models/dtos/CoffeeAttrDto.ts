import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity, CoffeeSpeciesEntity, CoffeeProcessEntity, CoffeeMethodEntity } from '../entities/CoffeeAttrsEntity';

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

export class CoffeeSpeciesDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CoffeeSpeciesEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(coffeeSpeciesEntity: CoffeeSpeciesEntity) {
        return new CoffeeSpeciesDto(coffeeSpeciesEntity);
    }
}

export class CoffeeProcessDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CoffeeProcessEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(coffeeProcessEntity: CoffeeProcessEntity) {
        return new CoffeeProcessDto(coffeeProcessEntity);
    }
}

export class CoffeeMethodDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CoffeeMethodEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(coffeeMethodEntity: CoffeeMethodEntity) {
        return new CoffeeMethodDto(coffeeMethodEntity);
    }
}