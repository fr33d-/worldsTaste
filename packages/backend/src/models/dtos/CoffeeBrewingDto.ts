import { CoffeeBrewingEntity } from '../entities/CoffeeBrewingEntity';

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class CoffeeBrewingDto {
    public id: number;
    public bitter: number;
    public brewDate: Date;
    public ownDescription: string;
    public taste: number;
    public tasteKind: number; // Schokolade/Frucht
    public useforcalculation: boolean;
    public rating: number;
    public strength: number;
    public sour: number;
    public woody: number; //Holzig, Mehlig, Erbsig
    public method: string;
    public waterAmount: number;
    public coffeeAmount: number;

    // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
    public constructor({
        id,
        bitter,
        brewDate,
        ownDescription,
        taste,
        tasteKind,
        useforcalculation,
        rating,
        strength,
        sour,
        woody,
        method,
        coffeeAmount,
        waterAmount
    }: CoffeeBrewingEntity) {
        this.id = id;
        this.bitter = bitter;
        this.brewDate = brewDate;
        this.ownDescription = ownDescription;
        this.taste = taste;
        this.tasteKind = tasteKind;
        this.useforcalculation = useforcalculation;
        this.rating = rating;
        this.strength = strength;
        this.sour = sour;
        this.woody = woody;
        this.method = method;
        this.waterAmount = waterAmount;
        this.coffeeAmount = coffeeAmount;
    }

    // This is mostly used in combination with Array.map, since you cannot map a constructor.
    public static fromEntity(coffeeBrewingEntity: CoffeeBrewingEntity) {
        return new CoffeeBrewingDto(coffeeBrewingEntity);
    }
}
