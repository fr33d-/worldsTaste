import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoffeeEntity } from "./CoffeeEntity";

@Entity()
export class CoffeeBrewingEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public bitter!: number;

    @Column()
    public brewDate!: Date;

    @Column()
    public ownDescription!: string;

    @Column()
    public taste!: number;

    @Column()
    public tasteKind!: number;

    @Column()
    public useforcalculation!: boolean;

    @Column()
    public rating!: number;

    @Column()
    public strength!: number;

    @Column()
    public sour!: number;

    @Column()
    public woody!: number;

    @Column()
    public waterAmount!: number;

    @Column()
    public coffeeAmount!: number;

    @Column()
    public method!: string;

    @ManyToOne(type => CoffeeEntity, coffee => coffee.brewings, { onDelete: 'CASCADE' })
    public coffee!: CoffeeEntity;
}
