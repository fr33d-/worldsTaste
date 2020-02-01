import { CoffeeEntity } from '../entities/CoffeeEntity';
import { UserEntity } from '../entities/UserEntity';
import { CoffeeBrewingEntity } from '../entities/CoffeeBrewingEntity';
import { CoffeeStoreEntity } from '../entities/CoffeeStoresEntity';

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class CoffeeDto {
    public id: number;
    public name: string;
    public imageStrings: string[];
    public description: string;
    public rating: number;
    public origin: string;
    public kind: string;
    public store: CoffeeStoreEntity;
    public bitter: number;
    public ownDescription: string;
    public sour: number;
    public taste: number;
    public tasteKind: number;
    public woody: number;
    public dateAdded: Date;
    public process: string;
    public buyDate: Date;
    public species: string;
    public owner: UserEntity;
    public brewings: CoffeeBrewingEntity[];


    // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
    public constructor({
        id,
        name,
        description,
        origin,
        rating,
        kind,
        bitter,
        ownDescription,
        sour,
        taste,
        tasteKind,
        woody,
        buyDate,
        dateAdded,
        process,
        species,
        owner,
        brewings,
        store
    }: CoffeeEntity) {
        this.id = id;
        this.name = name;
        this.imageStrings = [];
        this.description = description;
        this.rating = rating;
        this.origin = origin;
        this.kind = kind;
        this.store = store;
        this.bitter = bitter;
        this.ownDescription = ownDescription;
        this.sour = sour;
        this.taste = taste;
        this.tasteKind = tasteKind;
        this.woody = woody;
        this.buyDate = buyDate;
        this.dateAdded = dateAdded;
        this.process = process;
        this.species = species;
        this.owner = owner;
        this.brewings = brewings;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(coffeeEntity: CoffeeEntity) {
        return new CoffeeDto(coffeeEntity);
    }
}
