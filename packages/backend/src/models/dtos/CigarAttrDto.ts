import {
    CigarAnschnittEntity,
    CigarAromaradEntity,
    CigarDeckplattEntity,
    CigarEinlageEntity,
    CigarOriginEntity,
    CigarProducerEntity,
    CigarUmblattEntity,
} from '../entities/CigarAttrsEntity';

export class CigarAnschnittDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CigarAnschnittEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(cigarAnschnittEntity: CigarAnschnittEntity) {
        return new CigarAnschnittDto(cigarAnschnittEntity);
    }
}

export class CigarAromaradDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CigarAromaradEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(cigarAromaradEntity: CigarAromaradEntity) {
        return new CigarAromaradDto(cigarAromaradEntity);
    }
}

export class CigarDeckplattDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CigarDeckplattEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(cigarDeckplattEntity: CigarDeckplattEntity) {
        return new CigarDeckplattDto(cigarDeckplattEntity);
    }
}

export class CigarEinlageDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CigarEinlageEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(cigarEinlageEntity: CigarEinlageEntity) {
        return new CigarEinlageDto(cigarEinlageEntity);
    }
}

export class CigarOriginDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CigarOriginEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(cigarOriginEntity: CigarOriginEntity) {
        return new CigarOriginDto(cigarOriginEntity);
    }
}

export class CigarProducerDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CigarProducerEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(cigarProducerEntity: CigarProducerEntity) {
        return new CigarProducerDto(cigarProducerEntity);
    }
}

export class CigarUmblattDto {
    public id: number;
    public name: string;

    public constructor({ id, name }: CigarUmblattEntity) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(cigarUmblattEntity: CigarUmblattEntity) {
        return new CigarUmblattDto(cigarUmblattEntity);
    }
}
