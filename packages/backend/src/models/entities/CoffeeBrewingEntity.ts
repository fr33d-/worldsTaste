import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CoffeeOriginEntity, CoffeeKindEntity, CoffeeRoastedEntity, CoffeeMethodEntity } from "./CoffeeAttrsEntity";
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

    @ManyToOne(type => CoffeeMethodEntity, coffeeMethod => coffeeMethod.id)
    @JoinColumn({ name: "method" })
    public method!: CoffeeMethodEntity;

    @ManyToOne(type => CoffeeEntity, coffee => coffee.brewings)
    public coffee!: CoffeeEntity;
}