import { CoffeeBrewingEntity } from "../entities/CoffeeBrewingEntity";
import { ImagesEntity } from "../entities/ImageEntry";

// This Dto class is used to omit certain data from the actual UserEntity class, in our case the password field. When
// we send any user as a result to a client we'd like to keep some data only on the server and hidden. Hence we use the
// entities on the server while using Dtos when interacting with clients.
export class CoffeeBrewingDto {
  public id: number;
  public brewDate: Date;
  public ownDescription: string;
  public useforcalculation: boolean;
  public rating: number;
  public method: string;
  public waterAmount: number;
  public coffeeAmount: number;

  public body: number;
  public sweetness: number;
  public balance: number;
  public aftertaste: number;
  public acidity: number;
  public tannicAsid: number;
  public bitterness: number;
  public fragrance: string;
  public aroma: string;
  public intensity: number;
  public grindSize: number;
  public brewTime: number;

  public image: ImagesEntity;

  // This constructs a UserDto from a given UserEntity via new UserDto(userEntity).
  public constructor({
    id,
    brewDate,
    ownDescription,
    useforcalculation,
    rating,
    method,
    coffeeAmount,
    waterAmount,
    body,
    sweetness,
    balance,
    aftertaste,
    acidity,
    tannicAsid,
    bitterness,
    fragrance,
    aroma,
    intensity,
    grindSize,
    brewTime,
    image,
  }: CoffeeBrewingEntity) {
    this.id = id;
    this.brewDate = brewDate;
    this.ownDescription = ownDescription;
    this.useforcalculation = useforcalculation;
    this.rating = rating;
    this.method = method;
    this.waterAmount = waterAmount;
    this.coffeeAmount = coffeeAmount;
    this.body = body;
    this.sweetness = sweetness;
    this.balance = balance;
    this.aftertaste = aftertaste;
    this.acidity = acidity;
    this.tannicAsid = tannicAsid;
    this.bitterness = bitterness;
    this.fragrance = fragrance;
    this.aroma = aroma;
    this.intensity = intensity;
    this.grindSize = grindSize;
    this.brewTime = brewTime;
    this.image = image;
  }

  // This is mostly used in combination with Array.map, since you cannot map a constructor.
  public static fromEntity(coffeeBrewingEntity: CoffeeBrewingEntity) {
    return new CoffeeBrewingDto(coffeeBrewingEntity);
  }
}
