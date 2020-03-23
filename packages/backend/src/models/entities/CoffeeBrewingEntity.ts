import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoffeeEntity } from "./CoffeeEntity";

@Entity()
export class CoffeeBrewingEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public brewDate!: Date;

    @Column()
    public ownDescription!: string;

    @Column()
    public useforcalculation!: boolean;

    @Column()
    public rating!: number;

    @Column()
    public waterAmount!: number;

    @Column()
    public coffeeAmount!: number;

    @Column()
    public method!: string;

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

    @Column()
    public intensity!: number;

    @ManyToOne(
        (type) => CoffeeEntity,
        (coffee) => coffee.brewings,
        { onDelete: "CASCADE" }
    )
    public coffee!: CoffeeEntity;
}
