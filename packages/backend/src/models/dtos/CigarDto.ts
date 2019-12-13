import {
    CigarAnschnittEntity,
    CigarAromaradEntity,
    CigarDeckblattEntity,
    CigarEinlageEntity,
    CigarOriginEntity,
    CigarProducerEntity,
    CigarUmblattEntity,
} from '../entities/CigarAttrsEntity';
import { CigarEntity } from '../entities/CigarEntity';

export class CigarDto {
    public id: number;
    public name: string;
    public imageStrings: string[];
    public abbrand: number;
    public aromavielfalt: number;
    public aromaentwicklung: number;
    public buydate: string;
    public description: string;
    public lenght: number;
    public rating: number;
    public ringmas: number;
    public smokeagain: boolean;
    public smokeduration: number;
    public smokedate: string;
    public strength: number;
    public zugwiederstand: number;
    public anschnitt: CigarAnschnittEntity;
    public aromarad: CigarAromaradEntity;
    public deckblatt: CigarDeckblattEntity;
    public einlage: CigarEinlageEntity;
    public origin: CigarOriginEntity;
    public producer: CigarProducerEntity;
    public umblatt: CigarUmblattEntity;

    public constructor({
        id,
        name,
        abbrand,
        aromavielfalt,
        aromaentwicklung,
        buydate,
        description,
        lenght,
        rating,
        ringmas,
        smokeagain,
        smokeduration,
        smokedate,
        strength,
        zugwiederstand,
        anschnitt,
        aromarad,
        deckblatt,
        einlage,
        origin,
        producer,
        umblatt,
    }: CigarEntity) {
        this.id = id;
        this.name = name;
        this.imageStrings = [];
        this.abbrand = abbrand;
        this.aromavielfalt = aromavielfalt;
        this.aromaentwicklung = aromaentwicklung;
        this.buydate = buydate;
        this.description = description;
        this.lenght = lenght;
        this.rating = rating;
        this.ringmas = ringmas;
        this.smokeagain = smokeagain;
        this.smokeduration = smokeduration;
        this.smokedate = smokedate;
        this.strength = strength;
        this.zugwiederstand = zugwiederstand;
        this.anschnitt = anschnitt;
        this.aromarad = aromarad;
        this.deckblatt = deckblatt;
        this.einlage = einlage;
        this.origin = origin;
        this.producer = producer;
        this.umblatt = umblatt;
    }

    public static fromEntity(cigarEntity: CigarEntity) {
        return new CigarDto(cigarEntity);
    }
}
