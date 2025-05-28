import { File } from "buffer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoffeeBrewingEntity } from "./CoffeeBrewingEntity";
import { CoffeeStoreEntity } from "./CoffeeStoresEntity";
import { ImagesEntity } from "./ImageEntry";
import { RoasterEntity } from "./RoasterEntity";
import { UserEntity } from "./UserEntity";

export type Image = {
    name: string;
    url?: string;
    alt?: string;
    file?: File;
};

@Entity()
export class CoffeeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public description!: string;

    @Column()
    public rating!: number;

    @Column()
    public ownDescription!: string;

    @Column()
    public dateAdded!: Date;

    @Column()
    public buyDate!: Date;

    @Column()
    public inStock!: boolean;

    @Column()
    public roastDate!: Date;

    @Column()
    public process!: string;

    @Column()
    public species!: string;

    @Column()
    public origin!: string;

    @Column()
    public roastIntensity!: number;

    @Column()
    public body!: number;

    @Column()
    public sweetness!: number;

    @Column()
    public balance!: number;

    @Column()
    public aftertaste!: number;

    @Column()
    public acidity!: number;

    @Column()
    public tannicAsid!: number;

    @Column()
    public bitterness!: number;

    @Column()
    public fragrance!: string;

    @Column()
    public aroma!: string;

    @ManyToOne((type) => UserEntity, (user) => user.id)
    @JoinColumn({ name: "owner" })
    public owner!: UserEntity;

    @ManyToOne((type) => CoffeeStoreEntity, (coffeeStore) => coffeeStore.id)
    @JoinColumn({ name: "store" })
    public store!: CoffeeStoreEntity;

    @ManyToOne((type) => RoasterEntity, (roaster) => roaster.id)
    @JoinColumn({ name: "roaster" })
    public roaster!: RoasterEntity;

    @OneToMany((type) => CoffeeBrewingEntity, (coffeeBrewings) => coffeeBrewings.coffee)
    @JoinColumn({ name: "brewings" })
    public brewings!: CoffeeBrewingEntity[];

    @OneToMany((type) => ImagesEntity, (coffeeBrewings) => coffeeBrewings.coffee)
    @JoinColumn({ name: "images" })
    public images!: ImagesEntity[];
}
