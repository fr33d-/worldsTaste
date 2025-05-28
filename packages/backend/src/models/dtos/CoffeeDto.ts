import { CoffeeBrewingEntity } from "../entities/CoffeeBrewingEntity";
import { CoffeeEntity } from "../entities/CoffeeEntity";
import { CoffeeStoreEntity } from "../entities/CoffeeStoresEntity";
import { ImagesEntity } from "../entities/ImageEntry";
import { RoasterEntity } from "../entities/RoasterEntity";
import { UserEntity } from "../entities/UserEntity";

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class CoffeeDto {
    public id: number;
    public name: string;
    // public imageStrings: string[];
    public description: string;
    public rating: number;

    public origin: string;

    public store: CoffeeStoreEntity;
    public roaster: RoasterEntity;

    public ownDescription: string;
    public dateAdded: Date;
    public buyDate: Date;
    public roastDate: Date;
    public process: string;
    public species: string;
    public owner: UserEntity;
    public brewings: CoffeeBrewingEntity[];

    public roastIntensity: number;
    public body: number;
    public sweetness: number;
    public balance: number;
    public aftertaste: number;
    public acidity: number;
    public tannicAsid: number;
    public bitterness: number;
    public fragrance: string;
    public aroma: string;
    public inStock: boolean;

    public images: ImagesEntity[];

    // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
    public constructor({
        id,
        name,
        description,
        origin,
        rating,
        ownDescription,
        buyDate,
        dateAdded,
        process,
        species,
        owner,
        brewings,
        store,
        roastIntensity,
        body,
        sweetness,
        balance,
        aftertaste,
        acidity,
        tannicAsid,
        bitterness,
        fragrance,
        aroma,
        roastDate,
        inStock,
        images,
        roaster,
    }: CoffeeEntity) {
        this.id = id;
        this.name = name;
        // this.imageStrings = [];
        this.description = description;
        this.rating = rating;
        this.origin = origin;
        this.store = store;
        this.ownDescription = ownDescription;
        this.buyDate = buyDate;
        this.dateAdded = dateAdded;
        this.roastDate = roastDate;
        this.process = process;
        this.species = species;
        this.owner = owner;
        this.brewings = brewings;
        this.roastIntensity = roastIntensity;
        this.body = body;
        this.sweetness = sweetness;
        this.balance = balance;
        this.aftertaste = aftertaste;
        this.acidity = acidity;
        this.tannicAsid = tannicAsid;
        this.bitterness = bitterness;
        this.fragrance = fragrance;
        this.aroma = aroma;
        this.inStock = inStock;
        this.images = images;
        this.roaster = roaster;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(coffeeEntity: CoffeeEntity) {
        return new CoffeeDto(coffeeEntity);
    }
}
